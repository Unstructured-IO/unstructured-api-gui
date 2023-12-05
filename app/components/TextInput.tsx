import type { FC } from "react"

type TextInputProps = {
    label: string
    helper: string
    name: string
    placeholder?: string
    defaultValue?: string
    required?: boolean
}

const TextInput: FC<TextInputProps> = ({label, helper, placeholder, name, defaultValue, required = false}) => { 
    return (
        <div className="sm:col-span-4">
            { label && (
                <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
                    {label}
                </label>
            ) }
            {/* TODO: Implement label and helper as render props for increased flexibility */}
            { helper && (
                <p className="text-gray-500">{helper}</p>
            ) }
            <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                    type="text"
                    name={name}
                    id={name}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    required={required}
                    />
                </div>
            </div>
        </div>
    )
}

export {TextInput}