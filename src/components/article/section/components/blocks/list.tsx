import clsx from "clsx"
import { FC } from "react"
import parse from 'html-react-parser';

export const List: FC<{ listagemObject: any, props?: any }> = ({ listagemObject, props }) => {
    const items = listagemObject.items.map((text: string, key: number) => (
        <li key={key} style={{ fontWeight: "500" }}>{parse(text)}</li>
    ))
    const listText = <p className="text-stone-900" style={{ marginBottom: "1rem", fontWeight: "500" }}>{parse(listagemObject.text)}</p>

    return (
        <div className={clsx("mb-7", listagemObject?.props?.className)}>
            {listText}
            {props?.isUl ? (
                <ul className="pl-5 text-stone-900 custom-disc">
                    {items}
                </ul>
            ) : (
                <ol className="list-inside list-decimal pl-5 text-stone-900">
                    {items}
                </ol>
            )}
        </div>
    )
}