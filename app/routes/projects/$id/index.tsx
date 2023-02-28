import type { LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import invariant from "tiny-invariant";
import { getProjectByUnique } from "~/models/project.server";
import { cache } from "~/cache.server";
import Header from "~/components/header";
import { Link, useCatch, useLoaderData } from "@remix-run/react";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { useOptionalUser } from "~/utils";

// export { CatchBoundary } from "~/CatchBoundary";

export const loader = async ({ params, request }: LoaderArgs) => {
  invariant(params.id, " project id is required");
  const project = await getProjectByUnique({ where: { id: params.id } });
  if (!project) {
    throw new Error("Project not found");
  }
  return json(
    { project },
    { status: 200, headers: { "cache-control": "max-age=60" } }
  );
};

export default function ProjectPage() {
  const user = useOptionalUser();
  const data = useLoaderData<typeof loader>();
  return (
    <>
      <Header back>
        <div className="flex flex-1 items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">{data.project?.name}</h1>
            <span className="text-sm text-gray-500">
              {data.project.description}
            </span>
          </div>
          <div className="flex items-center">
            {user?.admin || user?.id === data.project?.userId ? (
              <Link
                to={`./edit`}
                className="flex items-center gap-2 rounded-lg px-4 py-2 hover:bg-gray-100"
              >
                <span> Edit </span>
                <Pencil1Icon />
              </Link>
            ) : null}
          </div>
        </div>
      </Header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <span className="text-3xl">
        <span className="text-xl">✋🏻</span>🤯
      </span>
      <span className="font-mono "> {caught.status}</span>
      <pre className="font-mono">
        <code>{JSON.stringify(caught.data, null, 2)}</code>
      </pre>
      <Link to={"/"} className="text-blue-500">
        Go Home
      </Link>
    </div>
  );
}
