import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import type { FC, ReactNode } from 'react'

import { CheckboxInput } from "~/components/CheckBoxGroups"
import { TextInput } from "~/components/TextInput"
import { InputGroup } from './InputGroup'

type OptionProps = {
    type: string
    name: string
    label: string
    helper: string
}

type OptionsAccordionProps = {
    label: string
    children?: ReactNode
    options?: OptionProps[]
}

const renderInput = ({
    type, 
    name, 
    label,
    helper
    }: OptionProps ): ReactNode => {
    switch(type) {
        case 'text':
            return <TextInput name={name} label={label} helper={helper}  />
        case 'checkbox':
            return <CheckboxInput name={name} label={label} helper={helper}  />
        default:
            return (
                <InputGroup>
                    <label htmlFor={name}>{label}</label>
                    <p>{helper}</p>
                    <input type={type} name={name} />
                </InputGroup>
            )
    }
}

const OptionsAccordion: FC<OptionsAccordionProps> = ({label, options, children}) => {
    return (
        <Disclosure>
            {({ open }) => (
                <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-light-blue px-4 py-2 text-left text-sm font-medium text-dark-slate-blue hover:bg-lightest-blue focus:outline-none focus-visible:ring focus-visible:ring-dark-blue focus-visible:ring-opacity-75">
                    <span>{label}</span>
                    <ChevronUpIcon
                    className={`${
                        open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-dark-slate-blue`}
                    />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-dark-slate-blue grid grid-cols-1 gap-y-3">
                    { 
                        (options && options?.length > 0) ? 
                            options?.map(option => renderInput(option)) :
                            children
                    }
                </Disclosure.Panel>
                </>
            )}
            </Disclosure>
    )
}

export {OptionsAccordion}