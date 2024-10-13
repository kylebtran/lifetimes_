"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Dream = {
  duration: number;
  date: string;
  concern: number;
};

export default function Component() {
  const { user, error, isLoading } = useUser();
  const [chartData, setChartData] = useState<Dream[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (user?.email) {
        try {
          const response = await fetch(
            `../../api/db/weekDreamDuration/${user.email}`
          );
          console.log({ user: user.email });
          const data: Dream[] = await response.json();

          const formattedData = data.map((item: Dream) => ({
            date: item.date,
            duration: Math.round((item.duration / 60.0) * 10) / 10.0,
            concern: item.concern ?? 0,
          }));

          setChartData(formattedData);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data: ", error);
          setLoading(false);
        }
      }
    }

    fetchData();
  }, [user?.email]);

  if (error) {
    return <div>Error loading data</div>;
  }

  const chartConfig = {
    duration: {
      label: "Hours Slept",
      color: "#2563eb",
    },
    concern: {
      label: "Concern",
      color: "#ff6347",
    },
  } satisfies ChartConfig;

  return (
    <Card className="bg-transparent border-none shadow-none">
      <CardHeader className="text-white">
        <CardTitle>Sleep Duration & Concern</CardTitle>
        <CardDescription className="text-muted">Past 7 days</CardDescription>
      </CardHeader>
      <ChartContainer config={chartConfig} className="p-5 h-[208px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} stroke={"#2F2B2B"} />
          <XAxis
            dataKey="date"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tick={{
              fill: "#8B8484",
              fontSize: 12, // Adjust font size
              fontWeight: "bold", // Make the text bold
              fontFamily: "Arial", // Set a custom font family
            }}
          />

          <ChartTooltip
            content={<ChartTooltipContent className="custom-tooltip" />}
          />
          <Bar dataKey="duration" fill="#FFFFFF" radius={8} />
          <Bar dataKey="concern" fill="#A79C9C" radius={8} />
        </BarChart>
      </ChartContainer>
    </Card>
  );
}
