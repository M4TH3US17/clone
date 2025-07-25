import { FC } from "react";

export const ArticleContent: FC<{ sections: any[] }> = ({ sections }) => {

    return <div className="">
        {JSON.stringify(sections)}
    </div>
}