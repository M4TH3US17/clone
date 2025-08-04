"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useDataStore } from "@/store/dataStore";
import { ParamValue } from "next/dist/server/request/params";
import clsx from "clsx";

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
      <ol className="flex">
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return (
            <li key={item.label} className="flex items-center text-[0.95rem] font-semibold">
              {item.href && !isLast ? (
                <Link href={item.href} className="text-neutral-500 hover:text-neutral-600 lg:text-[0.8rem]" style={{fontWeight: "500"}}>
                  {item.label}
                </Link>
              ) : (
                <span
                  className={`
                    lg:text-[0.8rem]
                    ${isLast
                      ? "text-neutral-900 font-semibold"
                      : "text-neutral-500 font-semibold"
                    }`}
                    style={{fontWeight: "500"}}
                >
                  {item.label}
                </span>
              )}
              {index < breadcrumbs.length - 1 && (
                <span
                  className={clsx(
                    "mx-2 text-gray-400 lg:text-[0.8rem]",
                    
                    "text-neutral-900 font-semibold"
                  )}
                  style={{fontWeight: "500"}}
                >/</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
export default Breadcrumb;