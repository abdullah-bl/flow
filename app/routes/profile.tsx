import Header from "~/components/header";
import Layout from "~/components/layout";
import { useUser } from "~/utils";

export default function Profile() {
  const user = useUser();
  return (
    <Layout>
      <Header back>
        <h1 className="text-2xl font-bold">{user.name}</h1>
      </Header>
      <h1 className="text-2xl font-bold">Profile</h1>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <span className="font-bold">Name</span>
          <span>{user.name}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-bold">Username</span>
          <span>{user.username}</span>
        </div>
      </div>
    </Layout>
  );
}
