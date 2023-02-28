import {
  ActivityLogIcon,
  BellIcon,
  CrumpledPaperIcon,
  DashboardIcon,
  DrawingPinIcon,
  GearIcon,
  ListBulletIcon,
  MagnifyingGlassIcon,
  MixIcon,
  PersonIcon,
  PieChartIcon,
  PlusIcon,
  ReaderIcon,
  StackIcon,
} from "@radix-ui/react-icons";
import { Form, Link } from "react-router-dom";
import { useOptionalUser } from "~/utils";
import { LinkItem, routes } from "./navbar";

export default function Aside() {
  const user = useOptionalUser();
  return (
    <aside className="flex h-screen w-56  flex-col justify-between py-4">
      <Link
        to="/"
        className="rounded p-1 px-4 text-center text-2xl font-bold text-white"
      >
        <h2 className="text-center text-3xl font-bold text-gray-900">Flow</h2>
      </Link>
      <div className="flex w-full flex-1 flex-col gap-5 overflow-scroll  pl-4">
        <Menu
          title="/Menu"
          list={[
            {
              label: "Overview",
              path: "/",
              icon: <ReaderIcon />,
            },
            {
              label: "Tasks",
              path: `/tasks?assigneeId=${user?.id}`,
              icon: <ListBulletIcon />,
            },
            {
              label: "Projects",
              path: "/projects",
              icon: <StackIcon />,
            },
            {
              label: "Budget",
              path: "/budget",
              icon: <PieChartIcon />,
            },
          ]}
        />
        <Menu
          title="/My Space"
          list={[
            {
              label: "/",
              path: "/spaces",
              icon: <ReaderIcon />,
            },
            {
              label: "Notes",
              path: `/notes`,
              icon: <CrumpledPaperIcon />,
            },
          ]}
        />

        {/* admin only */}
        {user?.admin ? (
          <Menu
            title="/Dashboard"
            list={[
              {
                label: "Settings",
                path: "/dashboard",
                icon: <GearIcon />,
              },
              {
                label: "Users",
                path: "/dashboard/users",
                icon: <PersonIcon />,
              },
              {
                label: "Logs",
                path: "/dashboard/logs",
                icon: <ActivityLogIcon />,
              },
            ]}
          />
        ) : null}
      </div>
      {user ? (
        <>
          <div className="flex w-full items-center gap-2 px-2">
            <span className=" h-8 w-8 rounded-full border-2 border-black bg-orange-300 text-sm font-bold" />
            <div className="flex flex-col">
              <span className="text-base font-bold text-gray-800">
                {user.name}
              </span>
              <span className="text-sm text-gray-600">@{user.username}</span>
            </div>
          </div>
          <Form method="post" action="/logout" className="px-2 pt-2">
            <button
              type="submit"
              className="w-full rounded-lg border py-2 px-4 text-sm"
            >
              Logout
            </button>
          </Form>
        </>
      ) : (
        <div className="flex flex-col gap-2 px-2">
          <Link
            to="/login"
            className="w-full rounded-lg border py-2 px-4 text-center text-sm"
          >
            Login
          </Link>
        </div>
      )}
    </aside>
  );
}

type MenuListProps = {
  label: string;
  path: string;
  icon?: React.ReactNode;
};

type MenuProps = {
  title: string;
  list: MenuListProps[];
};

const Menu = ({ title, list }: MenuProps) => {
  return (
    <nav className="flex w-full flex-col">
      <span className="mb-1 text-sm font-bold text-gray-800">{title}</span>
      <div className="ml-2 flex flex-col gap-2">
        {list.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className=" text-sm text-gray-600 hover:text-gray-900"
          >
            <span className="flex items-center gap-2">
              {item.icon}
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
};
