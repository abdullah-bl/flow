import { Link, useCatch } from "@remix-run/react";

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
