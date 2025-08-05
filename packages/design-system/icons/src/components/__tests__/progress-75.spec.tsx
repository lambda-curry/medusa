  import * as React from "react"
  import { cleanup, render, screen } from "@testing-library/react"

  import Progress75 from "../progress-75"

  describe("Progress75", () => {
    it("should render the icon without errors", async () => {
      render(<Progress75 data-testid="icon" />)


      const svgElement = screen.getByTestId("icon")

      expect(svgElement).toBeInTheDocument()

      cleanup()
    })
  })