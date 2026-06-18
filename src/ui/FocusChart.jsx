import { Area, AreaChart, XAxis, Dot } from "recharts"

import { Card, CardContent } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A daily activity area chart with peak markers"

// Simulated data to create the wavy daily trend from the image
const chartData = [
  { time: "6 AM", activity: 20 },
  { time: "", activity: 22 },
  { time: "", activity: 25 },
  { time: "", activity: 32 },
  { time: "", activity: 45 },
  { time: "", activity: 65, peak: "morning" }, // Morning Peak Marker
  { time: "", activity: 75 }, // Top of first curve
  { time: "", activity: 55 },
  { time: "", activity: 30 },
  { time: "", activity: 22 },
  { time: "12 PM", activity: 26 },
  { time: "", activity: 40 },
  { time: "", activity: 45 },
  { time: "", activity: 32 },
  { time: "", activity: 30 },
  { time: "", activity: 45 },
  { time: "", activity: 65, peak: "secondary" }, // Secondary Peak Marker
  { time: "6 PM", activity: 88 }, // Top of main curve
  { time: "", activity: 65 },
  { time: "", activity: 25 },
  { time: "", activity: 15 },
  { time: "", activity: 30 },
  { time: "", activity: 45 },
  { time: "", activity: 46 },
  { time: "", activity: 35 },
  { time: "12 AM", activity: 22 },
]

const chartConfig = {
  activity: {
    label: "Activity Level",
    color: "#2a4334", // Dark forest/slate green stroke
  },
}

// Custom dot component to only render markers on designated "peaks"
const CustomDot = (props) => {
  const { cx, cy, payload } = props
  
  if (payload.peak === "morning") {
    return (
      <circle 
        cx={cx} 
        cy={cy} 
        r={5} 
        fill="#bde05b" // Bright green core
        stroke="#e5f5b8" // Translucent light green halo
        strokeWidth={4} 
      />
    )
  }
  
  if (payload.peak === "secondary") {
    return (
      <circle 
        cx={cx} 
        cy={cy} 
        r={4} 
        fill="#a4c639" // Slightly darker core
        stroke="#d7e8a4" // Translucent light green halo
        strokeWidth={3} 
      />
    )
  }
  
  return null
}

export function FocusChart() {
  return (
    <div className="flex flex-col h-64 w-full mt-5 gap-4">
      <Card className="pt-6 border-blue-200 shadow-sm">
        <CardContent className="pb-4">
          <ChartContainer config={chartConfig} initialDimension={{width:320,height:180}} className="h-52 w-full">
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 0,
                right: 0,
                top: 12,
                bottom: 8,
              }}
            >
              <defs>
                <linearGradient id="fillActivity" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-activity)"
                    stopOpacity={0.25}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-activity)"
                    stopOpacity={0.01}
                  />
                </linearGradient>
              </defs>

              <XAxis
                dataKey="time"
                tickLine={false}
                axisLine={false}
                tickMargin={12}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                interval={0} // Forces the empty string ticks to render to space out the labels
              />
              
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" hideLabel />}
              />
              
              <Area
                dataKey="activity"
                type="natural"
                fill="url(#fillActivity)"
                fillOpacity={1}
                stroke="var(--color-activity)"
                strokeWidth={3}
                dot={<CustomDot />}
                activeDot={false}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

    </div>
  )
}