import clsx from "clsx";
import { FC } from "react";
import { returnArticleDescription, returnArticleSection } from "../../../../public/assets/data/utils/data-ui-lib";
import Breadcrumb from "@/app/[locale]/breadCrumb";

export const ArticleContent: FC<{ article: any }> = ({ article }) => {

    return <div className={clsx(
        "bg-amber-50 lg:max-w-[688px]",
    )}>
        <Breadcrumb />
        <h2 className="text-5xl mt-6 text-primary font-extrabold mb-9 leading-13">{article.title}</h2>

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