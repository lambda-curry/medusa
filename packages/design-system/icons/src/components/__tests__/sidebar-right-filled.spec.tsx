  import * as React from "react"
  import { cleanup, render, screen } from "@testing-library/react"

  import SidebarRightFilled from "../sidebar-right-filled"

  describe("SidebarRightFilled", () => {
    it("should render the icon without errors", async () => {
      render(<SidebarRightFilled data-testid="icon" />)


      const svgElement = screen.getByTestId("icon")

      expect(svgElement).toBeInTheDocument()

      cleanup()
    })
  })