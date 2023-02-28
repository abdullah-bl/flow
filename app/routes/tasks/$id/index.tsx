import { useCatch, useLoaderData } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import invariant from "tiny-invariant";
import Header from "~/components/header";
import { getTask, getTaskById } from "~/models/task.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  const { id } = params as { id: string };
  invariant(id, "Task id is required");

  const task = await getTaskById({ where: { id } });

  if (!task) throw new Error("Task not found");

  return json(
    {
      task,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=0",
      },
    }
  );
};

export default function Task() {
  const data = useLoaderData<typeof loader>();
  return (
    <>
      <Header back>
        <div className="flex flex-1 items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-lg font-bold">{data.task.title}</h1>
            <p className="text-sm text-gray-500">Manage your tasks</p>
          </div>
        </div>
      </Header>
    </>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <div>
      <h1>Caught</h1>
      <p>Status: {caught.status}</p>
      <pre>
        <code>{JSON.stringify(caught.data, null, 2)}</code>
      </pre>
    </div>
  );
}
