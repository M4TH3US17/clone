
interface IBaseProps {
    className?: string
}

export interface IDescriptionProps extends IBaseProps {
    box?: IBoxProps
}

export interface IBoxProps extends IBaseProps {
}

export interface ISectionProps extends IBaseProps {
}