  import * as React from "react"
  import { cleanup, render, screen } from "@testing-library/react"

  import DraftOrders from "../draft orders"

  describe("DraftOrders", () => {
    it("should render the icon without errors", async () => {
      render(<DraftOrders data-testid="icon" />)


      const svgElement = screen.getByTestId("icon")

      expect(svgElement).toBeInTheDocument()

      cleanup()
    })
  })