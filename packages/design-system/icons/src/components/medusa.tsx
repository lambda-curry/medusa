import * as React from "react"
import type { IconProps } from "../types"
const Medusa = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = "currentColor", ...props }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        fill="none"
        ref={ref}
        {...props}
      >
        <path fill={color} d="M0 0h20v20H0z" />
        <path fill="url(#a)" fillOpacity={0.2} d="M0 0h20v20H0z" />
        <path
          fill="#fff"
          d="m14.163 5.948-2.717-1.563a2.87 2.87 0 0 0-2.868 0l-2.73 1.563a2.89 2.89 0 0 0-1.427 2.476v3.14c0 1.025.551 1.963 1.428 2.476l2.717 1.575c.889.513 1.978.513 2.867 0l2.718-1.575a2.85 2.85 0 0 0 1.427-2.477V8.424c.025-1.013-.526-1.963-1.415-2.476m-4.157 6.841A2.793 2.793 0 0 1 7.214 10a2.793 2.793 0 0 1 2.792-2.789c1.54 0 2.805 1.25 2.805 2.789a2.796 2.796 0 0 1-2.805 2.789"
        />
        <defs>
          <linearGradient
            id="a"
            x1={10}
            x2={10}
            y1={0}
            y2={20}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#fff" />
            <stop offset={1} stopColor="#fff" stopOpacity={0} />
          </linearGradient>
        </defs>
      </svg>
    )
  }
)
Medusa.displayName = "Medusa"
export default Medusa
