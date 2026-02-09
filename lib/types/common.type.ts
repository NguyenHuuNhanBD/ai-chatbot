export type ApiResponse<T> = {
  data?: T
  message?: string
  statusCode?: number
  status?: string | number
  errorCode?: string
}

export type SidebarMenuT = {
  title: string
  url: string
  icon?: React.FC<React.SVGProps<SVGSVGElement>>
  isActive?: boolean
  items?: {
    title: string
    url: string
  }[]
}
