import { FC, ReactNode } from "react";

export const DialogMask: FC<{ children: ReactNode, onClose(): void }> = ({children, onClose}) => {

    return (
        <div className="absolute min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div
                className="fixed inset-0 z-50 flex items-center justify-center"
                onClick={onClose}
            >
                {/* BACKDROP */}
                <div
                    className="absolute inset-0 bg-mask-light dark:bg-mask-dark backdrop-blur-xs"
                />
                {children}
            </div>
        </div>
    );
}