'use client'

import { CircleX, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { FC, useRef, useState } from "react";
import { SearchList } from "./components/search-list";
import clsx from "clsx";
import { useKeyboardShortcuts } from "@/hooks/hook-keyboard-shortcuts";
import { Dialog } from "../ui/dialog";

export const DialogSearch: FC<{
    isOpen: boolean,
    handleClose(): void
}> = ({ isOpen, handleClose}) => {

    const t = useTranslations("header.dialogSearch.search");

    const inputRef = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState<string>();

    useKeyboardShortcuts({
        onClose: handleClose,
    });

    if(isOpen)
    return (
        <Dialog.Root>
            <Dialog.HiddenScroll isOpen={isOpen}/>
            <Dialog.Mask onClose={handleClose}>
                <Dialog.Modal>
                    <div className={clsx(
                        "flex items-center",
                        "border-b border-gray-300",
                        "px-4 py-3 mb-1",
                        "transition-colors",
                        "focus-within:ring-1 focus-within:ring-blue-500",
                        "focus-within:border-blue-500"
                    )}>
                        <Search size={16} className="text-gray-600 dark:text-gray-400 mr-2 cursor-pointer" />
                        <input
                            ref={inputRef}
                            type="text"
                            autoCapitalize="off"
                            spellCheck="false"
                            placeholder={t("placeholder")}
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            className="flex-1 outline-none bg-transparent text-light dark:text-dark placeholder-gray-600 text-[13px] w-full"
                        />
                        {
                            value && value.length > 0 ?
                            <CircleX size={16} className="cursor-pointer" onClick={() => setValue("")}/> : null
                        }
                        
                    </div>
                    <SearchList/>
                </Dialog.Modal>
            </Dialog.Mask>
        </Dialog.Root>
    );

    return null
  }