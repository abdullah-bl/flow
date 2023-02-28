import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import * as React from "react";

import { getUserId, createUserSession } from "~/session.server";

import { createUser, getUserByUsername } from "~/models/user.server";
import { safeRedirect, validatePassword, validateUsername } from "~/utils";

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/");

  if (!validateUsername(username)) {
    return json(
      { errors: { username: "Username is invalid", password: null } },
      { status: 400 }
    );
  }

  if (!validatePassword(password)) {
    return json(
      {
        errors: {
          username: null,
          password: "Password is required / too short",
        },
      },
      { status: 400 }
    );
  }

  const existingUser = await getUserByUsername(username);
  if (existingUser) {
    return json(
      {
        errors: {
          username: "A user already exists with this Username",
          password: null,
        },
      },
      { status: 400 }
    );
  }

  const user = await createUser(username, password);

  return createUserSession({
    request,
    userId: user.id,
    remember: false,
    redirectTo,
  });
}

export const meta: MetaFunction = () => {
  return {
    title: "Sign Up",
  };
};

export default function Join() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? undefined;
  const actionData = useActionData<typeof action>();
  const usernameRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (actionData?.errors?.username) {
      usernameRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto w-full max-w-md px-8">
        <Form method="post" className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <div className="mt-1">
              <input
                ref={usernameRef}
                id="username"
                required
                autoFocus={true}
                name="username"
                type="text"
                autoComplete="username"
                aria-invalid={actionData?.errors?.username ? true : undefined}
                aria-describedby="username-error"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
              {actionData?.errors?.username && (
                <div className="pt-1 text-red-700" id="username-error">
                  {actionData.errors.username}
                </div>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                ref={passwordRef}
                name="password"
                type="password"
                autoComplete="new-password"
                aria-invalid={actionData?.errors?.password ? true : undefined}
                aria-describedby="password-error"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
              {actionData?.errors?.password && (
                <div className="pt-1 text-red-700" id="password-error">
                  {actionData.errors.password}
                </div>
              )}
            </div>
          </div>

          <input type="hidden" name="redirectTo" value={redirectTo} />
          <button
            type="submit"
            className="w-full rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
          >
            Create Account
          </button>
          <div className="flex items-center justify-center">
            <div className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                className="text-blue-500 underline"
                to={{
                  pathname: "/login",
                  search: searchParams.toString(),
                }}
              >
                Log in
              </Link>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
