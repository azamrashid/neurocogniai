"use client"

import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { metric: "Accuracy", model: 97.99 },
  { metric: "Precision", model: 96.99 },
  { metric: "Recall", model: 96.50 },
  { metric: "F1 Score", model: 97.99 },
  { metric: "Predictions", model: 98.99 },
  { metric: "Efficiency", model: 97.99 },
]

const chartConfig = {
  model: {
    label: "Alzheimer Model: ",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export default function RadarModelChart() {
  return (
          <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[350px]  bg-[#0b1e3d]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="metric" />
            <PolarGrid />
            <Radar
              dataKey="model"
              fill="#3b82f6"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
            <div className="flex items-center justify-center gap-2 font-medium leading-none align-middle text-center">
            Alzheimer Model Metrics
            </div>
        </ChartContainer>
        
       )
}
