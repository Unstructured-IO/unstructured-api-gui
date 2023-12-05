import { type FC, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";

type RadioInputProps = {
  value: string;
  label: string;
  helper?: string;
  checked?: boolean;
};

type RadioInputOptions = {
  value: string;
  label: string;
  helper?: string;
};

type RadioInputGroupProps = {
  name: string;
  legend: string;
  helper: string;
  defaultValue: string;
  options: RadioInputOptions[];
};

const RadioInput: FC<RadioInputProps> = ({ value, label, helper }) => {
  return (
    <RadioGroup.Option
      value={value}
      className={({ active, checked }) =>
        `${
          active
            ? "ring-2 ring-dark-blue ring-opacity-60 ring-offset-2 ring-offset-light-blue"
            : ""
        }
        ${checked ? "bg-dark-slate-blue  text-white" : "bg-white"}
            relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
      }
    >
      {({ active, checked }) => (
        <>
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center">
              <div>
                <RadioGroup.Label
                  as="p"
                  className={`font-medium text-md ${
                    checked ? "text-white" : "text-gray-900"
                  }`}
                >
                  {label}
                </RadioGroup.Label>
                <RadioGroup.Description
                  as="p"
                  className={`text-sm ${
                    checked ? "text-sky-100" : "text-gray-500"
                  }`}
                >
                  {helper}
                </RadioGroup.Description>
              </div>
            </div>
            {checked && (
              <div className="shrink-0 text-white">
                <CheckIcon className="h-6 w-6" />
              </div>
            )}
          </div>
        </>
      )}
    </RadioGroup.Option>
  );
};

const RadioInputGroup: FC<RadioInputGroupProps> = ({
  name,
  legend,
  helper,
  options,
  defaultValue,
}) => {
  const [selected, setSelected] = useState(() => defaultValue);
  return (
    <fieldset>
      <div className="w-full col-s">
        <div className="mx-auto w-full">
          <RadioGroup name={name} value={selected} onChange={setSelected}>
            <RadioGroup.Label className="block mb-2 font-bold">
              {legend}
            </RadioGroup.Label>
            <RadioGroup.Description
              as="p"
              className="mb-5 text-gray-500 text-sm"
            >
              {helper}
            </RadioGroup.Description>
            <div className="space-y-2">
              {options.map(({ value, label, helper }) => (
                <RadioInput
                  key={value}
                  value={value}
                  label={label}
                  helper={helper}
                />
              ))}
            </div>
          </RadioGroup>
        </div>
      </div>
    </fieldset>
  );
};

export { RadioInputGroup };
