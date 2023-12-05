import { XCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { Transition } from '@headlessui/react'
import type { FC, ReactNode} from 'react';
import { Fragment, useState } from 'react'


type AlertProps = {
    header: string,
    children: ReactNode
}

const Alert: FC<AlertProps> = ({header, children}) => {
    let [isShowing, setIsShowing] = useState(true)

  return (
    <Transition
          as={Fragment}
          show={isShowing}
          enter="transform transition duration-[400ms]"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transform duration-200 transition ease-in-out"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
            <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
                <div className="flex-shrink-0">
                <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{header}</h3>
                <div className="mt-2 text-sm text-red-700">
                    { children }
                </div>
                </div>
                <div className="ml-auto pl-3">
                <div className="-mx-1.5 -my-1.5">
                    <button
                    type="button"
                    onClick={() => setIsShowing(false)}
                    className="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
                    >
                    <span className="sr-only">Dismiss</span>
                    <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                </div>
                </div>
            </div>
            </div>
        </Transition>
  )
}

export { Alert }