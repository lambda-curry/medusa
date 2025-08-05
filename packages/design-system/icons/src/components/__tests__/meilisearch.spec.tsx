  import * as React from "react"
  import { cleanup, render, screen } from "@testing-library/react"

  import Meilisearch from "../meilisearch"

  describe("Meilisearch", () => {
    it("should render the icon without errors", async () => {
      render(<Meilisearch data-testid="icon" />)


      const svgElement = screen.getByTestId("icon")

      expect(svgElement).toBeInTheDocument()

      cleanup()
    })
  })