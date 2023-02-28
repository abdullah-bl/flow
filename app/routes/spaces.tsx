import { Outlet } from "@remix-run/react";
import Layout from "~/components/layout";

export default function SpacesLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
