  import * as React from "react"
  import { cleanup, render, screen } from "@testing-library/react"

  import Progress0 from "../progress-0"

  describe("Progress0", () => {
    it("should render the icon without errors", async () => {
      render(<Progress0 data-testid="icon" />)


      const svgElement = screen.getByTestId("icon")

      expect(svgElement).toBeInTheDocument()

      cleanup()
    })
  })