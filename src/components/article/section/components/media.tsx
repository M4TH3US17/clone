
import { IMediaProps } from "@/publicassets/data/utils/data-interfaces"
import clsx from "clsx"
import { FC } from "react"
import { ArticleDescription } from "./article-description";
import { formatJsonDisplay } from "@/publicassets/data/utils/data-utils";

export const Media: FC<{ media: any, props?: IMediaProps[] }> = ({ media, props }) => {
    console.log(media)
    if (media.type === "JSON") {
        return formatJsonDisplay(media);
    };

    if (media.type === "IMAGE" || media.type === "GIF") {
        return (
            <div className="w-full">
                <ArticleDescription description={media?.description?.filter((desc: any) => desc?.props?.verticalPosition === "TOP")} />

                <div className="w-full flex justify-center mb-7">
                    <img src={media.link} key={media.order} className={media.props?.className} />
                </div>

                <ArticleDescription description={media?.description?.filter((desc: any) => desc?.props?.verticalPosition === "BOTTOM")} />
            </div>
        );
    }

    if (media.type === "VIDEO") {
        return <>Video Not Found</>
    }
}

