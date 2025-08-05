  import * as React from "react"
  import { cleanup, render, screen } from "@testing-library/react"

  import Progress30 from "../progress-30"

  describe("Progress30", () => {
    it("should render the icon without errors", async () => {
      render(<Progress30 data-testid="icon" />)


      const svgElement = screen.getByTestId("icon")

      expect(svgElement).toBeInTheDocument()

      cleanup()
    })
  })