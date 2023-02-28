import { Form, Link, useLocation } from "@remix-run/react";
import type { ReactNode } from "react";
import { useOptionalUser } from "~/utils";
import cn from "classnames";
import {
  DashboardIcon,
  GlobeIcon,
  HomeIcon,
  ListBulletIcon,
  MixIcon,
  PersonIcon,
  PieChartIcon,
} from "@radix-ui/react-icons";

export default function Navbar() {
  const user = useOptionalUser();
  return (
    <nav className="sticky top-0 z-50 mx-auto flex justify-between border-b bg-white  p-2 text-black ">
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="rounded bg-black p-1 px-4 text-center text-2xl font-bold text-white"
        >
          Flow
        </Link>
        <nav className="flex items-center justify-center overflow-x-scroll">
          {routes.map((link) => (
            <LinkItem key={link.to} {...link} />
          ))}
          {user?.admin && (
            <LinkItem to="/dash" label="Dashboard" icon={<DashboardIcon />} />
          )}
        </nav>
      </div>
      <div className="flex items-center gap-2">
        {user ? (
          <>
            <Link
              to="/profile"
              className="flex items-center gap-2 rounded-full border p-2 text-center hover:border-blue-700"
            >
              <PersonIcon />
            </Link>
            <Form action="/logout" method="post">
              <button
                type="submit"
                className="rounded py-1 px-4 text-red-700  "
              >
                Logout
              </button>
            </Form>
          </>
        ) : (
          <>
            <Link to="/login" className="text-center">
              Login
            </Link>
            <Link to="/join" className="text-center">
              Join
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export const LinkItem = ({
  to,
  label,
  icon,
}: {
  to: string;
  label: string;
  icon?: ReactNode;
}) => {
  const { pathname } = useLocation();
  const active = pathname === to;
  return (
    <Link
      to={to}
      className={cn(
        active ? "font-bold text-black" : "text-gray-800",
        "flex items-center gap-2 px-2"
      )}
    >
      {icon}
      <span className="">{label}</span>
    </Link>
  );
};

export const routes = [
  {
    to: "/",
    label: "Home",
    icon: <HomeIcon />,
  },
  {
    to: "/tasks",
    label: "Tasks",
    icon: <ListBulletIcon />,
  },
  // {
  //   to: "/spaces",
  //   label: "Spaces",
  //   icon: <GlobeIcon />,
  // },
  {
    to: "/budget",
    label: "Budget",
    icon: <PieChartIcon />,
  },
  {
    to: "/projects",
    label: "Projects",
    icon: <MixIcon />,
  },
];
