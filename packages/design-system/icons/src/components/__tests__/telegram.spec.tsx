  import * as React from "react"
  import { cleanup, render, screen } from "@testing-library/react"

  import Telegram from "../telegram"

  describe("Telegram", () => {
    it("should render the icon without errors", async () => {
      render(<Telegram data-testid="icon" />)


      const svgElement = screen.getByTestId("icon")

      expect(svgElement).toBeInTheDocument()

      cleanup()
    })
  })