import { ReactElement } from "react"

export type SidebarSubitem = {
    title: string
    slug: string
}

export interface SidebarItem {
    iconHtml: ReactElement
    title: string
    description?: string
    hasChevron: boolean
    hasExternalLink?: boolean
    subitems?: SidebarSubitem[]
  }
  