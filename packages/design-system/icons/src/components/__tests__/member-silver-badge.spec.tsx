  import * as React from "react"
  import { cleanup, render, screen } from "@testing-library/react"

  import MemberSilverBadge from "../member-silver-badge"

  describe("MemberSilverBadge", () => {
    it("should render the icon without errors", async () => {
      render(<MemberSilverBadge data-testid="icon" />)


      const svgElement = screen.getByTestId("icon")

      expect(svgElement).toBeInTheDocument()

      cleanup()
    })
  })