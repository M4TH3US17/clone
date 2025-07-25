'use client';
import { useDataStore } from "@/store/dataStore";
import { HelpCenterData } from "@/types/sidebar";
import { notFound } from "next/navigation";

const ArticlePage = ({
    params,
  }: {
    params: { topic: string; article: string };
  }) => {

    const sidebarTopics: HelpCenterData = useDataStore((state) => state.data.topics);
    
    const topic = sidebarTopics.find(t => t.slug === params.topic);
    console.log('params', params)
    const article = topic?.articles.find(a => a.metadados.slug === params.article);
    
    if (!topic || !article) return notFound();
  
    return (
      <div>
        <h1>{article.metadados.title}</h1>
        {/* <p>{article.content}</p> */}
      </div>
    );
  }

export default ArticlePage;
