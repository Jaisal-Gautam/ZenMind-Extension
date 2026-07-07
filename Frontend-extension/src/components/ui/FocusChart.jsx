import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartConfig = {
  minutes: {
    label: "Focus Time",
    color: "#3D6B59",
  },
};

const FocusChart = ({ dashboardData }) => {
  const chartData = dashboardData.hourly;
  const peak = chartData.reduce(
    (best, current) => (current.minutes > best.minutes ? current : best),
    chartData[0],
  );

  return (
    <div className="rounded-xl w-full border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-mono text-green-primary">
          Focus Throughout the Day
        </h2>
      </div>

      <div className="mb-8 flex items-center justify-between rounded-lg bg-neutral-50 p-4">
        <div>
          <p className="text-sm text-neutral-500">Peak Focus Hour</p>

          <p className="text-xl font-semibold text-green-primary">
            {Number(peak.hour) % 12 || 12}
            {Number(peak.hour) < 12 ? " AM" : " PM"}
            {" - "}
            {(Number(peak.hour) + 1) % 12 || 12}
            {Number(peak.hour) + 1 < 12 || Number(peak.hour) + 1 === 24
              ? " AM"
              : " PM"}
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm text-neutral-500">Focused</p>

          <p className="text-xl font-semibold text-green-primary">
            {peak.minutes} min
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
          mar
          <XAxis
            dataKey="hour"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            tickFormatter={(value) => {
              const hour = Number(value);

              if (hour % 2 !== 0) return "";

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
                labelFormatter={(label) => {
                  const hour = Number(label);

                  const startHour = hour % 12 || 12;
                  const endHour = (hour + 1) % 12 || 12;

                  const startPeriod = hour < 12 ? "AM" : "PM";
                  const endPeriod =
                    hour + 1 < 12 || hour + 1 === 24 ? "AM" : "PM";

                  return `${startHour} ${startPeriod} – ${endHour} ${endPeriod}`;
                }}
                formatter={(value) => [`${value} minutes`, "Focused"]}
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
                  fill="white"
                  stroke="var(--color-minutes)"
                  strokeWidth={2}
                />
              );
            }}
            activeDot={{
              r: 7,
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
