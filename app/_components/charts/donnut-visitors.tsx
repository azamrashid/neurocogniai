"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { browser: "chrome", visitors: 1895, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 2000, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 2220, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 1990, fill: "var(--color-edge)" },
  { browser: "other", visitors: 1894, fill: "var(--color-other)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Jan",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Feb",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Mar",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Apr",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "May",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export default function DonutVisitorsChart() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  }, [])

  return (
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[200px] bg-[#0b1e3d] "
        >
          <PieChart>
              <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
             data={chartData}
             dataKey="visitors"
             nameKey="browser"
             innerRadius={50}
             outerRadius={70}
             strokeWidth={0} // ✅ Removes extra stroke/border
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-white text-lg font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-white"
                        >
                          Visitors
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
     )
}
