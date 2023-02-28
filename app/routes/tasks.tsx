import { Outlet } from "@remix-run/react";
import Layout from "~/components/layout";
import { useUser } from "~/utils";

export default function TasksLayout() {
  useUser(); // redirect to login if not logged in
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
