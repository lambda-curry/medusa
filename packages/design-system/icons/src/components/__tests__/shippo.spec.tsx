  import * as React from "react"
  import { cleanup, render, screen } from "@testing-library/react"

  import Shippo from "../shippo"

  describe("Shippo", () => {
    it("should render the icon without errors", async () => {
      render(<Shippo data-testid="icon" />)


      const svgElement = screen.getByTestId("icon")

      expect(svgElement).toBeInTheDocument()

      cleanup()
    })
  })