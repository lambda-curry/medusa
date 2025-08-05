import * as React from "react"
import type { IconProps } from "../types"
const Resend = React.forwardRef<SVGSVGElement, IconProps>(
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
        <path fill="#0F0F0F" d="M0 0h20v20H0z" />
        <path fill="url(#a)" fillOpacity={0.2} d="M0 0h20v20H0z" />
        <path
          fill="#fff"
          d="m15.172 15.8-2.687-4.657c.12-.06.18-.06.299-.12.597-.357 1.074-.775 1.432-1.372a3.76 3.76 0 0 0 .538-1.97q0-1.076-.538-1.97c-.358-.598-.835-1.016-1.432-1.374S11.53 3.8 10.754 3.8H5.5v11.94h2.448v-4.298h1.91l2.388 4.298zM7.948 6.068h2.388c.358 0 .716.06 1.015.24.298.119.477.357.656.596.06.24.18.538.18.836q0 .448-.18.896c-.119.238-.298.477-.537.597-.239.119-.478.179-.776.179H7.948z"
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
Resend.displayName = "Resend"
export default Resend
