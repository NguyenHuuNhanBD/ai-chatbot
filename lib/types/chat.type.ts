export type Chat = {
  id: string
  title: string
  createdAt: Date
  userId: string
  visibility: 'private' | 'public'
}

export type ChatHistory = {
  chats: Chat[]
  hasMore: boolean
}
