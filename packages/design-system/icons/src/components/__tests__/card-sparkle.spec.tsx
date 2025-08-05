  import * as React from "react"
  import { cleanup, render, screen } from "@testing-library/react"

  import CardSparkle from "../card-sparkle"

  describe("CardSparkle", () => {
    it("should render the icon without errors", async () => {
      render(<CardSparkle data-testid="icon" />)


      const svgElement = screen.getByTestId("icon")

      expect(svgElement).toBeInTheDocument()

      cleanup()
    })
  })