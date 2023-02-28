import { PersonIcon, RocketIcon } from "@radix-ui/react-icons";
import { Form, useCatch, useLoaderData } from "@remix-run/react";
import { ActionArgs, LoaderArgs, redirect } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import Header from "~/components/header";
import { getUsers } from "~/models/user.server";
import { requireUserId } from "~/session.server";
import Select from "react-select";
import { createTask } from "~/models/task.server";
import { ClientOnly } from "remix-utils";

export const loader = async ({ request }: LoaderArgs) => {
  await requireUserId(request);
  const users = await getUsers({ where: { admin: { not: true } } });
  return json(
    { users },
    {
      headers: {
        "cache-control": "max-age=0",
      },
    }
  );
};

export default function CreateTask() {
  const data = useLoaderData<typeof loader>();
  return (
    <Form method="post" className="flex flex-1 flex-col">
      <Header back>
        <div className="flex flex-1 items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">New Task</h1>
            <p className="text-sm text-gray-500">Create a new task</p>
          </div>
          <button
            type="submit"
            className="flex items-center gap-1 rounded-lg px-4 py-2 hover:bg-gray-100 hover:text-blue-700"
          >
            <span className="font-medium">Publish</span>
            <RocketIcon />
          </button>
        </div>
      </Header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex max-w-screen-md  flex-col gap-2">
          <label htmlFor="title" className="text-sm font-bold">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label htmlFor="description" className="text-sm font-bold">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label htmlFor="priority" className="text-sm font-bold">
            Priority (optional)
          </label>
          <input
            type="number"
            name="priority"
            id="priority"
            className="w-fit rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label htmlFor="dueDate" className="text-sm font-bold">
            Due Date
          </label>
          <input
            type="datetime-local"
            name="dueDate"
            id="dueDate"
            className="w-fit rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label htmlFor="assignee" className="text-sm font-bold">
            Assignee (optional)
          </label>
          <ClientOnly fallback={<div>Loading...</div>}>
            {() => (
              <Select
                name="assignee"
                className=" min-w-fit"
                isMulti
                closeMenuOnSelect={false}
                options={data.users.map((user) => ({
                  value: user.id,
                  label: user.name,
                }))}
              />
            )}
          </ClientOnly>
        </div>
      </div>
    </Form>
  );
}

export const action = async ({ request }: ActionArgs) => {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const body = formData.get("description") as string;
  const priority = formData.get("priority") as string;
  const dueDate = formData.get("dueDate") as string;
  const assignee = formData.getAll("assignee") as string[];
  console.log({ title, body, priority, dueDate, assignee });

  try {
    const task = await createTask({
      data: {
        title,
        body,
        priority: priority ? parseInt(priority) : 0,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        assigned: {
          connect: assignee.map((id) => ({ id })),
        },
        createdBy: {
          connect: { id: userId },
        },
      },
    });

    return redirect(`/tasks/${task.id}`);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create task");
  }
};

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
