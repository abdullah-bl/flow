import type { LoaderArgs } from "@remix-run/server-runtime";
import { eventStream } from "remix-utils";
import { readFileSync } from "fs";

export const loader = async ({ request }: LoaderArgs) => {
  // read logs from logs folder
  // fs read stream
  // return event stream
  return eventStream(request.signal, function setup(send) {
    let timer = setInterval(() => {
      send({ event: "logs", data: new Date().toISOString() });
    }, 5000);

    return function clear() {
      clearInterval(timer);
    };
  });
};

