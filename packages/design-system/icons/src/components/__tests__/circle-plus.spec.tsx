  import * as React from "react"
  import { cleanup, render, screen } from "@testing-library/react"

  import CirclePlus from "../circle-plus"

  describe("CirclePlus", () => {
    it("should render the icon without errors", async () => {
      render(<CirclePlus data-testid="icon" />)


      const svgElement = screen.getByTestId("icon")

      expect(svgElement).toBeInTheDocument()

      cleanup()
    })
  })