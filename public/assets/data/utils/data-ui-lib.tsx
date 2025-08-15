import clsx from "clsx";
import { IDescriptionProps, IMediaProps, ISectionProps, ITableProps } from "./data-interfaces";
import parse from 'html-react-parser';
import Image from 'next/image';


/* Funcoes de Manipulacao da Descricao */
export function returnArticleDescription(description: any) {
    const isList = (obj: any): boolean => obj.items ? true : false;

    return <div className="mb-7">
        {
            description.map((desc: any, index: number) => {
                if (isList(desc))
                    return list(desc, desc.props)

                if (desc.isParagraph) {
                    const paragraphs = desc.paragraphs.map((paragraphObject: any, key: number) => {
                        const paragraph = <p key={key} className={clsx(
                            `${(desc.paragraphs.length - 1 === key) ? "" : "mb-2"}`,
                            `${paragraphObject.props?.className}`)
                        }>
                            {parse(paragraphObject.text)}
                        </p>
                        if (paragraphObject.props.box) return box(paragraph, paragraphObject.props?.box?.className)
                        return paragraph
                    })

                    if (desc.props?.box) return box(paragraphs, desc.props?.box?.className)

                    return paragraphs
                }

                if (desc.props?.box)
                    return box(<p key={index}> {parse(desc?.paragraphs[0].text)} </p>, desc.props?.box.className)

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

/* Funcoes de Manipulacao das Secoes do Artigo */
export function returnArticleSection(section: any, key?: number) {
    console.log(section)
    return <div
        key={key}
        className={clsx(
            "mb-7",
            section.props?.className
        )}>

        <h2
            style={{ fontSize: "21px" }} // "24px"
            className={clsx(
                "font-semibold text-primary",
                (section?.props?.title?.className !== undefined) ? section?.props?.title?.className : `mb-7`
            )}
        >{section.title}</h2>
        <h3>{section.subtitle}</h3>
        {
            returnArticleDescription(section.description)
        }

        {
            sectionBody(section)
        }

    </div >
}

function sectionBody(section: any, props?: ISectionProps) {
    const blocksInSection = (section.tables || [])
        .concat(section.medias || [])
        .sort((a: any, b: any) => (a.order || 0) - (b.order || 0));

    return <>
        {blocksInSection.map((item: any, index: number) => {
            const isTable = Object.prototype.hasOwnProperty.call(item, "rows");  // ou outra condição que identifique tabelas
            const isMedia = Object.prototype.hasOwnProperty.call(item, "type");   // ou outra condição que identifique mídias

            if (isTable)
                return table(item, props?.tables);

            if (isMedia)
                return media(item, props?.medias);

            return null;
        })}
    </>
}

export function table(table: any, props?: ITableProps[]) {//style={{border: "1px solid #c5c5c5", borderRadius: "10px"}}
    // console.log(table)
    return <div className={clsx(
        "w-full",
        table?.props?.className
    )}>
        <table className="w-full overflow-hidden border-separate border-spacing-0 shadow-sm rounded-lg" key={table.order}>
            <thead className="bg-gray-100">
                <tr>
                    <th className="text-left text-[0.8rem] text-secondary p-3 rounded-tl-lg">Campo</th>
                    {table?.type && <th className="text-left text-[0.8rem] text-secondary p-3">Tipo</th>}
                    <th className="text-left text-[0.8rem] text-secondary p-3 rounded-tr-lg">Descrição</th>
                </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
                {
                    table.rows.map((row: any, index: number) => {
                        if ('fields' in row) {
                            return <tr key={`row-${index}`}>
                                <td className="whitespace-nowrap text-[0.8rem]">{row.field}</td>
                                <td className="whitespace-nowrap text-[0.8rem] ">object</td>
                                <td className="" colSpan={2}>
                                    <div className="p-2">
                                        {
                                            <p className="mb-2 text-[0.8rem] text-secondary font-semibold">{row.description}</p>
                                        }
                                        <table className="w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="text-left text-[0.8rem] text-secondary">Campo</th>
                                                    {table?.type ? <th className="text-left text-[0.8rem] text-secondary">Tipo</th> : <></>}
                                                    <th className="text-left text-[0.8rem] text-secondary">Descrição</th>
                                                    {/* <th className="text-left  uppercase">Exemplo</th> */}
                                                </tr>
                                            </thead>

                                            <tbody className="divide-y divide-gray-200">
                                                {
                                                    row.fields.map((subRow: any, subIndex: number) => (
                                                        <tr key={`subrow-${index}-${subIndex}`} className="">
                                                            <td className="whitespace-nowrap text-[0.8rem]">{subRow.field}</td>
                                                            {table?.type ? <td className="whitespace-nowrap text-[0.8rem] ">{subRow.type}</td> : <></>}
                                                            <td className=" text-[0.8rem]">{subRow.description}</td>
                                                            {/* <td className="whitespace-nowrap ">{subRow.example}</td> */}
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </td>
                            </tr>
                        } else {
                            return (<tr key={`row-${index}`} className="">
                                <td className="whitespace-nowrap text-[0.8rem]">{row.field}</td>
                                {table?.type ? <td className="whitespace-nowrap text-[0.8rem] ">{row.type}</td> : <></>}
                                <td className=" text-[0.8rem]">{row.description}</td>
                                {/* <td className="whitespace-nowrap text-gray-500">{row.example}</td> */}
                            </tr>)
                        }
                    })
                }
            </tbody>
        </table>
    </div>
}

export function media(media: any, props?: IMediaProps[]) {
    // console.log(media.link)
    // const imageSrc = require(media.link);

    if (media.type === "IMAGE" || media.type === "GIF") {
        return (
            <div className="w-full">
                {returnArticleDescription(media?.description?.filter((desc: any) => desc?.props?.verticalPosition === "TOP"))}

                <div className="w-full flex justify-center mb-7">
                    <img src={media.link} key={media.order} className="border border-gray-300" />
                    {/* <Image
                        src={media.link} // ex.: "/images/foto.png"
                        width={800}
                        height={600}
                        className="border border-gray-300"
                        alt="Descrição"
                    /> */}
                </div>

                {returnArticleDescription(media?.description?.filter((desc: any) => desc?.props?.verticalPosition === "BOTTOM"))}
            </div>
        );
    }

    if (media.type === "VIDEO") {
        return <>Video Not Found</>
    }
}

/* Funcoes de utilidades gerais */
function box(body: any, className?: any) {// borderRadius: "0.700rem",
    return <div
        style={{ borderRadius: "0.6rem", padding: "1.25rem 1.25rem", fontWeight: "500" }}
        // className={clsx(, className)}
        className={clsx(
            "border border-gray-300",
            (className !== undefined) ? className : `mb-10`
        )}
    >{body}</div>
}

function list(listagemObject: any, props?: any) {
    const items = listagemObject.items.map((text: string, key: number) => <li style={{ fontWeight: "500" }}>{parse(text)}</li>)
    const listText = <p className="text-stone-900" style={{ marginBottom: "1rem", fontWeight: "500" }}>{listagemObject.text}</p>

    if (props.isUl) {
        return (
            <div className={clsx("mb-7", listagemObject?.props?.className)}>
                {listText}
                <ul className="pl-5 text-stone-900 custom-disc">
                    {items}
                </ul>
            </div>)
    } else {
        return (
            <div className={clsx("mb-7", listagemObject?.props?.className)}>
                {listText}
                <ol className="list-inside list-decimal pl-5 text-stone-900">
                    {items}
                </ol>
            </div>)
    }
}