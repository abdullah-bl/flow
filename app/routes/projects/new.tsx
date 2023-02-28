import { RocketIcon } from "@radix-ui/react-icons";
import { Form } from "@remix-run/react";
import type { ActionArgs, LinksFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { redirect } from "@remix-run/server-runtime";
import Header from "~/components/header";
import { SelectItem } from "~/components/items/select";
import { createProject } from "~/models/project.server";
import { requireUserId } from "~/session.server";
import DatePicker from "react-datepicker";
import { useState } from "react";
import { formatMoney } from "~/lib/commons";
import DatePickerStyle from "react-datepicker/dist/react-datepicker.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: DatePickerStyle }];
};

export default function NewProject() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [cost, setCost] = useState<number>(0);
  return (
    <Form method="post" className="flex flex-col">
      <Header back>
        <div className="flex flex-1 items-center justify-between">
          <div className="flex flex-col gap-0">
            <h1 className="text-xl font-semibold">New Project</h1>
            <span className="text-sm text-gray-500">Create a new project</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              title="Create Project"
              type="submit"
              className="flex items-center gap-2 rounded-lg py-2  px-4 text-gray-700 transition-all hover:bg-gray-100 hover:text-blue-700"
            >
              <span>Publish</span>
              <RocketIcon width={20} height={20} />
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
          <SelectItem />
          <label className="flex flex-col gap-1">
            <span className="text-sm text-gray-500">
              Description (Optional)
            </span>
            <textarea
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
  if (!userId) return redirect("/login?redirect=/projects/new");
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const cost = formData.get("cost") as string;
  const itemId = formData.get("itemId") as string;
  const started = formData.get("started") as string;
  const ended = formData.get("ended") as string;

  try {
    const project = await createProject({
      data: {
        name: name as string,
        description: description as string,
        cost: parseInt(cost as string),
        started: new Date(started as string),
        ended: new Date(ended as string),
        item: { connect: { id: itemId as string } },
        user: { connect: { id: userId as string } },
        phase: {
          create: {
            name: "New",
            description: "New project created",
            user: { connect: { id: userId as string } },
          },
        },
      },
    });
    return redirect(`/projects/${project.id}`);
  } catch (error) {
    console.error(error);
    return json(
      { error: "Something went wrong", details: error },
      { status: 500 }
    );
  }
};
