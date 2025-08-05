  import * as React from "react"
  import { cleanup, render, screen } from "@testing-library/react"

  import Progress90 from "../progress-90"

  describe("Progress90", () => {
    it("should render the icon without errors", async () => {
      render(<Progress90 data-testid="icon" />)


      const svgElement = screen.getByTestId("icon")

      expect(svgElement).toBeInTheDocument()

      cleanup()
    })
  })