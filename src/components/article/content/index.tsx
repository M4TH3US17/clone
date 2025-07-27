import clsx from "clsx";
import { FC } from "react";

export const ArticleContent: FC<{ article: any }> = ({ article }) => {
    console.log(article)

    return <div className={clsx(
        "w-[100%] py-12",
        " lg:max-w-[700px] xl:max-w-[688px]"
    )}>
        <h2 className="text-5xl text-primary font-extrabold mb-9 leading-13">{article.title}</h2>
        {/* {<h3 className="mb-10">SUBTITULO: {article.subtitle}</h3>} */}

        {
            article.descriptio.map((textObject: any, index: number) => <p key={index}>
                PARAGRAFO {index + 1}: { textObject.text }
            </p>)
        }

        
    </div>
}
// bg-amber-100 