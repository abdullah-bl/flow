import { Link, Outlet, useCatch } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/server-runtime";
import Header from "~/components/header";
import Layout from "~/components/layout";
import Tabs from "~/components/tabs";
import { requireAdmin } from "~/session.server";

export const loader = async ({ request }: LoaderArgs) =>
  await requireAdmin(request);

export default function DashboardLayout() {
  return (
    <Layout>
      <Header>
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </Header>
      <Tabs
        links={[
          { to: "/dashboard", text: "Overview" },
          { to: "/dashboard/users", text: "Users" },
          { to: "/dashboard/logs", text: "Logs" },
        ]}
      />
      <div className="flex-1">
        <Outlet />
      </div>
    </Layout>
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
