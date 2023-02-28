import { Outlet } from "@remix-run/react";
import Layout from "~/components/layout";

export default function UserLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
