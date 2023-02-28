import { json, LoaderArgs } from "@remix-run/server-runtime";
import { useEventSource } from "remix-utils";
import Header from "~/components/header";

export default function Logs() {
  let logs = useEventSource("/api/logs", { event: "logs" }) as string;
  console.log(logs);
  return (
    <>
      <Header>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-gray-900">Logs</h1>
          <p className="text-gray-500">View all logs</p>
        </div>
        <pre>{logs}</pre>
      </Header>
    </>
  );
}
