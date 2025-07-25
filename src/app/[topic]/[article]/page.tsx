'use client';
import { ArticleEstructure } from "@/components/article";
import { useDataStore } from "@/store/dataStore";
import { HelpCenterData } from "@/types/sidebar";
import { notFound } from "next/navigation";

const ArticlePage = ({ params }: any) => {
    const sidebarTopics: HelpCenterData = useDataStore((state) => state.data.topics);
    const topic = sidebarTopics.find(t => t.slug === params.topic);
    const article = topic?.articles.find(a => a.slug === params.article);
  
    if (!topic || !article) return notFound();
  
    return <ArticleEstructure article={article} />
};
  
export default ArticlePage;
  