import { useLocation } from "@remix-run/react";
import { Link } from "react-router-dom";

export default function Tabs({
  links,
}: {
  links: { to: string; text: string }[];
}) {
  const { pathname } = useLocation();
  return (
    <div className="my-2 flex gap-1">
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className={`
            rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 
            ${pathname === link.to ? "bg-gray-100 text-gray-900" : ""}
              `}
        >
          {link.text}
        </Link>
      ))}
    </div>
  );
}
