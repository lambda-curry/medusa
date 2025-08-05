  import * as React from "react"
  import { cleanup, render, screen } from "@testing-library/react"

  import MinusBadge from "../minus-badge"

  describe("MinusBadge", () => {
    it("should render the icon without errors", async () => {
      render(<MinusBadge data-testid="icon" />)


      const svgElement = screen.getByTestId("icon")

      expect(svgElement).toBeInTheDocument()

      cleanup()
    })
  })