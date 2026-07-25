import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { analyticsTime } from "@/utils/formatTime";

const chartConfig = {
  minutes: {
    label: "Focus Time",
    color: "var(--color-brand)",
  },
};

const FocusChart = ({ focus, overview }) => {
  const chartData = focus?.hourly ?? [];
  const peak = focus?.peakFocusHour ?? {
    hour: 0,
    label: "12 AM - 1 AM",
  };

  return (
    <div className="rounded-xl w-full border border-border-default bg-surface dark:bg-app p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-mono text-text-text ">
          Focus Throughout the Day
        </h2>
      </div>

      <div className="mb-8 flex items-center justify-between rounded-lg bg-surface-muted dark:bg-surface border border-border-light p-4">
        <div>
          <p className="text-sm text-text-disabled">Peak Focus Hour</p>

          <p className="text-xl font-semibold text-brand dark:text-brand">
            {peak.label}
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm text-text-disabled">Focused</p>

          <p className="text-xl font-semibold text-brand dark:text-brand">
            {overview?.focusedTime ? analyticsTime(overview.focusedTime) : "0m"}
          </p>
        </div>
      </div>

      <ChartContainer config={chartConfig} className="h-85 w-full">
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 20,
            right: 20,
            top: 10,
            bottom: 10,
          }}
        >
          <defs>
            <linearGradient id="focusGradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-minutes)"
                stopOpacity={0.35}
              />

              <stop
                offset="95%"
                stopColor="var(--color-minutes)"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <CartesianGrid
            vertical={false}
            strokeDasharray="4 4"
            opacity={0.25}
          />
          <XAxis
            dataKey="hour"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            interval={0}
            tickFormatter={(hour) => {
              if (hour === 0) return "12AM";
              if (hour < 12) return `${hour}AM`;
              if (hour === 12) return "12PM";
              return `${hour - 12}PM`;
            }}
          />
          <YAxis hide domain={[0, "dataMax + 5"]} />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                labelFormatter={(_, payload) => {
                  if (!payload?.length) return "";

                  const hour = payload[0].payload.hour;

                  const formatHour = (h) => {
                    const display = h % 12 || 12;
                    const period = h < 12 ? "AM" : "PM";
                    return `${display} ${period}`;
                  };

                  return `${formatHour(hour)} – ${formatHour((hour + 1) % 24)}`;
                }}
                formatter={(value) => [
                  Number(value) !== 0 ? analyticsTime(Number(value)) : "0m",
                  "Focused",
                ]}
              />
            }
          />
          <Area
            type="monotone"
            dataKey="minutes"
            stroke="var(--color-minutes)"
            strokeWidth={3}
            fill="url(#focusGradient)"
            dot={(props) => {
              if (props.payload.minutes === 0) return null;

              return (
                <circle
                  cx={props.cx}
                  cy={props.cy}
                  r={4}
                  fill="var(--color-surface)"
                  stroke="var(--color-minutes)"
                  strokeWidth={2}
                />
              );
            }}
            activeDot={{
              r: 7,
              fill: "var(--color-brand)",
              stroke: "var(--color-surface)",
              strokeWidth: 2,
            }}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
};

export default FocusChart;
