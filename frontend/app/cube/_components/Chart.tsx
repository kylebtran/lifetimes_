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

type Dream = {
  duration: number;
  date: string;
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
  }, [user?.email]); // Ensure the effect runs when the user's email is available

  if (loading || isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  const chartConfig = {
    duration: {
      label: "Duration",
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="p-5 h-[400px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="duration" fill="#baa0a0" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
