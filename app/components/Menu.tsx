import { Menu, Transition } from "@headlessui/react";
import { FC, Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

type CustomMenuItemProps = {
  label: string;
  callback: () => void;
};

type MenuProps = {
  label: string;
  disabled?: boolean;
  items: CustomMenuItemProps[];
};

const FilterMenu: FC<MenuProps> = ({ label, items, disabled }) => {
  return (
    <div className="absolute z-10 top-5 left-5">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-dark-slate-blue hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            {label}
            <ChevronDownIcon
              className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-100 left-0 top-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {items.map(({ label, callback }) => (
              <Menu.Item key={label} disabled={disabled}>
                {({ active }) => (
                  <button
                    onClick={() => callback()}
                    className={`${
                      active ? "bg-light-blue text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {label}
                  </button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export { FilterMenu };
