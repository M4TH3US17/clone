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
            "bg-neutral text-primary",
            "flex min-h-screen flex-[1] relative"
        )}>
            <section className={clsx(
                "lg:bg-amber-200 w-full flex lg:justify-end"
            )}>
                <div
                    className={clsx(
                        "bg-neutral",
                        "lg:p-[40px 64px 120px] xl:p-[20px 128px 120px]"
                    )}
                    style={{
                        width: 'calc(100vw - 18.72rem)',
                        // padding: "40px 64px 120px"
                    }}
                >
                    <div className="lg:h-[36px] lg:w-[36px] mb-5 rounded-md flex items-center justify-center bg-white">
                        <Icon className="lg:h-[20px] lg:w-[20px]" />
                    </div>

                    <h1
                        className={clsx(
                            "lg:text-5xl lg:leading-14 lg:pb-3.5"
                        )}>{topic.title}</h1>

                    <h3
                        className={clsx(
                            "lg:text-[20px] leading-6.5 mb-10 opacity-80"
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
                                    "lg:py-3.5 lg:px-5 border border-gray-200 rounded-md"
                                )}
                            >
                                <span
                                    className="lg:text-[16px]"
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