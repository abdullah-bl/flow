import { useCatch, useLoaderData } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import invariant from "tiny-invariant";
import Header from "~/components/header";
import { formatDate } from "~/lib/commons";
import { getBudget } from "~/models/budget.server";

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.year, "year is required");
  invariant(params.id, "id is required");
  const { year, id } = params;
  const budget = await getBudget({
    where: { id, year: { equals: Number(year) } },
    include: { item: true, projects: true },
  });
  if (!budget) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ budget }, { headers: { "Cache-Control": "max-age=60" } });
};

export default function BudgetDetails() {
  const data = useLoaderData<typeof loader>();
  return (
    <>
      <Header back>
        <div className="flex flex-1 items-center justify-between">
          <div className="flex flex-col ">
            <h1 className="text-2xl font-semibold">{data.budget.item.name}</h1>
            <span className="text-sm text-gray-500">
              Last updated {formatDate(new Date(data.budget.updatedAt))}
            </span>
          </div>
        </div>
      </Header>
    </>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <div className="flex items-center justify-center gap-2">
      <h1 className="font-bold">Caught</h1>
      <p>Status: {caught.status}</p>
      <pre>
        <code>{JSON.stringify(caught.data, null, 2)}</code>
      </pre>
    </div>
  );
}
