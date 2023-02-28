import { Outlet } from "@remix-run/react";
import Layout from "~/components/layout";

export default function BudgetLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
