  import * as React from "react"
  import { cleanup, render, screen } from "@testing-library/react"

  import Paypal from "../paypal"

  describe("Paypal", () => {
    it("should render the icon without errors", async () => {
      render(<Paypal data-testid="icon" />)


      const svgElement = screen.getByTestId("icon")

      expect(svgElement).toBeInTheDocument()

      cleanup()
    })
  })