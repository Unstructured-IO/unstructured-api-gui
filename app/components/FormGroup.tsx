import type { FC, ReactNode } from "react"

type FormGroupProps = {
    children: ReactNode,
    disabled: boolean
}

const FormGroup: FC<FormGroupProps> = ({children, disabled}) => {
    
    return (
        <div className="space-y-1">
            <fieldset disabled={disabled} className="disabled:opacity-75 mt-5 grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-full">
                {children}
            </fieldset>
        </div>
    )
}

export { FormGroup }