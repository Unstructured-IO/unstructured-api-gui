import type { FC, ReactNode } from "react"


type InputGroupProps = {
    children: ReactNode
}

const InputGroup: FC<InputGroupProps> = ({children}) => {
    return (
    <div className="col-span-5">
        {children}
    </div>
    )
}

export { InputGroup }