import clsx from "clsx";
import { FC, ReactNode } from "react";

export const DialogModal: FC<{ children: ReactNode }> = ({ children }) => {

    return (
        <div
            className={clsx(
                "relative z-10 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%] max-w-2xl rounded-xl dark:bg-tertiary-dark shadow-xl p-0",
                "max-w-[532px] max-h-[min(446px)] p-1 bg-neutral-200"
            )}
            onClick={(e) => e.stopPropagation()}
        >
            {children}
        </div>
    );
}