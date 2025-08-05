  import * as React from "react"
  import { cleanup, render, screen } from "@testing-library/react"

  import BroomSparkleSolid from "../broom-sparkle-solid"

  describe("BroomSparkleSolid", () => {
    it("should render the icon without errors", async () => {
      render(<BroomSparkleSolid data-testid="icon" />)


      const svgElement = screen.getByTestId("icon")

      expect(svgElement).toBeInTheDocument()

      cleanup()
    })
  })