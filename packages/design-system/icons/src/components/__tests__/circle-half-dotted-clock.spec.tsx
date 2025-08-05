  import * as React from "react"
  import { cleanup, render, screen } from "@testing-library/react"

  import CircleHalfDottedClock from "../circle-half-dotted-clock"

  describe("CircleHalfDottedClock", () => {
    it("should render the icon without errors", async () => {
      render(<CircleHalfDottedClock data-testid="icon" />)


      const svgElement = screen.getByTestId("icon")

      expect(svgElement).toBeInTheDocument()

      cleanup()
    })
  })