  import * as React from "react"
  import { cleanup, render, screen } from "@testing-library/react"

  import Progress60 from "../progress-60"

  describe("Progress60", () => {
    it("should render the icon without errors", async () => {
      render(<Progress60 data-testid="icon" />)


      const svgElement = screen.getByTestId("icon")

      expect(svgElement).toBeInTheDocument()

      cleanup()
    })
  })