'use client';
import { ArticleEstructure, ArticleSummary } from "@/components/article";
import { useDataStore } from "@/store/dataStore";
import { HelpCenterData } from "@/types/sidebar";
import clsx from "clsx";
import { notFound } from "next/navigation";
import { use } from "react";
import Breadcrumb from "../../breadCrumb";
import { ArticleContent } from "@/components/article/content";

const ArticlePage = ({ params }: { params: Promise<{ topic: string; article: string }> }) => {
    const resolvedParams = use(params);

    const sidebarTopics: HelpCenterData = useDataStore((state) => state.data.topics);
    const topic = sidebarTopics.find(t => t.slug === resolvedParams.topic);
    const article = topic?.articles.find(a => a.slug === resolvedParams.article);

    if (!topic || !article) return notFound();
    <ArticleEstructure article={article} />
    return (
        <main className={clsx(
            // "bg-amber-950",
            // "bg-neutral ",
            "bg-white",
            "text-primary ml-0 lg:ml-[18.72rem]",
            "flex min-h-screen flex-[1] relative",
            "2xl:flex 2xl:justify-center",
        )}>
            <section className={clsx(
                // "bg-amber-200 ",
                "w-full",
                "flex",
                "lg:flex lg:justify-center",
                "xl:justify-start"
            )}>
                <div
                    className={clsx(
                        // "bg-amber-500 ",
                        "w-full",
                        "pt-[40px] pr-[16px] pb-[120px] pl-[16px]",
                        "md:pt-[40px] md:pr-[64px] md:pl-[64px] md:pb-[120px]",
                        "lg:flex lg:justify-center",
                        "xl:w-[calc(100vw-31.72rem)] xl:justify-center",
                        "2xl:pt-[20px] 2xl:pr-[128px] 2xl:pb-[120px] 2xl:pl-[128px]",
                    )}
                >
                    <ArticleContent article={article} />
                </div>
                <ArticleSummary sections={article.sections} />
            </section>

        </main>
    )
};

export default ArticlePage;