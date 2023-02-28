import { Link } from "react-router-dom";
import Header from "~/components/header";

export default function BudgetItems() {
  return (
    <>
      <Header back>
        <div className="flex flex-1 items-center justify-between">
          <div className="flex flex-col ">
            <h1 className="text-2xl font-semibold">Items</h1>
            <span className="text-sm text-gray-500">
              Last updated 2 days ago
            </span>
          </div>
          <Link to={`new`}>New</Link>
        </div>
      </Header>
    </>
  );
}
