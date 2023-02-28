import { CheckIcon, Cross1Icon } from "@radix-ui/react-icons";
import { Form, Link, useLoaderData } from "@remix-run/react";
import type {
  ActionArgs,
  LinksFunction,
  LoaderArgs,
} from "@remix-run/server-runtime";
import { redirect } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { useState } from "react";
import invariant from "tiny-invariant";
import { cache } from "~/cache.server";
import Header from "~/components/header";
import { SelectItem } from "~/components/items/select";
import { formatDate, formatMoney } from "~/lib/commons";
import { updateProject, getProjectByUnique } from "~/models/project.server";
import { requireUser, requireUserId } from "~/session.server";
import DatePicker from "react-datepicker";
import DatePickerStyle from "react-datepicker/dist/react-datepicker.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: DatePickerStyle }];
};

export const loader = async ({ params, request }: LoaderArgs) => {
  const user = await requireUser(request);
  invariant(params.id, " Project id is required");

  const project = await getProjectByUnique({
    where: { id: params.id },
    include: { item: true },
  });

  if (!project) {
    throw new Error("Project not found");
  }
  if (!user.admin && user.id !== project.userId) {
    // check if the user is the owner of the project or an admin
    throw new Error("Not authorized");
  }
  return json(
    { project },
    { status: 200, headers: { "cache-control": "max-age=60" } }
  );
};

export default function ProjectEditPage() {
  const data = useLoaderData<typeof loader>();
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [cost, setCost] = useState<number>(0);

  return (
    <Form method="post" className="flex flex-col">
      <Header back>
        <div className="flex flex-1 items-center justify-between">
          <div className="flex flex-col gap-0">
            <h1 className="text-xl font-semibold">Update Project</h1>
            <span className="text-sm text-gray-500">
              latest update: {formatDate(new Date(data.project?.updatedAt))}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="../"
              className="flex items-center gap-2 rounded-lg py-2 px-4  text-red-700 transition-all hover:bg-gray-100 hover:text-blue-700"
            >
              <span>Cancel</span>
              <Cross1Icon width={20} height={20} />
            </Link>
            <button
              title="Create Project"
              type="submit"
              className="flex items-center gap-2 rounded-lg py-2  px-4 text-gray-700 transition-all hover:bg-gray-100 hover:text-blue-700"
            >
              <span>Save</span>
              <CheckIcon width={20} height={20} />
            </button>
          </div>
        </div>
      </Header>
      <div className=" container  mx-auto min-h-full border-t">
        <div className="my-5 flex flex-col gap-3">
          <label className="flex flex-col gap-1">
            <span className="text-sm text-gray-500">Project Name *</span>
            <input
              type="text"
              name="name"
              required
              defaultValue={data.project?.name}
              placeholder="Write a name for your project"
              className=" rounded-lg border py-2 px-4 sm:w-full lg:w-1/2"
            />
          </label>
          <div className="flex items-center gap-2">
            <label className="flex flex-col gap-1">
              <span className="text-sm text-gray-500">Project Budget *</span>
              <input
                type="number"
                name="cost"
                defaultValue={cost}
                onChange={(e) => setCost(Number(e.target.value))}
                required
                placeholder="Write a name for your project"
                className="w-fit rounded-lg border py-2 px-4"
              />
            </label>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-gray-500">Formatted </span>
              <span className="text-base font-semibold text-gray-700">
                {formatMoney(cost)}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <label className="flex flex-col gap-1">
              <span className="text-sm text-gray-500">Start Date *</span>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                name="started"
                id="started"
                closeOnScroll
                className="w-fit rounded-lg border py-2 px-4"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm text-gray-500">Ending Date *</span>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                minDate={startDate}
                name="ended"
                id="ended"
                className="w-fit rounded-lg border py-2 px-4"
              />
            </label>
          </div>
          <SelectItem
            defaultItemId={data.project?.itemId}
            defaultBudgetId={data.project?.budgetId}
          />
          <label className="flex flex-col gap-1">
            <span className="text-sm text-gray-500">
              Description (Optional)
            </span>
            <textarea
              defaultValue={data.project?.description}
              placeholder="Write a description for your project"
              name="description"
              className=" rounded-lg border py-2 px-4 sm:w-full lg:w-1/2"
            />
          </label>
        </div>
      </div>
    </Form>
  );
}

export const action = async ({ request, params }: ActionArgs) => {
  const userId = await requireUserId(request);
  if (!userId) return redirect(`/login?redirect=/projects/${params.id}/edit`);
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const cost = formData.get("cost") as string;
  const itemId = formData.get("itemId") as string;
  const started = formData.get("started") as string;
  const ended = formData.get("ended") as string;

  const oldProject = await getProjectByUnique({ where: { id: params.id } });

  try {
    const project = await updateProject({
      where: { id: params.id },
      data: {
        name: name || oldProject?.name,
        description: description || oldProject?.description,
        cost: parseInt(cost) || oldProject?.cost,
        started: new Date(started) || oldProject?.started,
        ended: new Date(ended) || oldProject?.ended,
        itemId: itemId || oldProject?.itemId,
        userId: userId || oldProject?.userId,
      },
    });
    return redirect(`/projects/${project.id}`, {
      headers: { "cache-control": "no-store" },
    });
  } catch (error) {
    console.error(error);
    return json(
      { error: "Something went wrong", details: error },
      { status: 500, headers: { "cache-control": "no-store" } }
    );
  }
};
