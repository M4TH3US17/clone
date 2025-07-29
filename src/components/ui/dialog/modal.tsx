import { FC, ReactNode } from "react";

export const DialogModal: FC<{ children: ReactNode }> = ({children}) => {

    return (
        <div
            className="relative z-10 w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%] max-w-2xl rounded-xl bg-white dark:bg-tertiary-dark shadow-xl p-0"
            onClick={(e) => e.stopPropagation()}
        >
            {children}
        </div>
    );
}