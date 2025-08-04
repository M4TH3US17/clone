'use client'

import { CircleX, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { FC, useRef, useState, useEffect } from "react"; // Adicione useEffect
import { SearchList } from "./components/search-list";
import clsx from "clsx";
import { useKeyboardShortcuts } from "@/hooks/hook-keyboard-shortcuts";
import { Dialog } from "../ui/dialog";

export const DialogSearch: FC<{
    isOpen: boolean,
    handleClose(): void,
    handleOpen(): void // Adicione esta prop
}> = ({ isOpen, handleClose, handleOpen }) => {

    const t = useTranslations("header.dialogSearch.search");

    const inputRef = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState<string>();

    // Atualize o hook existente ou adicione um useEffect
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault(); // Evita o comportamento padrão do navegador
                handleOpen(); // Abre o modal
                setTimeout(() => {
                    inputRef.current?.focus(); // Foca no input após a abertura
                }, 0);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleOpen]);

    useKeyboardShortcuts({
        onClose: handleClose,
        onOpen: handleOpen 
    });

    if (isOpen)
        return (
            <div className="absolute z-50">
                <Dialog.Root>
                    <Dialog.HiddenScroll isOpen={isOpen} />
                    <Dialog.Mask onClose={handleClose}>
                        <Dialog.Modal>
                            <div className={clsx(
                                "flex items-center",
                                "border-b border-gray-300",
                                "px-4 py-3",
                                "transition-colors",
                                "focus-within:ring-1 focus-within:ring-blue-500 bg",
                                "focus-within:border-blue-500 bg-white rounded-t-lg"
                            )}>
                                <Search size={16} className="text-gray-600 mr-2 cursor-pointer" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    autoCapitalize="off"
                                    spellCheck="false"
                                    placeholder={t("placeholder")}
                                    value={value}
                                    onChange={e => setValue(e.target.value)}
                                    className="flex-1 outline-none bg-transparent text-gray-600 placeholder-gray-600 text-[13px] w-full"
                                />
                                {
                                    value && value.length > 0 ?
                                        <CircleX size={16} className="cursor-pointer text-gray-600" onClick={() => setValue("")} /> : null
                                }
                            </div>
                            <SearchList />
                        </Dialog.Modal>
                    </Dialog.Mask>
                </Dialog.Root>
            </div>
        );

    return null;
}