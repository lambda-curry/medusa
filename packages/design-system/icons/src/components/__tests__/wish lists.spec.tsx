  import * as React from "react"
  import { cleanup, render, screen } from "@testing-library/react"

  import WishLists from "../wish lists"

  describe("WishLists", () => {
    it("should render the icon without errors", async () => {
      render(<WishLists data-testid="icon" />)


      const svgElement = screen.getByTestId("icon")

      expect(svgElement).toBeInTheDocument()

      cleanup()
    })
  })