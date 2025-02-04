"use client"

//import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { month: "January", NewPatient: 186, ReturningPatient: 80 },
  { month: "February", NewPatient: 305, ReturningPatient: 200 },
  { month: "March", NewPatient: 237, ReturningPatient: 120 },
  { month: "April", NewPatient: 73, ReturningPatient: 190 },
  { month: "May", NewPatient: 209, ReturningPatient: 130 },
  { month: "June", NewPatient: 214, ReturningPatient: 140 },
]

const chartConfig = {
  NewPatient: {
    label: "New Patient",
    color: "hsl(var(--chart-1))",
  },
  ReturningPatient: {
    label: "Returning Patient",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export default function LineVisitorsChart() {
  return (
        <ChartContainer 
                  config={chartConfig}
                  className="mx-auto aspect-square max-w-[300px] bg-[#0b1e3d] "
                >
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="NewPatient" fill="var(--color-NewPatient)" radius={4} />
            <Bar dataKey="ReturningPatient" fill="var(--color-ReturningPatient)" radius={4} />
          </BarChart>
        </ChartContainer>
      
  )
}
