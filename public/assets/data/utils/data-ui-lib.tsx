import clsx from "clsx";
import { IDescriptionProps, IMediaProps, ISectionProps, ITableProps } from "./data-interfaces";
import parse from 'html-react-parser';


/* Funcoes de Manipulacao da Descricao */
export function returnArticleDescription(description: any, props?: IDescriptionProps) {
    const is_paragraph = (description.length !== 1)

    if (is_paragraph) {
        const paragraphs = description.map((paragraph: any, index: number) => <p key={index} className={`mb-2 ${props?.className}`}> {parse(paragraph.text)} </p>)
        if (props?.box) return box(paragraphs, props.box.className)
        return <div className="mb-9">{paragraphs}</div>

    } else {
        const text = parse(description[0].text)
        if (props?.box) return box(text, props.box.className)
        return <p className={`mb-9 ${props?.className}`}>{parse(description[0].text)}</p>;
    }
}

/* Funcoes de Manipulacao das Secoes do Artigo */
export function returnArticleSection(section: any, props?: ISectionProps, key?: number) {
    return <div
        key={key}
        className={clsx(
            "mb-9",
            props?.className
        )}>

        <h2
            style={{ fontSize: "24px" }}
            className="font-semibold text-primary mb-7"
        >{section.title}</h2>
        <h3>{section.subtitle}</h3>
        {
            returnArticleDescription(section.description, { box: { className: "bg-amber-500" } })
        }

        {
            sectionBody(section, props)
        }

    </div>
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

export function table(table: any, props?: ITableProps[]) {
    // console.log(props)
    return <div className="w-full overflow-x-scroll">
        <table className="w-full" key={table.order}>
            <thead className="">
                <tr>
                    <th className="text-left text-[0.8rem] text-secondary">Campo</th>
                    <th className="text-left text-[0.8rem] text-secondary">Tipo</th>
                    <th className="text-left text-[0.8rem] text-secondary">Descrição</th>
                    {/* <th className="text-left text-gray-500">Exemplo</th> */}
                </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
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
                                            <thead className=" bg-gray-100">
                                                <tr>
                                                    <th className="text-left text-[0.8rem] text-secondary">Campo</th>
                                                    <th className="text-left text-[0.8rem] text-secondary">Tipo</th>
                                                    <th className="text-left text-[0.8rem] text-secondary">Descrição</th>
                                                    {/* <th className="text-left  uppercase">Exemplo</th> */}
                                                </tr>
                                            </thead>

                                            <tbody className=" bg-white divide-y divide-gray-200">
                                                {
                                                    row.fields.map((subRow: any, subIndex: number) => (
                                                        <tr key={`subrow-${index}-${subIndex}`} className="">
                                                            <td className="whitespace-nowrap text-[0.8rem]">{subRow.field}</td>
                                                            <td className="whitespace-nowrap text-[0.8rem] ">{subRow.type}</td>
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
                                <td className="whitespace-nowrap text-[0.8rem] ">{row.type}</td>
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
    // console.log(props)
    if (media.type === "IMAGE" || media.type === "GIF") {
        return <img src={media.link} key={media.order} />
    }

    if (media.type === "VIDEO") {
        return <>Video Not Found</>
    }
}

/* Funcoes de utilidades gerais */
function box(body: any, className: any) {
    return <div
        style={{ borderRadius: "0.700rem", padding: "1.25rem 1.25rem" }}
        className={clsx("border border-gray-200 mb-10", className)}
    >{body}</div>
}

function list() {
    return <></>
}