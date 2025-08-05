  import * as React from "react"
  import { cleanup, render, screen } from "@testing-library/react"

  import Payphone from "../payphone"

  describe("Payphone", () => {
    it("should render the icon without errors", async () => {
      render(<Payphone data-testid="icon" />)


      const svgElement = screen.getByTestId("icon")

      expect(svgElement).toBeInTheDocument()

      cleanup()
    })
  })