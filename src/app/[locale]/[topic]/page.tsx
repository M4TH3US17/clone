'use client';
import { getLucideIcon } from "@/components/ui/icon-wrapper";
import { useDataStore } from "@/store/dataStore";
import { Article, HelpCenterData } from "@/types/sidebar";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import { notFound, useRouter } from "next/navigation";

const TopicPage = ({ params }: any) => {
    const helpCenter: HelpCenterData = useDataStore((state) => state.data.topics);
    const topic = helpCenter.find(t => t.slug === params.topic);
    const router = useRouter();

    if (!topic)
        return notFound();

    const handleCLick = (article: Article) => {
        router.push(`/${topic.slug}/${article.slug}`)
    }

    const Icon = getLucideIcon(topic.icon);

    return (
        <main className={clsx(
            "bg-neutral text-primary ml-0 lg:ml-[18.72rem]",
            "flex min-h-screen flex-[1] relative",
            "2xl:flex 2xl:justify-center",
        )}>
            <section className={clsx(
                "lg:flex lg:justify-center",
                "w-full flex lg:justify-end lg:max-w-[1148px]",
            )}>
                <div
                    className={clsx(
                        "bg-neutral w-full",
                        "lg:w-[calc(100vw - 18.72rem)]",
                        "md:pt-[40px] md:pr-[64px] md:pl-[64px] md:pb-[120px]",
                        "xl:pt-[20px] 2xl:pr-[128px] 2xl:pl-[128px] xl:pb-[120px]",
                    )}
                    style={{
                        width: '',
                        // padding: "40px 64px 120px"
                    }}
                >
                    <div className="h-[36px] w-[36px] mb-5 rounded-md flex items-center justify-center bg-white">
                        <Icon className="h-[20px] w-[20px]" />
                    </div>

                    <h1
                        className={clsx(
                            "md:pb-3.5 font-[500]",
                            "md:text-5xl md:leading-14 xl:text-[3.8rem]"
                        )}>{topic.title}</h1>

                    <h3
                        className={clsx(
                            "md:text-[20px] leading-6.5 mb-10 opacity-80"
                        )}
                    // style={{ fontWeight: "500" }}
                    >{topic.subtitle}</h3>

                    <ul className="flex flex-col w-full gap-[8px]">
                        {topic.articles.map(article => (
                            <li
                                key={article.title}
                                onClick={() => handleCLick(article)}
                                className={clsx(
                                    "bg-white flex justify-between items-center",
                                    "md:py-3.5 md:px-5 border border-gray-200 rounded-md"
                                )}
                            >
                                <span
                                    className="md:text-[16px]"
                                    style={{ fontWeight: "500" }}
                                >{article.title}</span>
                                <ChevronRight
                                    className={
                                        clsx(
                                            "w-4.5 h-4.5 transition-transform duration-200 text-gray-400 border-0",
                                        )
                                    }
                                />
                            </li>
                        ))}
                    </ul>

                </div>
            </section>
        </main>
    );
}

export default TopicPage