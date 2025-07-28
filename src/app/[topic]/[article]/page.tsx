'use client';
import { ArticleEstructure } from "@/components/article";
import { useDataStore } from "@/store/dataStore";
import { HelpCenterData } from "@/types/sidebar";
import { notFound } from "next/navigation";
import { use } from "react";

const ArticlePage = ({ params }: { params: Promise<{ topic: string; article: string }> }) => {
    const resolvedParams = use(params);
    
    const sidebarTopics: HelpCenterData = useDataStore((state) => state.data.topics);
    const topic = sidebarTopics.find(t => t.slug === resolvedParams.topic);
    const article = topic?.articles.find(a => a.slug === resolvedParams.article);
  
    if (!topic || !article) return notFound();
  
    return <ArticleEstructure article={article} />
};
  
export default ArticlePage;