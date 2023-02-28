import type { Budget, Item } from "@prisma/client";
import React, { useEffect } from "react";
import ReactSelect from "react-select";
import AsyncSelect from "react-select/async";
import { ClientOnly } from "remix-utils";

export interface SelectItemProps {
  defaultItemId?: string | null;
  defaultBudgetId?: string | null;
}

export const SelectItem = ({
  defaultItemId,
  defaultBudgetId,
}: SelectItemProps) => {
  const [item, setItem] = React.useState<Item & { budget: Budget[] }>();

  const loadOptions = async (inputValue: string) => {
    const response = await fetch(`/api/items?q=${inputValue}`);
    const items = await response.json();
    return items;
  };
  useEffect(() => {
    console.log("defaultItemId =>", defaultItemId);
    console.log("defaultBudgetId =>", defaultBudgetId);
  }, [defaultItemId, defaultBudgetId]);

  const getOptionLabel = (option: any) => option.name;
  const getOptionValue = (option: any) => option.id;

  const onChange = (option: any) => {
    console.log(option);
    setItem(option);
  };

  return (
    <ClientOnly fallback={<div>Loading...</div>}>
      {() => (
        <>
          <div className="flex flex-col">
            <label htmlFor="item" className="">
              <span className="text-sm text-gray-500">Select Item *</span>
            </label>
            <div className="mt-1">
              <AsyncSelect
                className="w-1/2"
                id="item"
                name="itemId"
                cacheOptions
                defaultOptions
                loadOptions={loadOptions}
                getOptionLabel={getOptionLabel}
                getOptionValue={getOptionValue}
                onChange={onChange}
                placeholder="Select an item"
              />
            </div>
          </div>
          {/* <div className="flex flex-col">
            <label htmlFor="item" className="">
              <span className="text-sm text-gray-500">Select Budget *</span>
            </label>
            <div className="mt-1">
              <ReactSelect
                className="w-1/2"
                id="budget"
                name="budgetId"
                options={item?.budget || []}
                getOptionLabel={(option) => option.year.toString()}
                getOptionValue={(option) => option.id.toString()}
                onChange={onChange}
                placeholder="Select a budget"
              />
            </div>
          </div> */}
        </>
      )}
    </ClientOnly>
  );
};
