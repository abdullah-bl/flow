import { AllSidesIcon, PlusIcon } from "@radix-ui/react-icons";
import { Link, useCatch, useLoaderData } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { redirect } from "@remix-run/server-runtime";
import { useMemo } from "react";
import invariant from "tiny-invariant";
import { BudgetChart } from "~/components/budget/chart";
import { BudgetTable } from "~/components/budget/table";
import Header from "~/components/header";
import YearsTabs from "~/components/years";
import { getBudgetWithItems } from "~/models/budget.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  invariant(params.year, "year is required");
  const year = Number(params.year) || new Date().getFullYear();
  // year is a string, so we need to convert it to a number
  // if it's not a number, we'll use the current year
  // make sure to use the current year if the year is in the future (e.g. /budget/2022)
  // we don't want to show a budget for the future
  // we'll redirect to the current year also make sure year is positive
  if (year > new Date().getFullYear() || year < 2020) {
    return redirect(`/budget/${new Date().getFullYear()}`);
  }
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const budget = await getBudgetWithItems({ year: Number(year) });
  if (!budget) {
    throw new Response("Not Found", { status: 404 });
  }
  return json(
    { budget, year, q },
    { headers: { "Cache-Control": "max-age=600" } }
  );
};

export default function BudgetPage() {
  const { budget, year } = useLoaderData<typeof loader>();
  const chartData = useMemo(() => {
    return budget?.map((b) => ({
      id: b.id,
      name: b.item.name,
      cash: b.cash,
      cost: b.cost,
    }));
  }, [budget]);

  return (
    <div className="flex-1">
      <Header>
        <div className="flex flex-1 items-center justify-between">
          <div className="flex flex-col ">
            <h1 className="text-2xl font-semibold">Budget ({year})</h1>
            <span className="text-sm text-gray-500">
              Overview of all items for the year {year}
            </span>
          </div>
          <YearsTabs />
        </div>
      </Header>

      <BudgetChart data={chartData} />

      <Header>
        <div className="flex flex-1 items-center justify-between">
          <div className="flex flex-col ">
            <h1 className="text-2xl font-semibold">Budget Items</h1>
            <span className="text-sm text-gray-500">Overview of all items</span>
          </div>
          <Link
            to={`/budget/${year}/new`}
            className="flex items-center gap-1 rounded-lg py-2 px-4 hover:bg-gray-100"
          >
            <span>Add Item</span>
            <PlusIcon />
          </Link>
        </div>
      </Header>

      <BudgetTable budget={budget as any} />
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <div className="flex h-full flex-1 items-center justify-center gap-2 bg-red-800">
      <div className="flex flex-col gap-2">
        <h1 className="font-mono font-bold">Caught</h1>
        <p className="font-mono">Status: {caught.status}</p>
        <pre>
          <code>{JSON.stringify(caught.data, null, 2)}</code>
        </pre>
      </div>
    </div>
  );
}
