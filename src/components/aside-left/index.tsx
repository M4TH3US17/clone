'use client'
import clsx from "clsx";
import { ChevronRight, List } from "lucide-react";
import { Accordion } from "radix-ui";
import { AccordionContent, AccordionTrigger } from "@radix-ui/react-accordion";
import { FC, useState } from "react";
import LogoPass from "../ui/logo-chumbo-pass";
import { useDataStore } from "@/store/dataStore";
import { HelpCenterData, Topic } from "@/types/sidebar";
import { getLucideIcon } from "../ui/icon-wrapper";
import { useRouter } from "next/navigation";
import DialogHiddenScroll from "../ui/dialog/hidden-scroll";

const SideBarItem: FC<{ topic: Topic, isOpen: boolean }> = ({ topic, isOpen }) => {

    const Icon = getLucideIcon(topic.icon);

    const router = useRouter();

    return (
        <Accordion.Item className="AccordionItem cursor-pointer m-0" value={topic.title}>
            <AccordionTrigger className={
                clsx(
                    "text-black-700 rounded-xl cursor-pointer",
                    "flex items-center justify-between gap-1",
                    "py-1 pl-3 w-full "
                )
            }>
                <div className="flex w-full 2lg:text-[16px] h-[40px] items-center gap-2">
                    <Icon className="w-4 h-4 text-gray-400 font-extrabold" />
                    <p className={
                        clsx(
                            "text-gray-600",
                            "max-w-[11rem] 2lg:text-[13px]",
                            "lg::overflow-hidden whitespace-nowrap",
                            "lg:truncate"
                        )
                    }>{topic.title}</p>
                </div>
                <div className={
                    clsx(
                        "hover:bg-gray-200",
                        "group-hover:bg-gray-200",
                        "cursor-pointer",
                        "rounded-[6px] p-1"
                    )
                }>
                    <ChevronRight
                        className={
                            clsx(
                                "w-4.5 h-4.5 transition-transform duration-200 text-gray-300 bg-neutral border-0",
                                isOpen ? "rotate-90" : "rotate-0"
                            )
                        }
                    />
                </div>
            </AccordionTrigger>
            <AccordionContent>
                {topic.articles && (
                    <ul className="ml-7 mt-1">
                        {
                            topic.articles.map((subitem, index) => (
                                <li
                                    key={index}
                                    onClick={() => {
                                        router.push(`/${topic.slug}/${subitem.slug}`)
                                    }}
                                    className={
                                        clsx(
                                            "w-full text-primary",
                                            "overflow-hidden whitespace-nowrap",
                                            "truncate text-xs"
                                        )
                                    }
                                >
                                    {subitem.title}
                                </li>
                            ))
                        }
                    </ul>
                )}
            </AccordionContent>
        </Accordion.Item>
    )
}

const SideBarAccordion = () => {

    const [openValue, setOpenValue] = useState<string>();

    const sidebarTopics: HelpCenterData = useDataStore((state) => state.data.topics);

    return (
        <Accordion.Root
            className={
                clsx(
                    "AccordionRoot lg:max-h-[96%] overflow-y-auto xl:h-auto",
                    "pt-4 lg:pb-2 space-y-3 gap-[8px] scrollbar-hide"
                )
            }
            type="single"
            value={openValue}
            onValueChange={(val) => setOpenValue(val)}
            collapsible
        >
            {
                sidebarTopics.map((topic: Topic, index: number) => (
                    <SideBarItem
                        topic={topic}
                        isOpen={openValue === topic.title}
                        key={index}
                    />
                ))
            }
        </Accordion.Root>
    )
}

const AsideLeft = () => {

    return (
        <aside
            className={
                clsx(
                    "hidden lg:block",
                    "bg-[#F5F5F5] border-r border-gray-200",
                    "pl-5 pr-3 py-2 w-[18.72rem]",
                    "fixed inset-y-0 left-0 z-50",
                    "transform transition-transform duration-300 ease-in-out xl:transform-none",
                )
            }
        >
            {/* Sidebar Header */}
            <div
                className={
                    clsx(
                        "rounded-full text-primary border-none",
                        "pt-[19px] pb-[2px] pl-[15px] pr-[16px]",
                        "flex justify-between"
                    )
                }
            >
                <LogoPass className="w-[100px]" />
                <div className="border-r border-gray-200"></div>
                <span
                    className={
                        clsx(
                            "mt-1 rounded-full px-3",
                            "text-primary font-bold text-[12px]",
                            "bg-white cursor-pointer rounded"
                        )
                    }
                >Help Center</span>
            </div>
            <SideBarAccordion />
        </aside>
    )
}

export const MdAccordionCategories = () => {

    const [openValueCategories, setOpenValueCategories] = useState<string>();

    return (
        <Accordion.Root
            className={
                clsx(
                    "space-y-2 z-20",
                    "AccordionRoot",
                    "top-0 sticky lg:hidden"
                )
            }
            type="single"
            value={openValueCategories}
            onValueChange={(val) => setOpenValueCategories(val)}
            collapsible
        >
            <DialogHiddenScroll isOpen={openValueCategories ? true : false} />
            <Accordion.Item className="AccordionItem cursor-pointer " value={"categories"}>
                <AccordionTrigger className={
                    clsx(
                        "w-full flex items-center justify-between gap-1",
                        "p-3 py-[0.74rem] cursor-pointer",
                        "group hover:bg-gray-100 border-t border-gray-300",
                        "font-semibold text-gray-600",
                    )
                }>
                    <div className="flex items-center font-normal gap-2">
                        <List size={20} />
                        Categories
                    </div>
                    <div className={
                        clsx(
                            "bg-[#eeeeee] hover:bg-gray-200",
                            "group-hover:bg-gray-200",
                            "cursor-pointer",
                            "rounded-[6px] p-2"
                        )
                    }>
                        <ChevronRight
                            className={
                                clsx(
                                    "w-5 h-5 transition-transform duration-200",
                                    openValueCategories === "categories" ? "rotate-90" : "rotate-0"
                                )
                            }
                        />

                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <SideBarAccordion />
                </AccordionContent>
            </Accordion.Item>
        </Accordion.Root>
    )
}
export default AsideLeft;