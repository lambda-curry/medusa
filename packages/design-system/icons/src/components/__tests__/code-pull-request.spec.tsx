  import * as React from "react"
  import { cleanup, render, screen } from "@testing-library/react"

  import CodePullRequest from "../code-pull-request"

  describe("CodePullRequest", () => {
    it("should render the icon without errors", async () => {
      render(<CodePullRequest data-testid="icon" />)


      const svgElement = screen.getByTestId("icon")

      expect(svgElement).toBeInTheDocument()

      cleanup()
    })
  })