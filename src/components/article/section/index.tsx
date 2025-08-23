import clsx from "clsx"
import { FC } from "react"
import { ArticleDescription } from "./components/article-description"
import { ISectionProps } from "@/publicassets/data/utils/data-interfaces"
import { Table } from "./components/table"
import { Media } from "./components/media"

export const ArticleSection: FC<{ section: any, key?: number }> = ({ section, key }) => {

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
        <ArticleDescription description={section.description} />
        <SectionBody section={section} />

    </div >
}

export const SectionBody: FC<{ section: any, props?: ISectionProps }> = ({ section, props }) => {
    const blocksInSection = (section.tables || [])
        .concat(section.medias || [])
        .sort((a: any, b: any) => (a.order || 0) - (b.order || 0));

    return <>
        {blocksInSection.map((item: any, index: number) => {
            const isTable = Object.prototype.hasOwnProperty.call(item, "rows");  // ou outra condição que identifique tabelas
            const isMedia = Object.prototype.hasOwnProperty.call(item, "type");   // ou outra condição que identifique mídias

            if (isTable)
                return <Table table={item} props={props?.tables} />

            if (isMedia)
                return <Media media={item} props={props?.tables} />

            return <></>;
        })}
    </>
}
