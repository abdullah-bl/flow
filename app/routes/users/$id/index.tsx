import Header from "~/components/header";

export default function UserID() {
  return (
    <>
      <Header>
        <div className="flex flex-col ">
          <h1 className="text-2xl font-semibold">User</h1>
          <span className="text-sm text-gray-500">Last updated 2 days ago</span>
        </div>
      </Header>
    </>
  );
}
