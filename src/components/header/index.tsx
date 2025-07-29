'use client'
import clsx from "clsx";
import { Search, CircleCheck, ExternalLink } from "lucide-react";
import Button from "../ui/button";
import LogoPass from "../ui/logo-chumbo-pass";
import { MdAccordionCategories } from "../aside-left";
import { DialogSearch } from "../dialog-search";
import { useState } from "react";

const Header = () => {
    
    const [isOpen, setIsOpen] = useState(false);

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
            <DialogSearch isOpen={isOpen} handleClose={() => setIsOpen(false)}/>

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
                                "text-secondary font-bold text-xs flex",
                                "bg-white cursor-pointer rounded"
                            )
                        }
                    >Help Center</span>
                </div>

                <div
                    className={
                        clsx(
                            "cursor-pointer",
                            "bg-white",
                            " flex justify-center items-center gap-2",
                            "border border-gray-300 rounded-lg",
                            "py-2 px-3",
                            "text-text-light-1 text-center"
                        )
                    }
                    onClick={() => setIsOpen(true)}
                >

                    <Search
                        className="w-4 h-4"
                    />

                    <p className={
                        clsx(
                            "mr-0 lg:mr-22",
                            "text-[1rem] font-medium"
                        )
                    }>Search</p>
                    
                    <div className="hidden lg:flex font-medium">
                        <span
                            className={clsx(
                                "bg-gray-100  text-black",
                                "px-2 py-0.5 rounded-full text-[13px]"
                            )}
                        > CTRL </span>
                        <span
                            className={clsx(
                                "bg-gray-100 text-black",
                                "px-1.5 py-0.5 rounded text-[13px]"
                            )}
                        > K </span>
                    </div>
                </div>

                <div className="hidden lg:flex gap-2 items-center space-x-2 lg:space-x-3">
                    <div className="flex items-center space-x-1">
                        <CircleCheck size={20} className="text-primary" />
                        <span
                            className="text-primary font-semibold text-xs"
                        >All systems go</span>
                    </div>
                    <Button
                        label="Open app"
                        className={
                            clsx(
                                "rounded-full text-primary border-none py-1.5 px-2",

                            )
                        }
                        icon={<ExternalLink className="text-primary w-4 h-4" />}
                    />

                </div>
            </div>
            <MdAccordionCategories/>
        </header>
    )
}

export default Header;