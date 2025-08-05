  import * as React from "react"
  import { cleanup, render, screen } from "@testing-library/react"

  import IdBadge from "../id-badge"

  describe("IdBadge", () => {
    it("should render the icon without errors", async () => {
      render(<IdBadge data-testid="icon" />)


      const svgElement = screen.getByTestId("icon")

      expect(svgElement).toBeInTheDocument()

      cleanup()
    })
  })