  import * as React from "react"
  import { cleanup, render, screen } from "@testing-library/react"

  import FireSolid from "../fire-solid"

  describe("FireSolid", () => {
    it("should render the icon without errors", async () => {
      render(<FireSolid data-testid="icon" />)


      const svgElement = screen.getByTestId("icon")

      expect(svgElement).toBeInTheDocument()

      cleanup()
    })
  })