import type { FC } from "react"

type CheckboxInputProps = {
    name: string,
    label: string,
    helper: string,
}

type CheckboxInputGroupProps = {
    legend: string
    options: CheckboxInputProps[]
}

const CheckboxInput: FC<CheckboxInputProps> = ({name, label, helper}) => {
    return (
        <div className="relative flex gap-x-3">
            <div className="flex h-6 items-center">
            <input
                id={name}
                name={name}
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            </div>
            <div className="text-sm leading-6">
            <label htmlFor={name} className="font-medium text-gray-900">
               {label}
            </label>
            {helper && (
                <p className="text-gray-500">{helper}</p>
            )}
            </div>
        </div>
    )
}

const CheckboxInputGroup: FC<CheckboxInputGroupProps> = ({legend, options}) =>  {
  return (
    <fieldset>
        <legend className="text-sm font-semibold leading-6 text-gray-900">{legend}</legend>
        <div className="mt-6 space-y-6">
            { options.map( ({name, label, helper}) => <CheckboxInput key={name} name={name} label={label} helper={helper} />) }
        </div>
    </fieldset> 
  )
}

export { CheckboxInputGroup, CheckboxInput}