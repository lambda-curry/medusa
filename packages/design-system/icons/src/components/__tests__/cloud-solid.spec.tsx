  import * as React from "react"
  import { cleanup, render, screen } from "@testing-library/react"

  import CloudSolid from "../cloud-solid"

  describe("CloudSolid", () => {
    it("should render the icon without errors", async () => {
      render(<CloudSolid data-testid="icon" />)


      const svgElement = screen.getByTestId("icon")

      expect(svgElement).toBeInTheDocument()

      cleanup()
    })
  })