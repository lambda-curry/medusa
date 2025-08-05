  import * as React from "react"
  import { cleanup, render, screen } from "@testing-library/react"

  import BadgeCheck from "../badge-check"

  describe("BadgeCheck", () => {
    it("should render the icon without errors", async () => {
      render(<BadgeCheck data-testid="icon" />)


      const svgElement = screen.getByTestId("icon")

      expect(svgElement).toBeInTheDocument()

      cleanup()
    })
  })