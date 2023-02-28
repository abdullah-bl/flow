import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Link, useParams } from "@remix-run/react";

export default function YearsTabs() {
  const { year } = useParams();
  const _year = Number(year);
  const currentYear = new Date().getFullYear();
  const minYear = 2020;
  const maxYear = currentYear;
  const lastYear = _year - 1 > minYear ? _year - 1 : minYear;
  const nextYear = _year < currentYear ? _year + 1 : currentYear;
  return (
    <div className="flex items-center justify-between gap-4">
      {_year !== minYear ? (
        <Link
          prefetch={"intent"}
          to={`/budget/${lastYear}`}
          className="flex items-center gap-2 rounded-lg py-2 px-4 hover:bg-gray-100"
          aria-disabled={lastYear === minYear}
        >
          <ChevronLeftIcon width={22} height={22} />
          <span>{lastYear}</span>
        </Link>
      ) : (
        <span />
      )}
      {_year !== maxYear ? (
        <Link
          prefetch={"render"}
          to={`/budget/${nextYear}`}
          className="flex items-center gap-2 rounded-lg py-2 px-4 hover:bg-gray-100"
        >
          <span>{nextYear}</span>
          <ChevronRightIcon width={22} height={22} />
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}
