import { PlusIcon } from "@radix-ui/react-icons";
import { useLoaderData } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { Link } from "react-router-dom";
import Header from "~/components/header";
import Tabs from "~/components/tabs";
import { getProjects } from "~/models/project.server";

export const loader = async ({ request }: LoaderArgs) => {
  const projects = await getProjects({});
  return json(
    { projects },
    { status: 200, headers: { "cache-control": "max-age=60" } }
  );
};

export default function ProjectsPage() {
  const data = useLoaderData<typeof loader>();
  return (
    <>
      <Header>
        <div className="flex flex-1 items-center justify-between">
          <div className="flex flex-col ">
            <h1 className="text-2xl font-semibold">Projects</h1>
            <span className="text-sm text-gray-500">
              Overview of all projects
            </span>
          </div>
          <Link
            to="new"
            className="flex items-center gap-1 rounded-lg py-2 px-4 hover:bg-gray-100"
          >
            <span>Add Project</span>
            <PlusIcon />
          </Link>
        </div>
      </Header>
      <Tabs
        links={[
          { to: ".", text: "All" },
          { to: "timeline", text: "Timeline" },
          { to: "mine", text: "Mine" },
          { to: "archived", text: "Archived" },
        ]}
      />
      <div className="flex-1">
        <div className="grid  grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {data.projects.map((project) => (
            <div
              className="lg:1/4 w-full max-w-sm rounded-lg border p-4 md:w-1/2 "
              key={project.id}
            >
              <Link to={project.id}>{project.name}</Link>
            </div>
          ))}
        </div>
        <div className="relative w-full rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
          <span className="block sm:inline">No projects found</span>
        </div>
      </div>
    </>
  );
}
