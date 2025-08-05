  import * as React from "react"
  import { cleanup, render, screen } from "@testing-library/react"

  import Linear from "../linear"

  describe("Linear", () => {
    it("should render the icon without errors", async () => {
      render(<Linear data-testid="icon" />)


      const svgElement = screen.getByTestId("icon")

      expect(svgElement).toBeInTheDocument()

      cleanup()
    })
  })