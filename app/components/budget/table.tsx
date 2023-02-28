import type { Budget, Item } from "@prisma/client";
import { useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { formatMoney } from "~/lib/commons";

export type BudgetTableProps = {
  budget: Budget[];
};

export const BudgetTable = ({ budget }: BudgetTableProps) => {
  const [data, setData] = useState(budget || []);
  const navigate = useNavigate();
  const header = [
    {
      accessor: "#",
      label: "#",
    },
    {
      accessor: "item.name",
      label: "Name",
    },
    // {
    //   accessor: "item.number",
    //   label: "Number",
    // },
    // {
    //   accessor: "item.reference",
    //   label: "Reference",
    // },
    {
      accessor: "cash",
      label: "Cash",
    },
    {
      accessor: "cost",
      label: "Cost",
    },
    {
      accessor: "cost+cash",
      label: "Total",
    },
  ];

  useEffect(() => {
    setData(budget || []);
  }, [budget, setData]);

  return data.length > 0 ? (
    <div className="my-2 w-full p-2">
      <table className="w-full table-auto">
        <thead>
          <tr className="">
            {header.map((h) => (
              <th className=" select-none  py-2" key={h.accessor}>
                {h.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="">
          {data.map((d: any, i: number) => (
            <tr
              key={d.id}
              className="cursor-pointer border-b py-2 text-center hover:bg-gray-100"
              onClick={() => {
                navigate(`/budget/${d.year}/${d.id}`);
              }}
            >
              <td className="">{i + 1}</td>
              <td className="flex flex-col">
                <span className=" font-semibold text-gray-800 ">
                  {d.item.name}
                </span>
                <span className="text-sm text-gray-500">
                  {d.item.number}/{d.item.reference}
                </span>
              </td>
              <td className="font-semibold text-blue-700">
                {formatMoney(d.cash)}
              </td>
              <td className="font-semibold text-gray-700">
                {formatMoney(d.cost)}
              </td>
              <td className="font-semibold text-green-700">
                {formatMoney(d.cost + d.cash)}
              </td>
            </tr>
          ))}

          {data.length === 0 && (
            <tr>
              <td colSpan={4} className=" text-center">
                No data
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr className=" bg-stone-100 py-4 text-lg font-semibold ">
            <td colSpan={2} className="border-t text-center font-bold">
              Grand Total
            </td>
            <td className="text-center text-lg text-blue-700">
              {formatMoney(
                data.reduce((acc: number, curr: any) => {
                  return acc + curr.cash;
                }, 0)
              )}
            </td>
            <td className="text-center text-lg text-gray-800">
              {formatMoney(
                data.reduce((acc: number, curr: any) => {
                  return acc + curr.cost;
                }, 0)
              )}
            </td>
            <td className="text-center text-lg text-green-800">
              {formatMoney(
                data.reduce((acc: number, curr: any) => {
                  return acc + curr.cost;
                }, 0) +
                  data.reduce((acc: number, curr: any) => {
                    return acc + curr.cash;
                  }, 0)
              )}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  ) : (
    <div className=" flex aspect-8 flex-1 items-center justify-center gap-2">
      <span className="font-bold text-gray-900">No data yet!</span>
    </div>
  );
};
