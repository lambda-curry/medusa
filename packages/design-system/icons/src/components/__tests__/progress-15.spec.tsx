  import * as React from "react"
  import { cleanup, render, screen } from "@testing-library/react"

  import Progress15 from "../progress-15"

  describe("Progress15", () => {
    it("should render the icon without errors", async () => {
      render(<Progress15 data-testid="icon" />)


      const svgElement = screen.getByTestId("icon")

      expect(svgElement).toBeInTheDocument()

      cleanup()
    })
  })