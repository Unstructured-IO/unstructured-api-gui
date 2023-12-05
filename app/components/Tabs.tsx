import { useState } from "react";
import type { outputFormat } from "~/types";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const Tabs = ({
  tabs,
  defaultTab,
  setOutputFormat,
}: {
  tabs: outputFormat[];
  defaultTab: string;
  setOutputFormat: (format: outputFormat) => void;
}) => {
  const [outputFormatInternal, setOutputFormatInternal] = useState(defaultTab);
  return (
    <nav className="flex space-x-4" aria-label="Tabs">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => {
            setOutputFormat(tab);
            setOutputFormatInternal(tab);
          }}
          className={classNames(
            tab === outputFormatInternal
              ? "bg-gray-100 text-gray-700"
              : "text-gray-500 hover:text-gray-700",
            "rounded-md px-3 py-2 text-sm font-medium"
          )}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
};
