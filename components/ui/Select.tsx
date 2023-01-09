export type SelectOption = {
  id: number;
  name: string;
  icon?: string;
};

import { CheckIcon, ChevronUpDownIcon } from "@/components/icons";
import { Listbox, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useState } from "react";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Select({
  options,
  onOptionChange,
}: {
  options: SelectOption[];
  onOptionChange?: (categoryId: number) => void;
}) {
  const [selected, setSelected] = useState(options?.[0] ?? {});

  const handleChange = (selectedOption: SelectOption) => {
    setSelected(selectedOption);
    if (onOptionChange) {
      onOptionChange(selectedOption.id);
    }
  };

  return (
    <Listbox value={selected} onChange={handleChange}>
      {({ open }) => (
        <>
          <div className="relative mt-1">
            <Listbox.Button className="min-h-[36px] capitalize relative w-full cursor-default rounded-md bg-slate-800 py-2 pl-4 pr-10 text-left outline-none focus:ring-1 dark:focus:ring-slate-700 focus:ring-gray-500 sm:text-sm">
              <span className="flex items-center">
                {selected?.icon && (
                  <Image
                    src={selected.icon}
                    alt=""
                    width={24}
                    height={24}
                    className="h-6 w-6 flex-shrink-0 rounded-full"
                  />
                )}
                <span className="block truncate">{selected?.name}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-slate-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options?.map((option) => (
                  <Listbox.Option
                    key={option.id}
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-emerald-600" : "text-white",
                        "relative cursor-default select-none py-2 pl-3 pr-9 capitalize"
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          {option.icon && (
                            <Image
                              src={option.icon}
                              alt=""
                              width={24}
                              height={24}
                              className="h-6 w-6 flex-shrink-0 rounded-full"
                            />
                          )}
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "ml-3 block truncate"
                            )}
                          >
                            {option.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-emerald-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
