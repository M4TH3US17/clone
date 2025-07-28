import clsx from "clsx";
import { FC } from "react";
import { returnArticleDescription, returnArticleSection } from "../../../../public/assets/data/utils/data-ui-lib";

export const ArticleContent: FC<{ article: any }> = ({ article }) => {
    // console.log(article)

    return <div className={clsx(
        "w-[100%] py-12",
        " lg:max-w-[700px] xl:max-w-[688px]"
    )}>
        <h2 className="text-5xl text-primary font-extrabold mb-9 leading-13">{article.title}</h2>

        {
            returnArticleDescription(article.description, {
                box: { className: "bg-amber-500 mb-7" }
            })
        }

        {
            article.sections.map((section: any, index: number) => returnArticleSection(section))
        }


    </div>
}
// bg-amber-100 