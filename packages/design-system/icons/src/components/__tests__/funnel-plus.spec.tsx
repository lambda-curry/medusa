  import * as React from "react"
  import { cleanup, render, screen } from "@testing-library/react"

  import FunnelPlus from "../funnel-plus"

  describe("FunnelPlus", () => {
    it("should render the icon without errors", async () => {
      render(<FunnelPlus data-testid="icon" />)


      const svgElement = screen.getByTestId("icon")

      expect(svgElement).toBeInTheDocument()

      cleanup()
    })
  })