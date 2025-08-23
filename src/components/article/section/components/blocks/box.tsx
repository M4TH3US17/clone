

import clsx from "clsx"
import { FC } from "react"

export const Box: FC<{ body: any, className?: any }> = ({ body, className }) => {
    return <div
        style={{ borderRadius: "0.6rem", padding: "1.25rem 1.25rem" }}
        // className={clsx(, className)}
        className={clsx(
            "border border-gray-300",
            (className !== undefined) ? className : `mb-10`
        )}
    >{body}</div>
} 