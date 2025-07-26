import clsx from "clsx";
import { FC } from "react";

export const ArticleContent: FC<{ article: any }> = ({ article }) => {
    console.log(article)

    return <div className={clsx(
        "w-[100%] lg:w-[50%] bg-amber-100"
    )}>
        <h2>TITULO: {article.title}</h2>
        <h3>SUBTITULO: {article.subtitle}</h3>

        {
            article.description.texts.map((textObject: any, index: number) => <p key={index}>
                PARAGRAFO {index + 1}: { textObject.text }
            </p>)
        }

        
    </div>
}