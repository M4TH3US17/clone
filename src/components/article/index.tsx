'use client'

import clsx from "clsx";
import { FC } from "react";
import { ArticleContent } from "./content";

export const ArticleEstructure: FC<{ article: any }> = ({ article }) => {

    return <main className={clsx(
        "bg-neutral text-primary",
        "flex min-h-screen flex-[1] relative"
    )}>
        <div className="bg-amber-500 flex justify-center w-[100%]  xl:w-[calc(100%-13rem)]">
            <ArticleContent article={article} />
        </div>
        <ArticleSummary sections={article.sections} />
    </main>
}

const ArticleSummary: FC<{ sections: any[] }> = ({ sections }) => {
    const handleScrollToSectionByID = (idSection: string) => console.log("Scrollar a pagina ate a secao de ID " + idSection)

    return <aside className={clsx(
        "fixed right-0 h-full pt-6",
        "border-l border-gray-200 w-52 hidden xl:block"
    )}>
        <h2 className="text-[0.8rem] pl-6 mb-4 font-semibold opacity-40">SUMMARY</h2>
        <ul >
            {sections.map((summaryItem, index: number) => <li
                key={index}
                onClick={() => handleScrollToSectionByID(summaryItem.idSection)}
                className={
                    clsx(
                        "cursor-pointer px-6 text-xs"
                    )
                }
            >
                {summaryItem.title}
            </li>)}
        </ul>
    </aside>
}