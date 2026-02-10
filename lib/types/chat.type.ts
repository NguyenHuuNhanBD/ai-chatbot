import { UIMessage } from 'ai'

export type ChatModel = {
  id: string
  name: string
  provider: string
  description: string
}
export type VisibilityType = 'private' | 'public'

export type Chat = {
  id: string
  title: string
  createdAt: Date
  userId: string
  visibility: VisibilityType
}

export type ChatHistory = {
  chats: Chat[]
  hasMore: boolean
}

type MessageMetadata = {
  createdAt: string
}

export type CustomUIDataTypes = {
  textDelta: string
  imageDelta: string
  sheetDelta: string
  codeDelta: string
  appendMessage: string
  id: string
  title: string
  clear: null
  finish: null
  'chat-title': string
}

export type ChatMessage = UIMessage<MessageMetadata, CustomUIDataTypes>

export type ParamsMessageByChatId = {
  id: string
}
