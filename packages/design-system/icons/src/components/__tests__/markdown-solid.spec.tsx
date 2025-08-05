  import * as React from "react"
  import { cleanup, render, screen } from "@testing-library/react"

  import MarkdownSolid from "../markdown-solid"

  describe("MarkdownSolid", () => {
    it("should render the icon without errors", async () => {
      render(<MarkdownSolid data-testid="icon" />)


      const svgElement = screen.getByTestId("icon")

      expect(svgElement).toBeInTheDocument()

      cleanup()
    })
  })