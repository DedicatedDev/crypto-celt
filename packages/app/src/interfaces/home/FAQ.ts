export interface FAQLink {
    title: string
    url: string
}
export interface FAQItem {
    title: string,
    content: string[]
    links: FAQLink[] 
}
