"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useDataStore } from "@/store/dataStore";
import { ParamValue } from "next/dist/server/request/params";

const Breadcrumb = () => {

  const params = useParams();

  const helpCenter = useDataStore((state) => state.data.topics);

  const topic = helpCenter.find((t: { slug: ParamValue; }) => t.slug === params.topic);
  const article = topic?.articles.find((a: { slug: ParamValue; }) => a.slug === params.article);

  const breadcrumbs = [
    { label: "Help Center", href: `/${params.locale}` },
    topic && { label: topic.title, href: `/${params.locale}/${topic.slug}` },
    article && { label: article.title },
  ].filter(Boolean) as { label: string; href?: string }[];

  return (
    <nav className="text-sm">
      <ol className="flex space-x-2">
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return (
            <li key={item.label} className="flex items-center text-[0.95rem] font-semibold">
              {item.href && !isLast ? (
                <Link href={item.href} className="text-neutral-500 hover:text-neutral-600">
                  {item.label}
                </Link>
              ) : (
                <span
                  className={`${
                    isLast
                      ? "text-neutral-700 font-semibold"
                      : "text-neutral-500 font-semibold"
                  }`}
                >
                  {item.label}
                </span>
              )}
              {index < breadcrumbs.length - 1 && (
                <span className="mx-2 text-gray-400">/</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
export default Breadcrumb;