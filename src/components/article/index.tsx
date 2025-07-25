'use client'

import clsx from "clsx";
import { FC } from "react";
import { ArticleContent } from "./content";

export const ArticleEstructure: FC<{ article: any }> = ({ article }) => {

    return <main className="">
        <ArticleContent sections={article.sections} />
        <ArticleSummary sections={article.sections} />
    </main>
}

const ArticleSummary: FC<{ sections: any[] }> = ({ sections }) => {
    return <aside>
        { JSON.stringify(sections) }
    </aside>
}