import type { FC } from "react"

type SubmitButtonProps = {
    label: string
    disabled: boolean
}

const SubmitButton: FC<SubmitButtonProps> = ({label, disabled}) => {
    return (
        <input disabled={disabled} type="submit" value={label} name="submit" className="disabled:opacity-75 inline-flex items-center rounded-md bg-light-blue px-3 py-2 text-sm font-semibold text-dark-slate-blue shadow-sm hover:bg-lightest-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-blue" />
    )
}

export { SubmitButton }