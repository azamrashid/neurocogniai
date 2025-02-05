"use client";

import * as React from "react";
import {
  RadarChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  Tooltip as ChartTooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { metric: "Accuracy", model: 99.5 },
  { metric: "Precision", model: 98.7 },
  { metric: "Recall", model: 97.9 },
  { metric: "F1-Score", model: 98.3 },
  { metric: "Specificity", model: 96.5 },
];

const chartConfig = {
  model: {
    label: "Model Performance (%)",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function RadarMetricsChart() {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[350px] bg-[#0b1e3d]"
    >
      {/* ✅ Wrapped everything inside React.Fragment */}
      <>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="metric" />
            <PolarGrid />
            <Radar
              dataKey="model"
              fill="#3b82f6"
              fillOpacity={0.6}
              dot={{ r: 4, fillOpacity: 1 }}
            />
          </RadarChart>
        </ResponsiveContainer>

        {/* ✅ Wrapped text inside a div to prevent multiple children issue */}
        <div className="flex items-center justify-center gap-2 font-medium leading-none text-center">
          Alzheimer Model Metrics
        </div>
      </>
    </ChartContainer>
  );
}
