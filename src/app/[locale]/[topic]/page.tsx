"use client";

import { useRouter, notFound } from "next/navigation";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import Breadcrumb from "../breadCrumb";
import { Article, HelpCenterData } from "@/types/sidebar";
import { useDataStore } from "@/store/dataStore";
import { getLucideIcon } from "@/components/ui/icon-wrapper";
import { useParams } from "next/navigation";
export default function TopicPage() {

  const { topic } = useParams<{ topic: string }>();

  const router = useRouter();
  const helpCenter: HelpCenterData = useDataStore((state) => state.data.topics);
  const topicCurrent = helpCenter.find((t) => t.slug === topic);

  if (!topicCurrent) return notFound();

  const handleClick = (article: Article) => {
    router.push(`/${topicCurrent.slug}/${article.slug}`);
  };

  const Icon = getLucideIcon(topicCurrent.icon);

  return (
    <main
      className={clsx(
        "bg-neutral text-primary ml-0 lg:ml-[18.72rem]",
        "flex min-h-screen flex-[1] relative",
        "2xl:flex 2xl:justify-center"
      )}
    >
      <section
        className={clsx(
          "lg:flex lg:justify-center",
          "w-full flex lg:justify-end lg:max-w-[1148px]"
        )}
      >
        <div
          className={clsx(
            "bg-neutral w-full",
            "lg:w-[calc(100vw - 18.72rem)]",
            "pt-[40px] pr-[16px] pb-[120px] pl-[16px]",
            "md:pt-[40px] md:pr-[64px] md:pl-[64px] md:pb-[120px]",
            "xl:pt-[20px] 2xl:pr-[128px] 2xl:pl-[128px] xl:pb-[120px]"
          )}
        >
          <Breadcrumb />
          <div className="h-[36px] w-[36px] mt-10 mb-8 rounded-md flex items-center justify-center bg-white">
            <Icon className="h-[22px] w-[24px]" />
          </div>

          <h1
            className={clsx(
              "w-[70%] md:w-full 520:w-[100%] 520:text-[2.5rem]",
              "pb-3.5 font-[500] mb-3",
              "leading-14 xl:text-[2.5rem]"
            )}
          >
            {topicCurrent.title}
          </h1>

          <h3
            className={clsx(
              "text-[20px] leading-6 md:leading-6.5 mb-10 opacity-80 520:text-[1rem]"
            )}
          >
            {topicCurrent.subtitle}
          </h3>

          <ul className="flex flex-col w-full gap-[8px]">
            {topicCurrent.articles.map((article) => (
              <li
                key={article.title}
                onClick={() => handleClick(article)}
                className={clsx(
                  "bg-white flex justify-between items-center",
                  "py-3.5 px-5 border border-gray-200 rounded-md cursor-pointer"
                )}
              >
                <span
                  className="text-[16px] w-[70%] md:w-full truncate cursor-pointer"
                  style={{ fontWeight: "500" }}
                >
                  {article.title}
                </span>
                <ChevronRight className="w-4.5 h-4.5 transition-transform duration-200 text-gray-400 border-0" />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
