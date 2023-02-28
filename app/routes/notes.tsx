import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";

import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";
import { getNoteListItems } from "~/models/note.server";
import Layout from "~/components/layout";
import Header from "~/components/header";

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const noteListItems = await getNoteListItems({ userId });
  return json(
    { noteListItems },
    { headers: { "Cache-Control": "max-age=60" } }
  );
}

export default function NotesPage() {
  const data = useLoaderData<typeof loader>();
  const user = useUser();

  return (
    <Layout>
      <Header>
        <div className="flex flex-1 items-center justify-between">
          <div className="flex flex-col ">
            <h1 className="text-2xl font-semibold">Notes</h1>
            <span className="text-sm text-gray-500">
              @{user?.username} ({user?.name})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="new"
              className="block rounded-lg  py-2  px-4 text-blue-700 hover:bg-gray-100"
            >
              + New Note
            </Link>
          </div>
        </div>
      </Header>
      <main className="flex flex-1 bg-white">
        <div className="h-full w-80 overflow-scroll">
          {data.noteListItems.length === 0 ? (
            <p className="p-4">No notes yet</p>
          ) : (
            <ol>
              {data.noteListItems.map((note) => (
                <li key={note.id}>
                  <NavLink
                    className={({ isActive }) =>
                      `block border  py-2 px-4 ${
                        isActive ? "bg-gray-100" : "bg-white"
                      }`
                    }
                    to={note.id}
                  >
                    📝 {note.title}
                  </NavLink>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </Layout>
  );
}
