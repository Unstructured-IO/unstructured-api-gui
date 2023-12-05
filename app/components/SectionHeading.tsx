import type { FC } from "react"

type SectionHeadingProps = {
    title: string,
    description: string
}

const SectionHeading: FC<SectionHeadingProps> = ({title, description}) => {
    return (
        <div className="min-w-0 flex-1 col-span-5 border-b border-gray-900/10">
            <h2 className="text-2xl font-bold leading-7 text-dark-slate-blue">
            {title}
            </h2>
        <p className="text-lg leading-7 text-dark-slate-blue">
            {description}
        </p>
      </div>
    )
}

export { SectionHeading }