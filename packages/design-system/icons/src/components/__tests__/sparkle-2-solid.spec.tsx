  import * as React from "react"
  import { cleanup, render, screen } from "@testing-library/react"

  import Sparkle2Solid from "../sparkle-2-solid"

  describe("Sparkle2Solid", () => {
    it("should render the icon without errors", async () => {
      render(<Sparkle2Solid data-testid="icon" />)


      const svgElement = screen.getByTestId("icon")

      expect(svgElement).toBeInTheDocument()

      cleanup()
    })
  })