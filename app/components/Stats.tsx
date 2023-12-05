import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import type { FC } from 'react'

type StatProps = {
    label: string
    stat: string | number
}

type StatsProps = {
    label: string
    stats: StatProps[]
}
const Stats: FC<StatsProps> = ({stats, label = 'Data Stats'}) => {
    return (
        <Disclosure>
            {({ open }) => (
                <>
                <Disclosure.Button className="mt-5 flex w-full justify-between rounded-lg bg-light-blue px-4 py-2 text-left text-sm font-medium text-dark-slate-blue hover:bg-lightest-blue focus:outline-none focus-visible:ring focus-visible:ring-dark-blue focus-visible:ring-opacity-75">
                    <span>{label}</span>
                    <ChevronUpIcon
                    className={`${
                        open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-dark-slate-blue`}
                    />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-dark-slate-blue grid grid-cols-1 gap-y-3">
                <div className="pt-5">
                    <h3 className="text-base font-semibold leading-6 text-gray-900">{label}</h3>
                        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                        {stats?.map((item) => (
                            <div key={item.label} className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                            <dt className="text-sm font-medium text-gray-500">{item.label}</dt>
                            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{item.stat}</dd>
                            </div>
                        ))}
                        </dl>
                    </div>
                </Disclosure.Panel>
                </>
            )}
            </Disclosure>
      
    )
  }

export {Stats}