import { MedusaContainer } from "@medusajs/framework"
import {
  DistributedTransactionType,
  TransactionState,
  WorkflowManager,
} from "@medusajs/framework/orchestration"
import {
  Context,
  IWorkflowEngineService,
  Logger,
  RemoteQueryFunction,
} from "@medusajs/framework/types"
import {
  ContainerRegistrationKeys,
  Module,
  Modules,
  promiseAll,
  TransactionHandlerType,
} from "@medusajs/framework/utils"
import {
  createStep,
  createWorkflow,
  StepResponse,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { moduleIntegrationTestRunner } from "@medusajs/test-utils"
import { WorkflowsModuleService } from "@services"
import { asFunction } from "awilix"
import { setTimeout as setTimeoutSync } from "timers"
import { setTimeout as setTimeoutPromise } from "timers/promises"
import { ulid } from "ulid"
import "../__fixtures__"
import {
  conditionalStep2Invoke,
  conditionalStep3Invoke,
  workflow2Step2Invoke,
  workflow2Step3Invoke,
  workflowNotIdempotentWithRetentionStep2Invoke,
  workflowNotIdempotentWithRetentionStep3Invoke,
} from "../__fixtures__"
import {
  eventGroupWorkflowId,
  workflowEventGroupIdStep1Mock,
  workflowEventGroupIdStep2Mock,
} from "../__fixtures__/workflow_event_group_id"
import { createScheduled } from "../__fixtures__/workflow_scheduled"

jest.setTimeout(60000)

const failTrap = (done) => {
  setTimeoutSync(() => {
    // REF:https://stackoverflow.com/questions/78028715/jest-async-test-with-event-emitter-isnt-ending
    console.warn(
      `Jest is breaking the event emit with its debouncer. This allows to continue the test by managing the timeout of the test manually.`
    )
    done()
  }, 5000)
}

function times(num) {
  let resolver
  let counter = 0
  const promise = new Promise((resolve) => {
    resolver = resolve
  })

  return {
    next: () => {
      counter += 1
      if (counter === num) {
        resolver()
      }
    },
    // Force resolution after 10 seconds to prevent infinite awaiting
    promise: Promise.race([
      promise,
      new Promise((_, reject) => {
        setTimeoutSync(
          () => reject("times has not been resolved after 10 seconds."),
          10000
        )
      }),
    ]),
  }
}

moduleIntegrationTestRunner<IWorkflowEngineService>({
  moduleName: Modules.WORKFLOW_ENGINE,
  resolve: __dirname + "/../..",
  testSuite: ({ service: workflowOrcModule, medusaApp }) => {
    describe("Workflow Orchestrator module", function () {
      let query: RemoteQueryFunction
      let sharedContainer_: MedusaContainer

      beforeEach(() => {
        query = medusaApp.query
        sharedContainer_ = medusaApp.sharedContainer
      })

      it(`should export the appropriate linkable configuration`, () => {
        const linkable = Module(Modules.WORKFLOW_ENGINE, {
          service: WorkflowsModuleService,
        }).linkable

        expect(Object.keys(linkable)).toEqual(["workflowExecution"])

        Object.keys(linkable).forEach((key) => {
          delete linkable[key].toJSON
        })

        expect(linkable).toEqual({
          workflowExecution: {
            id: {
              linkable: "workflow_execution_id",
              entity: "WorkflowExecution",
              primaryKey: "id",
              serviceName: "workflows",
              field: "workflowExecution",
            },
            transaction_id: {
              linkable: "workflow_execution_transaction_id",
              entity: "WorkflowExecution",
              primaryKey: "transaction_id",
              serviceName: "workflows",
              field: "workflowExecution",
            },
            workflow_id: {
              linkable: "workflow_execution_workflow_id",
              entity: "WorkflowExecution",
              primaryKey: "workflow_id",
              serviceName: "workflows",
              field: "workflowExecution",
            },
            run_id: {
              linkable: "workflow_execution_run_id",
              entity: "WorkflowExecution",
              primaryKey: "run_id",
              serviceName: "workflows",
              field: "workflowExecution",
            },
          },
        })
      })

      describe("Cancel transaction", function () {
        it("should cancel an ongoing execution with async unfinished yet step", (done) => {
          const transactionId = "transaction-to-cancel-id"
          const step1 = createStep("step1", async () => {
            return new StepResponse("step1")
          })

          const step2 = createStep("step2", async () => {
            await setTimeoutPromise(500)
            return new StepResponse("step2")
          })

          const step3 = createStep("step3", async () => {
            return new StepResponse("step3")
          })

          const workflowId = "workflow-to-cancel-id" + ulid()

          createWorkflow({ name: workflowId, retentionTime: 60 }, function () {
            step1()
            step2().config({ async: true })
            step3()

            return new WorkflowResponse("finished")
          })

          workflowOrcModule
            .run(workflowId, {
              input: {},
              transactionId,
            })
            .then(async () => {
              await setTimeoutPromise(100)

              await workflowOrcModule.cancel(workflowId, {
                transactionId,
              })

              workflowOrcModule.subscribe({
                workflowId,
                transactionId,
                subscriber: async (event) => {
                  if (event.eventType === "onFinish") {
                    const execution =
                      await workflowOrcModule.listWorkflowExecutions({
                        transaction_id: transactionId,
                      })

                    expect(execution.length).toEqual(1)
                    expect(execution[0].state).toEqual(
                      TransactionState.REVERTED
                    )
                    done()
                  }
                },
              })
            })

          failTrap(done)
        })

        it("should cancel a complete execution with a sync workflow running as async", async () => {
          const workflowId = "workflow-to-cancel-id" + ulid()
          const transactionId = "transaction-to-cancel-id"
          const step1 = createStep("step1", async () => {
            return new StepResponse("step1")
          })

          const step2 = createStep("step2", async () => {
            return new StepResponse("step2")
          })

          const step3 = createStep("step3", async () => {
            return new StepResponse("step3")
          })

          const subWorkflowId = "sub-workflow-id" + ulid()
          const subWorkflow = createWorkflow(
            { name: subWorkflowId, retentionTime: 60 },
            function () {
              return new WorkflowResponse(step2())
            }
          )

          createWorkflow({ name: workflowId, retentionTime: 60 }, function () {
            step1()
            subWorkflow.runAsStep({ input: {} }).config({ async: true })
            step3()

            return new WorkflowResponse("finished")
          })

          await workflowOrcModule.run(workflowId, {
            input: {},
            transactionId,
          })

          await setTimeoutPromise(100)

          await workflowOrcModule.cancel(workflowId, {
            transactionId,
          })

          await setTimeoutPromise(500)

          const execution = await workflowOrcModule.listWorkflowExecutions({
            transaction_id: transactionId,
          })

          expect(execution.length).toEqual(1)
          expect(execution[0].state).toEqual(TransactionState.REVERTED)
        })

        it("should cancel an ongoing execution with a sync workflow running as async", async () => {
          const workflowId = "workflow-to-cancel-id" + ulid()
          const transactionId = "transaction-to-cancel-id"
          const step1 = createStep("step1", async () => {
            return new StepResponse("step1")
          })

          const step2 = createStep("step2", async () => {
            await setTimeoutPromise(500)
            return new StepResponse("step2")
          })

          const step3 = createStep("step3", async () => {
            return new StepResponse("step3")
          })

          const subWorkflowId = "sub-workflow-id" + ulid()
          const subWorkflow = createWorkflow(
            { name: subWorkflowId, retentionTime: 60 },
            function () {
              return new WorkflowResponse(step2())
            }
          )

          createWorkflow({ name: workflowId, retentionTime: 60 }, function () {
            step1()
            subWorkflow.runAsStep({ input: {} }).config({ async: true })
            step3()

            return new WorkflowResponse("finished")
          })

          await workflowOrcModule.run(workflowId, {
            input: {},
            transactionId,
          })

          await setTimeoutPromise(100)

          await workflowOrcModule.cancel(workflowId, {
            transactionId,
          })

          await setTimeoutPromise(1000)

          const execution = await workflowOrcModule.listWorkflowExecutions({
            transaction_id: transactionId,
          })

          expect(execution.length).toEqual(1)
          expect(execution[0].state).toEqual(TransactionState.REVERTED)
        })

        it("should cancel an ongoing execution with sync steps only", async () => {
          const transactionId = "transaction-to-cancel-id"
          const step1 = createStep("step1", async () => {
            return new StepResponse("step1")
          })

          const step2 = createStep("step2", async () => {
            await setTimeoutPromise(500)
            return new StepResponse("step2")
          })

          const step3 = createStep("step3", async () => {
            return new StepResponse("step3")
          })

          const workflowId = "workflow-to-cancel-id" + ulid()

          createWorkflow({ name: workflowId, retentionTime: 60 }, function () {
            step1()
            step2()
            step3()

            return new WorkflowResponse("finished")
          })

          await workflowOrcModule.run(workflowId, {
            input: {},
            transactionId,
          })

          await setTimeoutPromise(100)

          await workflowOrcModule.cancel(workflowId, {
            transactionId,
          })

          await setTimeoutPromise(1000)

          const execution = await workflowOrcModule.listWorkflowExecutions({
            transaction_id: transactionId,
          })

          expect(execution.length).toEqual(1)
          expect(execution[0].state).toEqual(TransactionState.REVERTED)
        })
      })

      it("should prevent executing twice the same workflow in perfect concurrency with the same transactionId and non idempotent and not async but retention time is set", async () => {
        const transactionId = "transaction_id"
        const workflowId = "workflow_id" + ulid()

        const step1 = createStep("step1", async () => {
          await setTimeoutPromise(100)
          return new StepResponse("step1")
        })

        createWorkflow(
          {
            name: workflowId,
            retentionTime: 1000,
          },
          function () {
            return new WorkflowResponse(step1())
          }
        )

        const [result1, result2] = await promiseAll([
          workflowOrcModule
            .run(workflowId, {
              input: {},
              transactionId,
            })
            .catch((e) => e),
          workflowOrcModule
            .run(workflowId, {
              input: {},
              transactionId,
            })
            .catch((e) => e),
        ])

        expect(result1.result || result2.result).toEqual("step1")
        expect(result2.message || result1.message).toEqual(
          "Transaction already started for transactionId: " + transactionId
        )
      })

      it("should execute an async workflow keeping track of the event group id provided in the context", async () => {
        const eventGroupId = "event-group-id"

        await workflowOrcModule.run(eventGroupWorkflowId, {
          input: {},
          transactionId: "transaction_id",
          context: {
            eventGroupId,
          },
          throwOnError: true,
        })

        await workflowOrcModule.setStepSuccess({
          idempotencyKey: {
            action: TransactionHandlerType.INVOKE,
            stepId: "step_1_event_group_id_background",
            workflowId: eventGroupWorkflowId,
            transactionId: "transaction_id",
          },
          stepResponse: { hey: "oh" },
        })

        // Validate context event group id
        expect(
          (workflowEventGroupIdStep1Mock.mock.calls[0] as any[])[1]
        ).toEqual(expect.objectContaining({ eventGroupId }))
        expect(
          (workflowEventGroupIdStep2Mock.mock.calls[0] as any[])[1]
        ).toEqual(expect.objectContaining({ eventGroupId }))
      })

      it("should execute an async workflow keeping track of the event group id that has been auto generated", async () => {
        await workflowOrcModule.run(eventGroupWorkflowId, {
          input: {},
          transactionId: "transaction_id_2",
          throwOnError: true,
        })

        await workflowOrcModule.setStepSuccess({
          idempotencyKey: {
            action: TransactionHandlerType.INVOKE,
            stepId: "step_1_event_group_id_background",
            workflowId: eventGroupWorkflowId,
            transactionId: "transaction_id_2",
          },
          stepResponse: { hey: "oh" },
        })

        const generatedEventGroupId = ((
          workflowEventGroupIdStep1Mock.mock.calls[0] as any[]
        )[1] as unknown as Context)!.eventGroupId

        // Validate context event group id
        expect(
          (workflowEventGroupIdStep1Mock.mock.calls[0] as any[])[1]
        ).toEqual(
          expect.objectContaining({ eventGroupId: generatedEventGroupId })
        )
        expect(
          (workflowEventGroupIdStep2Mock.mock.calls[0] as any[])[1]
        ).toEqual(
          expect.objectContaining({ eventGroupId: generatedEventGroupId })
        )
      })

      it("should compose nested workflows w/ async steps", (done) => {
        const asyncResults: any[] = []
        const mockStep1Fn = jest.fn().mockImplementation(() => {
          const res = { obj: "return from 1" }
          asyncResults.push(res)
          return new StepResponse(res)
        })
        const mockStep2Fn = jest.fn().mockImplementation(async () => {
          await setTimeoutPromise(100)
          const res = { obj: "return from 2" }
          asyncResults.push(res)
          return new StepResponse(res)
        })

        const mockStep3Fn = jest.fn().mockImplementation(() => {
          const res = { obj: "return from 3" }
          asyncResults.push(res)
          return new StepResponse(res)
        })

        const step1 = createStep("step1", mockStep1Fn)
        const step2 = createStep(
          {
            name: "step2",
            async: true,
            backgroundExecution: true,
          },
          mockStep2Fn
        )
        const step3 = createStep("step3", mockStep3Fn)

        const wf3 = createWorkflow("workflow3", function (input) {
          return new WorkflowResponse(step2(input))
        })

        const wf2 = createWorkflow("workflow2", function (input) {
          const ret3 = wf3.runAsStep({
            input: {},
          })
          return new WorkflowResponse(ret3)
        })

        const workflowId = "workflow1"
        createWorkflow(workflowId, function (input) {
          step1(input)
          wf2.runAsStep({ input })
          const fourth = step3({})
          return new WorkflowResponse(fourth)
        })

        asyncResults.push("begin workflow")
        workflowOrcModule
          .run(workflowId, {
            input: {},
          })
          .then(() => {
            asyncResults.push("returned workflow")

            void workflowOrcModule.subscribe({
              workflowId,
              subscriber: (event) => {
                if (event.eventType === "onFinish") {
                  expect(asyncResults).toEqual([
                    "begin workflow",
                    { obj: "return from 1" },
                    "returned workflow",
                    { obj: "return from 2" },
                    { obj: "return from 3" },
                  ])
                  done()
                }
              },
            })
          })

        failTrap(done)
      })

      describe("Testing basic workflow", function () {
        beforeEach(() => {
          jest.clearAllMocks()
        })

        it("should return a list of workflow executions and remove after completed when there is no retentionTime set", async () => {
          await workflowOrcModule.run("workflow_1", {
            input: {
              value: "123",
            },
            throwOnError: true,
          })

          let { data: executionsList } = await query.graph({
            entity: "workflow_executions",
            fields: ["workflow_id", "transaction_id", "state"],
          })

          expect(executionsList).toHaveLength(1)

          const { result } = await workflowOrcModule.setStepSuccess({
            idempotencyKey: {
              action: TransactionHandlerType.INVOKE,
              stepId: "new_step_name",
              workflowId: "workflow_1",
              transactionId: executionsList[0].transaction_id,
            },
            stepResponse: { uhuuuu: "yeaah!" },
          })

          ;({ data: executionsList } = await query.graph({
            entity: "workflow_executions",
            fields: ["id"],
          }))

          expect(executionsList).toHaveLength(0)
          expect(result).toEqual({
            done: {
              inputFromSyncStep: "oh",
            },
          })
        })

        it("should return a list of workflow executions and keep it saved when there is a retentionTime set", async () => {
          await workflowOrcModule.run("workflow_2", {
            input: {
              value: "123",
            },
            throwOnError: true,
            transactionId: "transaction_1",
          })

          let { data: executionsList } = await query.graph({
            entity: "workflow_executions",
            fields: ["id"],
          })

          expect(executionsList).toHaveLength(1)

          await workflowOrcModule.setStepSuccess({
            idempotencyKey: {
              action: TransactionHandlerType.INVOKE,
              stepId: "new_step_name",
              workflowId: "workflow_2",
              transactionId: "transaction_1",
            },
            stepResponse: { uhuuuu: "yeaah!" },
          })

          expect(workflow2Step2Invoke).toHaveBeenCalledTimes(2)
          expect(workflow2Step2Invoke.mock.calls[0][0]).toEqual({ hey: "oh" })
          expect(workflow2Step2Invoke.mock.calls[1][0]).toEqual({})

          expect(workflow2Step3Invoke).toHaveBeenCalledTimes(1)
          expect(workflow2Step3Invoke.mock.calls[0][0]).toEqual({
            uhuuuu: "yeaah!",
          })
          ;({ data: executionsList } = await query.graph({
            entity: "workflow_executions",
            fields: ["id"],
          }))

          expect(executionsList).toHaveLength(1)
        })

        it("should return a list of workflow executions and keep it saved when there is a retentionTime set but allow for executing the same workflow multiple times with different run_id if the workflow is considered done", async () => {
          const transactionId = "transaction_1"
          await workflowOrcModule.run(
            "workflow_not_idempotent_with_retention",
            {
              input: {
                value: "123",
              },
              transactionId,
            }
          )

          let { data: executionsList } = await query.graph({
            entity: "workflow_executions",
            fields: ["id", "run_id", "transaction_id"],
          })

          expect(executionsList).toHaveLength(1)

          expect(
            workflowNotIdempotentWithRetentionStep2Invoke
          ).toHaveBeenCalledTimes(2)
          expect(
            workflowNotIdempotentWithRetentionStep2Invoke.mock.calls[0][0]
          ).toEqual({ hey: "oh" })
          expect(
            workflowNotIdempotentWithRetentionStep2Invoke.mock.calls[1][0]
          ).toEqual({
            hey: "hello",
          })
          expect(
            workflowNotIdempotentWithRetentionStep3Invoke
          ).toHaveBeenCalledTimes(1)
          expect(
            workflowNotIdempotentWithRetentionStep3Invoke.mock.calls[0][0]
          ).toEqual({
            notAsyncResponse: "hello",
          })

          await workflowOrcModule.run(
            "workflow_not_idempotent_with_retention",
            {
              input: {
                value: "123",
              },
              transactionId,
            }
          )

          const { data: executionsList2 } = await query.graph({
            entity: "workflow_executions",
            filters: {
              id: { $nin: executionsList.map((e) => e.id) },
            },
            fields: ["id", "run_id", "transaction_id"],
          })

          expect(executionsList2).toHaveLength(1)
          expect(executionsList2[0].run_id).not.toEqual(
            executionsList[0].run_id
          )
          expect(executionsList2[0].transaction_id).toEqual(
            executionsList[0].transaction_id
          )
        })

        it("should revert the entire transaction when a step timeout expires", async () => {
          const { transaction } = (await workflowOrcModule.run(
            "workflow_step_timeout",
            {
              input: {},
              throwOnError: false,
            }
          )) as Awaited<{ transaction: DistributedTransactionType }>

          expect(transaction.getFlow().state).toEqual("reverted")
        })

        it("should revert the entire transaction when the transaction timeout expires", async () => {
          const { transaction } = (await workflowOrcModule.run(
            "workflow_transaction_timeout",
            {
              input: {},
              throwOnError: false,
            }
          )) as Awaited<{ transaction: DistributedTransactionType }>

          await setTimeoutPromise(200)

          expect(transaction.getFlow().state).toEqual("reverted")
        })

        it("should subscribe to a async workflow and receive the response when it finishes", (done) => {
          const transactionId = "trx_123"

          const onFinish = jest.fn(() => {
            done()
          })

          void workflowOrcModule.subscribe({
            workflowId: "workflow_async_background",
            transactionId,
            subscriber: (event) => {
              if (event.eventType === "onFinish") {
                onFinish()
              }
            },
          })

          void workflowOrcModule.run("workflow_async_background", {
            input: {
              myInput: "123",
            },
            transactionId,
            throwOnError: false,
          })

          expect(onFinish).toHaveBeenCalledTimes(0)
          failTrap(done)
        })

        it("should cancel and revert a completed workflow", async () => {
          const workflowId = "workflow_sync"

          const { acknowledgement, transaction: trx } =
            await workflowOrcModule.run(workflowId, {
              input: {
                value: "123",
              },
            })

          expect(trx.getFlow().state).toEqual("done")
          expect(acknowledgement.hasFinished).toBe(true)

          const { transaction } = await workflowOrcModule.cancel(workflowId, {
            transactionId: acknowledgement.transactionId,
          })

          expect(transaction.getFlow().state).toEqual("reverted")
        })

        it("should cancel and revert a non idempotent completed workflow with rentention time given a specific transaction id", async () => {
          const workflowId = "workflow_not_idempotent_with_retention"
          const transactionId = "trx_123"

          await workflowOrcModule.run(workflowId, {
            input: {
              value: "123",
            },
            transactionId,
          })

          let executions = await workflowOrcModule.listWorkflowExecutions({
            transaction_id: transactionId,
          })

          expect(executions.length).toEqual(1)
          expect(executions[0].state).toEqual(TransactionState.DONE)
          expect(executions[0].transaction_id).toEqual(transactionId)

          await workflowOrcModule.cancel(workflowId, {
            transactionId,
          })

          executions = await workflowOrcModule.listWorkflowExecutions({
            transaction_id: transactionId,
          })

          expect(executions.length).toEqual(1)
          expect(executions[0].state).toEqual(TransactionState.REVERTED)
        })

        it("should run conditional steps if condition is true", (done) => {
          void workflowOrcModule.subscribe({
            workflowId: "workflow_conditional_step",
            subscriber: (event) => {
              if (event.eventType === "onFinish") {
                done()
                expect(conditionalStep2Invoke).toHaveBeenCalledTimes(2)
                expect(conditionalStep3Invoke).toHaveBeenCalledTimes(1)
              }
            },
          })

          workflowOrcModule.run("workflow_conditional_step", {
            input: {
              runNewStepName: true,
            },
            throwOnError: true,
          })

          failTrap(done)
        })

        it("should not run conditional steps if condition is false", (done) => {
          void workflowOrcModule.subscribe({
            workflowId: "workflow_conditional_step",
            subscriber: (event) => {
              if (event.eventType === "onFinish") {
                done()
                expect(conditionalStep2Invoke).toHaveBeenCalledTimes(1)
                expect(conditionalStep3Invoke).toHaveBeenCalledTimes(0)
              }
            },
          })

          workflowOrcModule.run("workflow_conditional_step", {
            input: {
              runNewStepName: false,
            },
            throwOnError: true,
          })

          failTrap(done)
        })
      })

      describe("Scheduled workflows", () => {
        beforeEach(() => {
          jest.clearAllMocks()

          // Register test-value in the container for all tests
          const sharedContainer =
            workflowOrcModule["workflowOrchestratorService_"]["container_"]

          sharedContainer.register(
            "test-value",
            asFunction(() => "test")
          )
        })

        it("should execute a scheduled workflow", async () => {
          const wait = times(2)
          const spy = createScheduled("standard", wait.next)

          await wait.promise
          expect(spy).toHaveBeenCalledTimes(2)
          WorkflowManager.unregister("standard")
        })

        it("should stop executions after the set number of executions", async () => {
          const wait = times(2)
          const spy = createScheduled("num-executions", wait.next, {
            interval: 1000,
            numberOfExecutions: 2,
          })

          await wait.promise
          expect(spy).toHaveBeenCalledTimes(2)

          // Make sure that on the next tick it doesn't execute again
          await setTimeoutPromise(1100)
          expect(spy).toHaveBeenCalledTimes(2)

          WorkflowManager.unregister("num-execution")
        })

        it("should remove scheduled workflow if workflow no longer exists", async () => {
          const wait = times(1)
          const logger = sharedContainer_.resolve<Logger>(
            ContainerRegistrationKeys.LOGGER
          )

          const spy = createScheduled("remove-scheduled", wait.next, {
            interval: 1000,
          })
          const logSpy = jest.spyOn(logger, "warn")

          await wait.promise
          expect(spy).toHaveBeenCalledTimes(1)
          WorkflowManager["workflows"].delete("remove-scheduled")

          await setTimeoutPromise(1100)
          expect(spy).toHaveBeenCalledTimes(1)
          expect(logSpy).toHaveBeenCalledWith(
            "Tried to execute a scheduled workflow with ID remove-scheduled that does not exist, removing it from the scheduler."
          )
        })

        it("the scheduled workflow should have access to the shared container", async () => {
          const wait = times(1)

          const spy = await createScheduled("shared-container-job", wait.next, {
            interval: 1000,
          })
          await wait.promise

          expect(spy).toHaveBeenCalledTimes(1)

          expect(spy).toHaveReturnedWith(
            expect.objectContaining({ output: { testValue: "test" } })
          )
          WorkflowManager.unregister("shared-container-job")
        })

        it("should fetch an idempotent workflow after its completion", async () => {
          const { transaction: firstRun } = (await workflowOrcModule.run(
            "workflow_idempotent",
            {
              input: {
                value: "123",
              },
              throwOnError: true,
              transactionId: "transaction_1",
            }
          )) as Awaited<{ transaction: DistributedTransactionType }>

          let { data: executionsList } = await query.graph({
            entity: "workflow_executions",
            fields: ["id"],
          })

          const { transaction: secondRun } = (await workflowOrcModule.run(
            "workflow_idempotent",
            {
              input: {
                value: "123",
              },
              throwOnError: true,
              transactionId: "transaction_1",
            }
          )) as Awaited<{ transaction: DistributedTransactionType }>

          const { data: executionsListAfter } = await query.graph({
            entity: "workflow_executions",
            fields: ["id"],
          })

          expect(secondRun.getFlow().startedAt).toEqual(
            firstRun.getFlow().startedAt
          )
          expect(executionsList).toHaveLength(1)
          expect(executionsListAfter).toHaveLength(1)
        })

        it("should display error when multple async steps are running in parallel", (done) => {
          void workflowOrcModule.run("workflow_parallel_async", {
            input: {},
            throwOnError: false,
          })

          void workflowOrcModule.subscribe({
            workflowId: "workflow_parallel_async",
            subscriber: (event) => {
              if (event.eventType === "onFinish") {
                done()
                expect(event.errors).toEqual(
                  expect.arrayContaining([
                    expect.objectContaining({
                      action: "step_2",
                      handlerType: "invoke",
                      error: expect.objectContaining({
                        message: "Error in parallel step",
                      }),
                    }),
                  ])
                )
              }
            },
          })

          failTrap(done)
        })
      })

      describe("Cleaner job", function () {
        it("should remove expired executions of finished workflows and keep the others", async () => {
          const doneWorkflowId = "done-workflow-" + ulid()
          createWorkflow({ name: doneWorkflowId, retentionTime: 1 }, () => {
            return new WorkflowResponse("done")
          })

          const failingWorkflowId = "failing-workflow-" + ulid()
          const failingStep = createStep("failing-step", () => {
            throw new Error("I am failing")
          })
          createWorkflow({ name: failingWorkflowId, retentionTime: 1 }, () => {
            failingStep()
          })

          const revertingStep = createStep(
            "reverting-step",
            () => {
              throw new Error("I am reverting")
            },
            () => {
              return new StepResponse("reverted")
            }
          )

          const revertingWorkflowId = "reverting-workflow-" + ulid()
          createWorkflow(
            { name: revertingWorkflowId, retentionTime: 1 },
            () => {
              revertingStep()
              return new WorkflowResponse("reverted")
            }
          )

          const runningWorkflowId = "running-workflow-" + ulid()
          const longRunningStep = createStep("long-running-step", async () => {
            await setTimeoutPromise(10000)
            return new StepResponse("long running finished")
          })
          createWorkflow({ name: runningWorkflowId, retentionTime: 1 }, () => {
            longRunningStep().config({ async: true, backgroundExecution: true })
            return new WorkflowResponse("running workflow started")
          })

          const notExpiredWorkflowId = "not-expired-workflow-" + ulid()
          createWorkflow(
            { name: notExpiredWorkflowId, retentionTime: 1000 },
            () => {
              return new WorkflowResponse("not expired")
            }
          )

          const trx_done = "trx-done-" + ulid()
          const trx_failed = "trx-failed-" + ulid()
          const trx_reverting = "trx-reverting-" + ulid()
          const trx_running = "trx-running-" + ulid()
          const trx_not_expired = "trx-not-expired-" + ulid()

          // run workflows
          await workflowOrcModule.run(doneWorkflowId, {
            transactionId: trx_done,
          })

          await workflowOrcModule.run(failingWorkflowId, {
            transactionId: trx_failed,
            throwOnError: false,
          })

          await workflowOrcModule.run(revertingWorkflowId, {
            transactionId: trx_reverting,
            throwOnError: false,
          })

          await workflowOrcModule.run(runningWorkflowId, {
            transactionId: trx_running,
          })

          await workflowOrcModule.run(notExpiredWorkflowId, {
            transactionId: trx_not_expired,
          })

          const executions = await workflowOrcModule.listWorkflowExecutions()
          expect(executions).toHaveLength(5)

          await setTimeoutPromise(2000)

          // Manually trigger cleaner
          await (workflowOrcModule as any).workflowOrchestratorService_[
            "inMemoryDistributedTransactionStorage_"
          ]["clearExpiredExecutions"]()

          let remainingExecutions =
            await workflowOrcModule.listWorkflowExecutions()

          expect(remainingExecutions).toHaveLength(2)

          const remainingTrxIds = remainingExecutions
            .map((e) => e.transaction_id)
            .sort()

          expect(remainingTrxIds).toEqual([trx_not_expired, trx_running].sort())

          const notExpiredExec = remainingExecutions.find(
            (e) => e.transaction_id === trx_not_expired
          )
          expect(notExpiredExec?.state).toBe(TransactionState.DONE)

          const runningExec = remainingExecutions.find(
            (e) => e.transaction_id === trx_running
          )
          expect(runningExec?.state).toBe(TransactionState.INVOKING)
        })
      })
    })
  },
})
