import { FC, ReactNode } from "react";


export const DialogRoot: FC<{ children: ReactNode }> = ({children}) => {

    return (
        <div className="z-[99999999]">  
            {children}
        </div>
    );
}