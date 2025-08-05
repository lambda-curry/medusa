  import * as React from "react"
  import { cleanup, render, screen } from "@testing-library/react"

  import SidebarLeftFilled from "../sidebar-left-filled"

  describe("SidebarLeftFilled", () => {
    it("should render the icon without errors", async () => {
      render(<SidebarLeftFilled data-testid="icon" />)


      const svgElement = screen.getByTestId("icon")

      expect(svgElement).toBeInTheDocument()

      cleanup()
    })
  })