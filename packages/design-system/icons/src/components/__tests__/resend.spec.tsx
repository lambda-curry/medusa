  import * as React from "react"
  import { cleanup, render, screen } from "@testing-library/react"

  import Resend from "../resend"

  describe("Resend", () => {
    it("should render the icon without errors", async () => {
      render(<Resend data-testid="icon" />)


      const svgElement = screen.getByTestId("icon")

      expect(svgElement).toBeInTheDocument()

      cleanup()
    })
  })