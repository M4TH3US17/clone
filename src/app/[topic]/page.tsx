'use client';
import { useDataStore } from "@/store/dataStore";
import { Article, HelpCenterData } from "@/types/sidebar";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";

const TopicPage = ({ params }: { params: { topic: string } }) => {
    
    const helpCenter: HelpCenterData = useDataStore((state) => state.data.topics);

    const topic = helpCenter.find(t => t.slug === params.topic);

    const router = useRouter();

    if (!topic) return notFound();
    
    const handleCLick = (article: Article) => {
        router.push(`/${topic.slug}/${article.metadados.slug}`)
    }

  
    return (
      <div>
        <h2>{topic.title}</h2>
        <ul>
          {topic.articles.map(article => (
            <li key={article.metadados.title} onClick={() => handleCLick(article)}>
                {article.metadados.title}
            </li>
          ))}
        </ul>
      </div>
    );
  }

export default TopicPage