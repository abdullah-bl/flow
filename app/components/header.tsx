import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useNavigate } from "@remix-run/react";
import type { ReactNode } from "react";
export default function Header({
  back = false,
  children,
}: {
  back?: boolean;
  children?: ReactNode;
}) {
  const navigate = useNavigate();
  return (
    <header className="sticky top-1 flex items-center gap-2 bg-white/80 py-2">
      {back ? (
        <span
          onClick={() => navigate(-1)}
          className="cursor-pointer rounded-lg px-4 py-2 hover:bg-gray-100"
        >
          <ArrowLeftIcon />
        </span>
      ) : (
        <span />
      )}
      {children}
    </header>
  );
}
