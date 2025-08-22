import clsx from "clsx";
import { IDescriptionProps, IMediaProps, ISectionProps, ITableProps } from "./data-interfaces";
import parse from 'html-react-parser';
import Image from 'next/image';
import { useState } from "react";


/* Funcoes de Manipulacao da Descricao */
export function returnArticleDescription(description: any) {
    const isList = (obj: any): boolean => obj.items ? true : false;

    return (

        <div className="mb-7">
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
    );
}


/* Funcoes de Manipulacao das Secoes do Artigo */
export function returnArticleSection(section: any, key?: number) {
    return <div
        key={key}
        id={section.slug}
        className={clsx(
            "mb-7",
            section.props?.className
        )}>

        <h2
            style={{ fontSize: "21px" }} // "24px"
            id={section.title}
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
        <table className="w-full overflow-hidden border-separate border-spacing-0 rounded-lg" key={table.order}>
            <thead className="bg-gray-100">
                <tr>
                    <th className="text-left text-[0.8rem] text-secondary p-3 rounded-tl-lg" style={{ width: table?.type ? "33.33%" : "30%" }}>Campo</th>
                    {table?.type && <th className="text-left text-[0.8rem] text-secondary p-3" style={{ width: table?.type ? "33.33%" : "" }}>Tipo</th>}
                    <th className="text-left text-[0.8rem] text-secondary p-3 rounded-tr-lg" style={{ width: table?.type ? "33.33%" : "70%" }}>Descrição</th>
                </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
                {
                    table.rows.map((row: any, index: number) => {
                        if ('fields' in row) {
                            return <tr key={`row-${index}`}>
                                <td className="whitespace-nowrap text-[0.8rem]">{row.field}</td>
                                {table?.type ? <td className="whitespace-nowrap text-[0.8rem] ">object</td> : <></>}
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

    if (media.type === "JSON") {
        return formatJsonDisplay(media);
    };
    if (media.type === "IMAGE" || media.type === "GIF") {
        return (
            <div className="w-full">
                {returnArticleDescription(media?.description?.filter((desc: any) => desc?.props?.verticalPosition === "TOP"))}

                <div className="w-full flex justify-center mb-7">
                    <img src={media.link} key={media.order} className={media.props?.className} />
                </div>

                {returnArticleDescription(media?.description?.filter((desc: any) => desc?.props?.verticalPosition === "BOTTOM"))}
            </div>
        );
    }

    if (media.type === "VIDEO") {
        return <>Video Not Found</>
    }
}


export function JSON() {
    return <></>
}
/* Funcoes de utilidades gerais */
function box(body: any, className?: any) {// borderRadius: "0.700rem",
    return <div
        style={{ borderRadius: "0.6rem", padding: "1.25rem 1.25rem" }}
        // className={clsx(, className)}
        className={clsx(
            "border border-gray-300",
            (className !== undefined) ? className : `mb-10`
        )}
    >{body}</div>
}

function list(listagemObject: any, props?: any) {
    const items = listagemObject.items.map((text: string, key: number) => <li style={{ fontWeight: "500" }}>{parse(text)}</li>)
    const listText = <p className="text-stone-900" style={{ marginBottom: "1rem", fontWeight: "500" }}>{parse(listagemObject.text)}</p>

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

function formatJsonDisplay(media: any) {
    try {
        const jsonObj = window.JSON.parse(media.json);

        const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
            navigator.clipboard.writeText(window.JSON.stringify(jsonObj, null, 2));
            const button = e.currentTarget;
            const originalText = button.textContent;
            button.textContent = 'Copiado';

            setTimeout(() => {
                if (button) button.textContent = originalText || 'Copiar';
            }, 2000);
        };

        return (
            <div className="relative">
                {/* Top Description */}
                {returnArticleDescription(
                    media?.description?.filter(
                        (desc: any) => desc?.props?.verticalPosition === 'TOP'
                    )
                )}

                <div
                    style={{
                        position: 'relative',
                        fontSize: '0.875rem',
                        padding: '1.25rem',
                        borderRadius: '0.5rem',
                        borderWidth: '1px',
                        borderColor: '#333',
                        background: '#1E1E1E',
                        color: '#D4D4D4',
                        overflow: 'auto',
                    }}
                >
                    <div>
                        <div
                            style={{
                                position: 'absolute',
                                top: '0.5rem',
                                left: '1rem',
                                fontSize: '0.75rem',
                                color: '#AAAAAA',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                fontWeight: 600,
                            }}
                        >
                            JSON
                        </div>

                        <button
                            onClick={handleCopy}
                            style={{
                                position: 'absolute',
                                top: '0.5rem',
                                right: '1rem',
                                fontSize: '0.75rem',
                                color: '#CCCCCC',
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                padding: '0.25rem 0.5rem',
                                border: 'none',
                                borderRadius: '9999px',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s ease-in-out',
                            }}
                        >
                            Copiar
                        </button>
                    </div>

                    <pre
                        style={{
                            marginTop: '1.5rem',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                        }}
                    >
                        <code>{window.JSON.stringify(jsonObj, null, 2)}</code>
                    </pre>
                </div>

                {/* Bottom Description */}
                {returnArticleDescription(
                    media?.description?.filter(
                        (desc: any) => desc?.props?.verticalPosition === 'BOTTOM'
                    )
                )}
            </div>
        );
    } catch (e: any) {
        return (
            <div
                style={{
                    backgroundColor: '#FFECEC',
                    color: '#D00',
                    padding: '16px',
                    borderRadius: '8px',
                    border: '1px solid #FCC',
                }}
            >
                JSON inválido: {e.message}
            </div>
        );
    }
}
