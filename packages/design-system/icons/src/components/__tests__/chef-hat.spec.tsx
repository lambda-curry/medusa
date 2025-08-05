  import * as React from "react"
  import { cleanup, render, screen } from "@testing-library/react"

  import ChefHat from "../chef-hat"

  describe("ChefHat", () => {
    it("should render the icon without errors", async () => {
      render(<ChefHat data-testid="icon" />)


      const svgElement = screen.getByTestId("icon")

      expect(svgElement).toBeInTheDocument()

      cleanup()
    })
  })