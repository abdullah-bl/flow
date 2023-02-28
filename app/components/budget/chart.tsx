import React from "react";
import {
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  LineChart,
  Line,
} from "recharts";
import { ClientOnly } from "remix-utils";
import { formatMoney } from "~/lib/commons";

export const BudgetChart = ({
  data,
}: {
  data: { id: string; cash: number; cost: number; name: string }[];
}) => {
  const [type, setType] = React.useState<"line" | "area">("line");

  return data.length > 0 ? (
    <div className=" my-2 aspect-4 rounded-lg">
      <ClientOnly fallback={<div className=" aspect-4 animate-pulse " />}>
        {() => (
          <ResponsiveContainer
            width={"100%"}
            height="100%"
            className={"flex items-center justify-center"}
          >
            <LineChart width={300} height={100} data={data}>
              <Line
                type="monotone"
                dataKey="cost"
                stroke="#8884d8"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="cash"
                stroke="#82ca9d"
                strokeWidth={2}
              />
              <Tooltip
                wrapperStyle={{
                  outline: "none",
                }}
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  border: "1px solid #ccc",
                  borderRadius: 5,
                  outline: "none",
                  outlineColor: "none",
                }}
                labelFormatter={(label) => {
                  return data.find((d, i) => i === label)?.name || "";
                }}
                label="name"
                formatter={(value) => {
                  return formatMoney(Number(value));
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </ClientOnly>
    </div>
  ) : null;
};

// {/* <LineChart width={100} height={100} data={data}>
//   <XAxis dataKey="name" />
//   {/* <YAxis /> */}
// <Tooltip />
// <Legend />
// {/* <Line
//     type="monotone"
//     dataKey="cost"
//     stroke="#8884d8"
//     strokeWidth={2}
//   />
//   <Line
//     type="monotone"
//     dataKey="cash"
//     stroke="#82ca9d"
//     strokeWidth={2}
//   /> */}
// <Area
//   type="monotone"
//   dataKey="cash"
//   stroke="#8884d8"
//   fill="#8884d8"
// />
// {/* <Line type="monotone" dataKey="name" stroke="#82ca9d" /> */}
// {/* </LineChart> */}

const LineL = ({ data }: { data: any }) => {
  return (
    <LineChart width={300} height={100} data={data}>
      <Line type="monotone" dataKey="cost" stroke="#8884d8" strokeWidth={2} />
      <Line type="monotone" dataKey="cash" stroke="#82ca9d" strokeWidth={2} />
    </LineChart>
  );
};

const AreaL = ({ data }: { data: any }) => (
  <AreaChart
    width={200}
    height={100}
    data={data}
    margin={{ top: 0, right: 10, left: 10, bottom: 0 }}
  >
    {/* <XAxis dataKey="name" />
              <YAxis /> */}

    <Tooltip
      wrapperStyle={{
        outline: "none",
      }}
      contentStyle={{
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        border: "1px solid #ccc",
        borderRadius: 5,
        outline: "none",
        outlineColor: "none",
      }}
      labelFormatter={(label) => {
        return data.find((d, i) => i === label)?.name || "";
      }}
      label="name"
      formatter={(value) => {
        return formatMoney(Number(value));
      }}
    />
    <Area
      type="monotone"
      dataKey="cash"
      stroke="#232323e6"
      fill="#82ca9d"
      strokeWidth={2}
    />
    <Area
      type="monotone"
      dataKey="cost"
      stroke="#232323d8"
      fill="#8884d8"
      strokeWidth={2}
    />
  </AreaChart>
);
