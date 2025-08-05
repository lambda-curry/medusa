#!/usr/bin/env node

import { LinearClient } from "@linear/sdk"
import { Octokit } from "@octokit/core"
import fs from "fs"
import path from "path"
import { getDirname } from "utils"

const octokit = new Octokit({
  auth: process.env.GH_TOKEN,
})

const linearClient = new LinearClient({
  apiKey: process.env.LINEAR_API_KEY,
})

const __dirname = getDirname(import.meta.url)
const monorepoRoot = path.join(__dirname, "..", "..", "..", "..", "..")

let freshnessCheckLabelId = ""
let documentationTeamId = ""

async function scanDirectory(startPath: string) {
  const files = fs.readdirSync(path.join(startPath), {
    withFileTypes: true,
  })

  for (const file of files) {
    const filePath = path.join(startPath, file.name)
    if (file.isDirectory()) {
      //if it's references directory, skip
      if (file.name !== "references") {
        await scanDirectory(filePath)
      }
      continue
    }

    //check that the file is a markdown file
    if (file.name.indexOf(".md") === -1 && file.name.indexOf(".mdx") === -1) {
      continue
    }

    //if it is a file, check its commits in GitHub
    // retrieve relative path to monorepo root
    const relativeFilePath = path.relative(monorepoRoot, filePath)
    const commitResponse = await octokit.request(
      "GET /repos/{owner}/{repo}/commits",
      {
        owner: "medusajs",
        repo: "medusa",
        path: relativeFilePath,
        per_page: 1,
      }
    )

    if (
      !commitResponse.data.length ||
      !commitResponse.data[0].commit.committer?.date
    ) {
      continue
    }

    const today = new Date()
    const lastEditedDate = new Date(
      commitResponse.data[0].commit.committer.date
    )
    const monthsSinceEdited = getMonthDifference(lastEditedDate, today)
    const monthsThreshold = 6

    if (monthsSinceEdited > monthsThreshold) {
      //file was edited more than 6 months ago.
      //check if there's an issue created for this file since the commit date
      const existingIssue = await linearClient.issues({
        filter: {
          createdAt: {
            gte: subtractMonths(monthsSinceEdited - monthsThreshold, today),
          },
          title: {
            containsIgnoreCase: relativeFilePath,
          },
          labels: {
            some: {
              id: {
                eq: freshnessCheckLabelId,
              },
            },
          },
        },
        first: 1,
      })

      if (existingIssue.nodes.length) {
        //an issue has been created for the past 6 months. Don't create an issue for it.
        continue
      }

      console.log(`Creating an issue for ${relativeFilePath}...`)

      //there are no issues in the past 6 months. Create an issue
      await linearClient.createIssue({
        teamId: documentationTeamId,
        title: `Freshness check for ${relativeFilePath}`,
        labelIds: [freshnessCheckLabelId],
        description: `File \`${relativeFilePath}\` was last edited on ${lastEditedDate.toDateString()}. Please review and update the content if necessary.`,
      })
    }
  }
}

async function main() {
  //fetch documentation team ID from linear
  const documentationTeam = await linearClient.teams({
    filter: {
      name: {
        eqIgnoreCase: "DX",
      },
    },
    first: 1,
  })

  if (!documentationTeam.nodes.length) {
    console.log("Please add DX team in Linear first then try again")
    process.exit(1)
  }

  documentationTeamId = documentationTeam.nodes[0].id

  //fetch freshness check label ID from linear
  const freshnessCheckLabel = await linearClient.issueLabels({
    filter: {
      name: {
        eqIgnoreCase: "type: freshness-check",
      },
      team: {
        id: {
          eq: documentationTeamId,
        },
      },
    },
  })

  if (!freshnessCheckLabel.nodes.length) {
    console.log(
      "Please add freshness check label in Linear under the DX team first then try again"
    )
    process.exit(1)
  }

  freshnessCheckLabelId = freshnessCheckLabel.nodes[0].id

  await scanDirectory(path.join(monorepoRoot, "www", "apps", "book", "app"))
  await scanDirectory(
    path.join(monorepoRoot, "www", "apps", "resources", "app")
  )
  await scanDirectory(
    path.join(monorepoRoot, "www", "apps", "user-guide", "app")
  )
  await scanDirectory(
    path.join(monorepoRoot, "www", "apps", "ui", "src", "content", "docs")
  )
  await scanDirectory(path.join(monorepoRoot, "www", "apps", "cloud", "app"))
}

function getMonthDifference(startDate: Date, endDate: Date) {
  return (
    endDate.getMonth() -
    startDate.getMonth() +
    12 * (endDate.getFullYear() - startDate.getFullYear())
  )
}

function subtractMonths(numOfMonths: number, date = new Date()) {
  date.setMonth(date.getMonth() - numOfMonths)

  return date
}

void main()
