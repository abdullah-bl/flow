import { Form } from "@remix-run/react";

export const NewTask = () => {
  return (
    <Form
      method="post"
      action="/tasks/create"
      className="flex flex-col gap-1 rounded-md border bg-white p-2 shadow-sm"
    >
      <input
        type="text"
        title="title"
        name="title"
        required
        placeholder="write title"
        className="rounded border-b px-2 outline-none focus:border-blue-700"
      />
      <textarea
        title="body"
        name="body"
        placeholder="write body"
        className="rounded border p-2 text-sm outline-none focus:border-blue-700"
      />
      <div className="flex flex-row items-center justify-between gap-2">
        <div className="flex items-center -space-x-2 overflow-hidden">
          {/* {avatars.slice(0, 3).map((avatar) => (
            <img
              key={avatar}
              className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
              src={avatar}
              alt="{user.handle}"
            />
          ))} */}
        </div>
        <span className="text-xs font-medium">12/12/2021</span>
      </div>
      <div className="flex flex-row items-center justify-between gap-2">
        <button type="submit">Submit</button>
      </div>
    </Form>
  );
};
