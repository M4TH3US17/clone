'use client';
import { useDataStore } from "@/store/dataStore";
import { Article, HelpCenterData } from "@/types/sidebar";
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
  
        return (
        <div className="">
            <h2>{topic.title}</h2>
            <ul>
                {topic.articles.map(article => (
                    <li key={article.title} onClick={() => handleCLick(article)}>
                        {article.title}
                    </li>
                ))}
            </ul>
        </div>
    );
  }

export default TopicPage