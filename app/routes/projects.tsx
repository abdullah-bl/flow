import { Outlet } from "@remix-run/react";
import Layout from "~/components/layout";

export default function ProjectsLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

// export function ErrorBoundary({ error }: { error: Error }) {
//   return (
//     <div className="flex h-screen w-screen flex-col items-center">
//       <h1 className="font-mono font-bold">Error</h1>
//       <p>{error.message}</p>
//       <p>The stack trace is:</p>
//       <pre className="font-mono">
//         <code>{error.stack}</code>
//       </pre>
//     </div>
//   );
// }
