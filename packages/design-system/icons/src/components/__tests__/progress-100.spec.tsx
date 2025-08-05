  import * as React from "react"
  import { cleanup, render, screen } from "@testing-library/react"

  import Progress100 from "../progress-100"

  describe("Progress100", () => {
    it("should render the icon without errors", async () => {
      render(<Progress100 data-testid="icon" />)


      const svgElement = screen.getByTestId("icon")

      expect(svgElement).toBeInTheDocument()

      cleanup()
    })
  })