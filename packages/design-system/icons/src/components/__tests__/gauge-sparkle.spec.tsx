  import * as React from "react"
  import { cleanup, render, screen } from "@testing-library/react"

  import GaugeSparkle from "../gauge-sparkle"

  describe("GaugeSparkle", () => {
    it("should render the icon without errors", async () => {
      render(<GaugeSparkle data-testid="icon" />)


      const svgElement = screen.getByTestId("icon")

      expect(svgElement).toBeInTheDocument()

      cleanup()
    })
  })