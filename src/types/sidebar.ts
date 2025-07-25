export type HelpCenterData = Topic[];
  
  export interface Topic {
    icon: string;
    title: string;
    slug: string;
    subtitle: string;
    quantityArticles: number;
    description: Description;
    articles: Article[];
  }
  
  export interface Article {
    title: string;
    slug: string;
    subtitle: string;
    description: Description;
    details: ArticleDetails;
    summary: SummaryItem[];
    sections: Section[];
  }
  
  export interface Description {
    texts: DescriptionText[];
  }
  
  export interface DescriptionText {
    text: string;
    links?: Link[];
  }
  
  export interface Link {
    breakpoint: string;
    text: string;
    href: string;
  }
  
  export interface ArticleDetails {
    createdAt: string; // ISO string (Date)
    createdBy: string;
  }
  
  export interface SummaryItem {
    titleSection: string;
    idSection: string;
  }
  
  export interface Section {
    idSection: string;
    title: string;
    subtitle: string;
    description: Description;
    tables?: Table[];
    medias?: Media[];
  }
  
  export interface Table {
    title: string;
    subtitle: string;
    description: Description;
    rows: TableRow[];
  }
  
  export interface TableRow {
    type: string; // Ex: 'string', 'integer', 'object', etc.
    description: string;
    example?: string; // JSON de exemplo
    field: string;
    fields?: TableRow[]; // Recursividade para objetos aninhados
  }
  
  export interface Media {
    type: 'GIF' | 'VIDEO' | 'IMAGEM' | string; // enum opcional
    title: string;
    subtitle: string;
    description: Description;
    link: string; // base64, URL, etc.
  }
  