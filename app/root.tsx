import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import { getUser } from "./session.server";
import { logger } from "./logger";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Notes",
  viewport: "width=device-width,initial-scale=1",
  description: "A simple note taking app built with Remix",
});

export async function loader({ request, params, context }: LoaderArgs) {
  const user = await getUser(request);
  logger.info({
    userId: user?.id,
    method: request.method,
    url: request.url,
    params,
    context,
  });
  return json({ user });
}

export default function App() {
  return (
    <html lang="en" className="h-full" dir="">
      <head>
        <Meta />
        <meta name="theme-color" content="#232323" />
        <Links />
      </head>
      <body className="h-screen w-screen overflow-hidden">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <html>
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body className="grid  h-screen w-screen place-items-center gap-4">
        <div className="text-center">
          <span role="img" aria-label="sad face" className="text-7xl">
            🤯
          </span>
          <h1 className="font-mono font-bold">
            {caught.status} {caught.statusText}
          </h1>
          <p className="text-center text-sm">
            {caught.status === 404
              ? "The page you are looking for does not exist."
              : "Something went wrong."}
          </p>
          <p className="text-center text-sm">
            <a href="/">Go back home</a>
          </p>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
