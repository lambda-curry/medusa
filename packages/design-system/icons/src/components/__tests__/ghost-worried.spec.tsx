  import * as React from "react"
  import { cleanup, render, screen } from "@testing-library/react"

  import GhostWorried from "../ghost-worried"

  describe("GhostWorried", () => {
    it("should render the icon without errors", async () => {
      render(<GhostWorried data-testid="icon" />)


      const svgElement = screen.getByTestId("icon")

      expect(svgElement).toBeInTheDocument()

      cleanup()
    })
  })