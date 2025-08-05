  import * as React from "react"
  import { cleanup, render, screen } from "@testing-library/react"

  import Progress45 from "../progress-45"

  describe("Progress45", () => {
    it("should render the icon without errors", async () => {
      render(<Progress45 data-testid="icon" />)


      const svgElement = screen.getByTestId("icon")

      expect(svgElement).toBeInTheDocument()

      cleanup()
    })
  })