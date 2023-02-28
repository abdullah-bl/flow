import type { ReactNode } from "react";
import Aside from "./aside";
import Navbar from "./navbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-screen bg-gray-100">
      <Aside />
      <main className="m-2 flex-1 overflow-scroll rounded-lg border bg-white">
        <div className="h-full rounded-lg p-4">{children}</div>
      </main>
    </div>
  );
}
