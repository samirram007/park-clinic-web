import * as React from "react"

import { cn } from "@/lib/utils"

interface ScrollAreaProps
  extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical" | "both"
}

const ScrollArea = React.forwardRef<
  HTMLDivElement,
  ScrollAreaProps
>(({ className, children, orientation = "vertical", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative overflow-hidden rounded-lg border",
      className
    )}
    {...props}
  >
    <div
      className={cn(
        "h-full w-full",
        orientation === "horizontal" && "overflow-x-auto overflow-y-hidden",
        orientation === "vertical" && "overflow-y-auto overflow-x-hidden",
        orientation === "both" && "overflow-auto"
      )}
    >
      {children}
    </div>
  </div>
))
ScrollArea.displayName = "ScrollArea"

export { ScrollArea }
