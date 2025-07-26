import clsx from "clsx";
import { FC } from "react";

export const ArticleContent: FC<{ article: any }> = ({ article }) => {
    console.log(article)

    return <div className={clsx(
        " bg-amber-100 w-[100%] ",
        " lg:max-w-[700px] xl:max-w-[688px]"
    )}>
        <h2 className="text-5xl text-primary font-extrabold">{article.title}</h2>
        <h3>SUBTITULO: {article.subtitle}</h3>

        {
            article.description.texts.map((textObject: any, index: number) => <p key={index}>
                PARAGRAFO {index + 1}: { textObject.text }
            </p>)
        }

        
    </div>
}
// 