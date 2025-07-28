
interface IBaseProps {
    className?: string
}

export interface IDescriptionProps extends IBaseProps {
    box?: IBoxProps
}

export interface IBoxProps extends IBaseProps {
}

export interface ISectionProps extends IBaseProps {
    box?: IBoxProps
    medias?: IMediaProps[]
    tables?: IMediaProps[]
}

export interface IMediaProps extends IBaseProps {
    order?: number
    box?: IBoxProps
}

export interface ITableProps extends IBaseProps {
    order?: number
    box?: IBoxProps
}