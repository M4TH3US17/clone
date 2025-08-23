import clsx from "clsx"
import { FC } from "react"
import parse from 'html-react-parser';
import { Box } from "./blocks/box";
import { List } from "./blocks/list";


export const ArticleDescription: FC<{ description: any }> = ({ description }) => {
    const isList = (obj: any): boolean => obj.items ? true : false;

    return <div className="mb-7">
        {
            description.map((desc: any, index: number) => {
                if (isList(desc)) {
                    return <List listagemObject={desc} props={desc.props} />
                }

                if (desc.isParagraph) {
                    const paragraphs = desc.paragraphs.map((paragraphObject: any, key: number) => {
                        const paragraph = <p key={key} className={clsx(
                            `${(desc.paragraphs.length - 1 === key) ? "" : "mb-2"}`,
                            `${paragraphObject.props?.className}`)
                        }>
                            {parse(paragraphObject.text)}
                        </p>
                        if (paragraphObject.props.box) {
                            return <Box className={paragraphObject.props?.box?.className} body={paragraph} />
                        }
                        return paragraph
                    })

                    if (desc.props?.box) {
                        return <Box className={desc.props?.box?.className} body={paragraphs} />
                    }
                    return paragraphs
                }

                if (desc.props?.box) {
                    return <Box className={desc.props?.box.className} body={parse(desc?.paragraphs[0].text)} />
                }

                return <p
                    key={index}
                    className={clsx(
                        (desc?.paragraphs[0].props?.className !== undefined) ? desc?.paragraphs[0].props?.className : `mb-2`
                    )}
                > {parse(desc?.paragraphs[0].text)} </p>
            })
        }
    </div>
}