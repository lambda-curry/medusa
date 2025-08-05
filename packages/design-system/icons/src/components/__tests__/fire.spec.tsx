  import * as React from "react"
  import { cleanup, render, screen } from "@testing-library/react"

  import Fire from "../fire"

  describe("Fire", () => {
    it("should render the icon without errors", async () => {
      render(<Fire data-testid="icon" />)


      const svgElement = screen.getByTestId("icon")

      expect(svgElement).toBeInTheDocument()

      cleanup()
    })
  })