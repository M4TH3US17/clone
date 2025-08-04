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
            "bg-amber-950",
            // "bg-neutral ",
            "text-primary ml-0 lg:ml-[18.72rem]",
            "flex min-h-screen flex-[1] relative",
            "2xl:flex 2xl:justify-center",
        )}>
            <section className={clsx(
                "bg-amber-200",
                "w-full flex",
                "lg:flex lg:justify-center",
            )}>
                <div
                    className={clsx(
                        "bg-amber-500 w-full",
                        "pt-[40px] pr-[16px] pb-[120px] pl-[16px]",
                        "md:pt-[40px] md:pr-[64px] md:pl-[64px] md:pb-[120px]",
                        "lg:w-[calc(100vw - 18.72rem)] lg:flex lg:justify-center",
                    )}
                    style={{ width: '', }}
                >
                    <ArticleContent article={article}/>
                </div>
                <ArticleSummary sections={article.sections} />
            </section>
            
        </main>
    )
};

export default ArticlePage;