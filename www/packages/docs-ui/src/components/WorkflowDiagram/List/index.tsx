"use client"

import React from "react"
import { createNodeClusters, getNextCluster } from "../../../utils"
import { WorkflowDiagramCommonProps } from "../../.."
import { WorkflowDiagramListDepth } from "./Depth"
import { WorkflowDiagramLegend } from "../Common/Legend"

export const WorkflowDiagramList = ({
  workflow,
  hideLegend = false,
}: WorkflowDiagramCommonProps) => {
  const clusters = createNodeClusters(workflow.steps)

  return (
    <div className="flex flex-col gap-docs_1 my-docs_1 w-fit">
      <div className="workflow-list-diagram flex flex-col gap-docs_0.5 w-fit">
        {Object.entries(clusters).map(([depth, cluster]) => {
          const next = getNextCluster(clusters, Number(depth))

          return (
            <WorkflowDiagramListDepth
              cluster={cluster}
              next={next}
              key={depth}
            />
          )
        })}
      </div>
      <WorkflowDiagramLegend hideLegend={hideLegend} />
    </div>
  )
}
