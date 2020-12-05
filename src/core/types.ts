export interface Project {
  title: string
  description?: string
  url?: string
  customer: {
    name: string
    url: string
  }
  interval: {
    from: string
    to?: string
  }
  tags?: string[]
  links?: {title: string; url: string}[]
}