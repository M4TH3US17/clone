'use client'
import clsx from "clsx";
import { Search, CircleCheck, ExternalLink } from "lucide-react";
import Button from "../ui/button";
import LogoPass from "../ui/logo-chumbo-pass";
import { MdAccordionCategories } from "../aside-left";
import { DialogSearch } from "../dialog-search";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Header = () => {

    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    return (
        <header
            className={
                clsx(
                    "lg:ml-[18.72rem]",
                    "pt-[1.1rem] lg:pt-[0.6rem]",
                    "sticky top-0",
                    "border-b border-gray-200 bg-neutral",
                    "border-b border-l border-gray-200 z-3",
                )
            }
        >
            <DialogSearch isOpen={isOpen} handleClose={() => setIsOpen(false)} />

            <div className={
                clsx(
                    "px-7 pb-3.5 lg:pb-[0.6rem]",
                    "flex items-center justify-between w-full",
                )
            }>
                <div className="items-center gap-3 flex lg:hidden">
                    <LogoPass className="w-[110px]" />
                    <div className="border-r border-gray-400"></div>
                    <span
                        className={
                            clsx(
                                "hidden sm:block",
                                "mt-1 py-1 px-2",
                                "text-stone-600 font-bold text-xs flex",
                                "bg-white cursor-pointer rounded",
                                "hover:text-stone-200" // Agora está no final, priorizando o hover
                            )
                        }
                        onClick={() => { router.push(`/pt`) }}
                    >
                        Help Center
                    </span>
                </div>

                <div
                    className={clsx(
                        "cursor-pointer group", // Adicione "group" aqui
                        "flex justify-center items-center gap-2",
                        "border border-gray-300 rounded-lg",
                        "py-2 px-3",
                        "text-text-light-1 text-center hover:border-gray-400" // Hover do container (opcional)
                    )}
                    onClick={() => setIsOpen(true)}
                >
                    <Search
                        className="w-4 h-4 opacity-50 font-semibold group-hover:opacity-100 group-hover:border-stone-100"
                    />

                    <p className={clsx(
                        "mr-0 lg:mr-22 opacity-50 font-medium",
                        "text-[1rem] group-hover:opacity-100 group-hover:border-stone-100"
                    )}>
                        Search
                    </p>

                    <div className="hidden lg:flex font-medium">
                        <span
                            className={clsx(
                                "bg-stone-200 text-stone-900 opacity-50 font-semibold",
                                "px-2 py-0.5 rounded mr-0.5 text-[13px] leading-4",
                                "h-[22px]"
                            )}
                        >
                            CTRL
                        </span>
                        <span
                            className={clsx(
                                "bg-stone-200 text-stone-900 opacity-50 font-semibold",
                                "px-1.5 py-0.5 rounded text-[13px] leading-4"
                            )}
                        >
                            K
                        </span>
                    </div>
                </div>

                <div className="hidden lg:flex gap-2 items-center space-x-2 lg:space-x-3">
                    <div className="flex items-center space-x-1 group cursor-pointer">
                        <CircleCheck size={20} className="text-stone-500 group-hover:text-green-500" />
                        <span
                            className="text-stone-500 font-semibold group-hover:text-green-500 text-xs"
                        >All systems go</span>
                    </div>
                    <Button
                        label="Open app"
                        className={
                            clsx(
                                "rounded-lg py-1.5 px-2 border border-gray-300 bg-neutral group hover:text-black hover:border-gray-400",
                                "text-stone-500"
                            )
                        }
                        icon={<ExternalLink className="w-4 h-4 text-stone-500 group-hover:text-black" />}
                    />

                </div>
            </div>
            <MdAccordionCategories />
        </header>
    )
}

export default Header;