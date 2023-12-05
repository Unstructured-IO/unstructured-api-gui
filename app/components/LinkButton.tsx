import type { FC, ReactNode } from "react"

type LinkButtonProps = {
    href: string
    download?: boolean
    target?: string
    children?: ReactNode
    label?: string
}

const LinkButton: FC<LinkButtonProps> = ({href, children, download, target, label}) => {
    return (
        <a 
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" 
            href={href} 
            download={download} 
            target={target} 
            aria-label={label}
        >
            {children}
        </a>
    )
}

export {LinkButton}