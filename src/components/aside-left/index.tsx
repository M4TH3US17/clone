'use client'
import clsx from "clsx";
import { ChevronRight, List } from "lucide-react";
import { Accordion } from "radix-ui";
import { AccordionContent, AccordionTrigger } from "@radix-ui/react-accordion";
import { FC, useState } from "react";
import LogoPass from "../ui/logo-pass";
import { useDataStore } from "@/store/dataStore";
import { HelpCenterData, Topic } from "@/types/sidebar";
import { getLucideIcon } from "../ui/icon-wrapper";
import { useRouter } from "next/navigation";

const AsideLeft = () => {
    const [openValue, setOpenValue] = useState<string>();
    const [openValueCategories, setOpenValueCategories] = useState<string>();

    const router = useRouter();

    const sidebarTopics: HelpCenterData = useDataStore((state) => state.data.topics);

    const SideBarItem: FC<{ topic: Topic, isOpen: boolean }> = ({ topic, isOpen }) => {

        const Icon = getLucideIcon(topic.icon);

        return (
            <Accordion.Item className="AccordionItem cursor-pointer " value={topic.title}>
                <AccordionTrigger className="w-full flex items-center justify-between gap-1 font-semibold text-gray-600 hover:bg-gray-200 rounded-xl p-2 px-3 cursor-pointer">
                    <div className="flex w-full items-center gap-2">
                        <Icon className="w-6 h-6 text-gray-600" />
                        <p className={
                            clsx(
                                "text-gray-600 hover:text-gray-800",
                                "max-w-44 text-[14px]",
                                "overflow-hidden whitespace-nowrap",
                                "truncate font-semibold"
                            )
                        }>{topic.title}</p>
                    </div>
                    <div className="hover:border-gray-200 rounded-[6px] hover:bg-gray-100">
                        <ChevronRight
                            className={
                                clsx(
                                    "w-5 h-5 transition-transform duration-200",
                                    isOpen ? "rotate-90" : "rotate-0"
                                )
                            }
                        />

                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    {topic.articles && (
                        <ul className="ml-7 mt-1 space-y-4">
                            {
                                topic.articles.map((subitem, index) => (
                                    <li 
                                        key={index}
                                        onClick={() => {
                                            router.push(`/${topic.slug}/${subitem.metadados.slug}`)
                                        }}
                                        className={
                                            clsx(
                                                "text-gray-500 hover:text-gray-700",
                                                "w-full",
                                                "overflow-hidden whitespace-nowrap",
                                                "truncate font-semibold"
                                            )
                                        }
                                    >
                                        {subitem.metadados.title}
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
        return (
            <Accordion.Root
                className="AccordionRoot space-y-2"
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

    return (
        <>
            <Accordion.Root
                className="AccordionRoot space-y-2 block lg:hidden"
                type="single"
                value={openValueCategories}
                onValueChange={(val) => setOpenValueCategories(val)}
                collapsible
            >
                <Accordion.Item className="AccordionItem cursor-pointer " value={"categories"}>
                    <AccordionTrigger className=" w-full flex items-center justify-between gap-1 font-semibold text-gray-600 hover:bg-gray-200 p-2 px-3 border-b border-gray-200">
                        <div className="flex items-center gap-2">
                            <List />
                            Categories
                        </div>
                        <div className="hover:border-gray-200 rounded-[6px] hover:bg-gray-100">
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
            <aside
                className={
                    clsx(
                        "hidden lg:block",
                        "bg-[#F5F5F5] border-r border-gray-200",
                        "p-3 w-72",
                        "fixed inset-y-0 left-0 z-50",
                        "transform transition-transform duration-300 ease-in-out xl:transform-none",
                    )
                }
            >
                {/* Sidebar Header */}
                <div
                    className="border-gray-200 pl-7 pr-5 py-2"
                    style={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}
                >
                    <LogoPass className="w-[100px]" />
                    <div className="border-r border-gray-300"></div>
                    <span
                        className={
                            clsx(
                                "mt-1 py-1 px-2",
                                "text-gray-700 hover:text-gray-500 font-bold text-xs",
                                "bg-white cursor-pointer rounded"
                            )
                        }
                    >Help Center</span>
                </div>
                <SideBarAccordion />
            </aside>
        </>
    )
}

export default AsideLeft;