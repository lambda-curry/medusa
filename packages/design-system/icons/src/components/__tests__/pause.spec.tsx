  import * as React from "react"
  import { cleanup, render, screen } from "@testing-library/react"

  import Pause from "../pause"

  describe("Pause", () => {
    it("should render the icon without errors", async () => {
      render(<Pause data-testid="icon" />)


      const svgElement = screen.getByTestId("icon")

      expect(svgElement).toBeInTheDocument()

      cleanup()
    })
  })