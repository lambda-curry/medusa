  import * as React from "react"
  import { cleanup, render, screen } from "@testing-library/react"

  import WIP from "../WIP"

  describe("WIP", () => {
    it("should render the icon without errors", async () => {
      render(<WIP data-testid="icon" />)


      const svgElement = screen.getByTestId("icon")

      expect(svgElement).toBeInTheDocument()

      cleanup()
    })
  })