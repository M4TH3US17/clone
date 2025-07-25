'use client'

import clsx from "clsx";
import { FC } from "react";
import { ArticleContent } from "./content";

export const ArticleEstructure: FC<{ article: any }> = ({ article }) => {

    return <main className="bg-neutral min-h-screen flex-[1] text-primary">
        <ArticleContent article={article} />
        <ArticleSummary sections={article.sections} />
    </main>
}

const ArticleSummary: FC<{ sections: any[] }> = ({ sections }) => {

    const handleScrollToSectionByID = (idSection: string) => {
        console.log("Scrollar a pagina ate a secao de ID " + idSection)
    }

    return <aside>
        <ul>
            {sections.map((summaryItem, index: number) => <li
                    key={index}
                    onClick={() => handleScrollToSectionByID(summaryItem.idSection)}
                    className={clsx("")}
                >
                    {summaryItem.titleSection}
                </li>)}
        </ul>
    </aside>
}