import { Modules } from "@medusajs/framework/utils"
import {
  createStep,
  createWorkflow,
  parallelize,
  StepResponse,
} from "@medusajs/framework/workflows-sdk"

const step_2 = createStep(
  {
    name: "step_2",
    async: true,
  },
  async (_, { container }) => {
    const we = container.resolve(Modules.WORKFLOW_ENGINE)

    await we.run("workflow_sub_workflow", {
      throwOnError: true,
    })
  }
)

const parallelStep2Invoke = jest.fn(() => {
  throw new Error("Error in parallel step")
})
const step_2_sub = createStep(
  {
    name: "step_2",
    async: true,
  },
  parallelStep2Invoke
)

const subFlow = createWorkflow(
  {
    name: "workflow_sub_workflow",
    retentionTime: 1000,
  },
  function (input) {
    step_2_sub()
  }
)

const step_1 = createStep(
  {
    name: "step_1",
    async: true,
  },
  jest.fn(() => {
    return new StepResponse("step_1")
  })
)

const parallelStep3Invoke = jest.fn(() => {
  return new StepResponse({
    done: true,
  })
})

const step_3 = createStep(
  {
    name: "step_3",
    async: true,
  },
  parallelStep3Invoke
)

createWorkflow(
  {
    name: "workflow_parallel_async",
    retentionTime: 1000,
  },
  function (input) {
    parallelize(step_1(), step_2(), step_3())
  }
)
