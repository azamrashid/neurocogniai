"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
    { month: "Jan", accuracy: 95.1, fill: "#ff6384" },
    { month: "Feb", accuracy: 96.2, fill: "#36a2eb" },
    { month: "Mar", accuracy: 97.3, fill: "#ffce56" },
    { month: "Apr", accuracy: 98.0, fill: "#4bc0c0" },
    { month: "May", accuracy: 98.3, fill: "#9966ff" },
  ];

const chartConfig = {
  accuracy: { label: "Model Accuracy (%)" },
  Jan: { label: "January", color: "hsl(var(--chart-1))" },
  Feb: { label: "February", color: "hsl(var(--chart-2))" },
  Mar: { label: "March", color: "hsl(var(--chart-3))" },
  Apr: { label: "April", color: "hsl(var(--chart-4))" },
  May: { label: "May", color: "hsl(var(--chart-5))" },
} satisfies ChartConfig;

export default function DonutAccuracyChart() {
  // Calculate the average accuracy
  const averageAccuracy = React.useMemo(() => {
    return (chartData.reduce((acc, curr) => acc + curr.accuracy, 0) / chartData.length).toFixed(2);
  }, []);

  return (
    <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[200px] bg-[#0b1e3d]">
      <PieChart>
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Pie
          data={chartData}
          dataKey="accuracy" // ✅ Updated dataKey to "accuracy"
          nameKey="month" // ✅ Updated nameKey to "month"
          innerRadius={50}
          outerRadius={70}
          strokeWidth={0} // ✅ Removes extra stroke/border
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                    <tspan x={viewBox.cx} y={viewBox.cy} className="fill-white text-lg font-bold">
                      {averageAccuracy}%
                    </tspan>
                    <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-white">
                      Avg Accuracy
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
