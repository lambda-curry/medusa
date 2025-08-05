  import * as React from "react"
  import { cleanup, render, screen } from "@testing-library/react"

  import FaceCrossedOutEyes from "../face-crossed-out-eyes"

  describe("FaceCrossedOutEyes", () => {
    it("should render the icon without errors", async () => {
      render(<FaceCrossedOutEyes data-testid="icon" />)


      const svgElement = screen.getByTestId("icon")

      expect(svgElement).toBeInTheDocument()

      cleanup()
    })
  })