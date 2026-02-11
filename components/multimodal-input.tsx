'use client'

import { useState } from 'react'

import { UseChatHelpers } from '@ai-sdk/react'
import { useLocalStorage } from 'usehooks-ts'

import { PromptInputSubmit } from '@/components/elements/prompt-input'
import ModelSelector from '@/components/model-selector'
import ModelSelectorLogo from '@/components/model-selector-logo'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { CHAT_MODELS } from '@/lib/constants'
import { ChatMessage } from '@/lib/types'

type MultimodalInputProps = {
  selectedModelId: string
  onModelChange: (modelId: string) => void
  promptText: string
  onChangePromptText: (prompText: string) => void
  status: UseChatHelpers<ChatMessage>['status']
  onSendMessage: UseChatHelpers<ChatMessage>['sendMessage']
}
const MultimodalInput = ({
  selectedModelId,
  onModelChange,
  promptText,
  onChangePromptText,
  status,
  onSendMessage
}: MultimodalInputProps) => {
  // Model
  const [openModels, setOpenModels] = useState(false)
  const selectedModel = CHAT_MODELS.find((model) => model.id === selectedModelId)
  // Input
  const [promptTextStorage, setPromptTextStorage] = useLocalStorage<string>('promptText', '')

  const handleSubmit = () => {
    onSendMessage({
      role: 'user',
      parts: [
        {
          type: 'text',
          text: promptText
        }
      ]
    })
    setPromptTextStorage('')
    onChangePromptText('')
  }
  return (
    <section className='w-full border border-input rounded-[12px] p-3 h-auto hover:border-ring dark:hover:border-ring transition-all duration-300 ease-in-out space-y-2'>
      {/* Textarea */}
      <Textarea
        placeholder='Send a message'
        className='
          h-20 overflow-y-auto
          border-0 shadow-none ring-0
          focus-visible:ring-0 focus-visible:border-0
          focus-visible:outline-none
          outline-none
          bg-transparent!
          resize-none
        '
        value={promptText || promptTextStorage}
        onChange={(e) => {
          onChangePromptText(e.target.value)
          setPromptTextStorage(e.target.value)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit()
          }
        }}
      />

      {/* Bottom bar */}
      <section className='flex items-center gap-2 justify-between'>
        <section className='flex items-center gap-2'>
          {/* Select model */}
          <Button
            className='rounded-[6px] px-2 py-1 transition-colors hover:bg-accent flex items-center gap-2'
            data-testid='attachments-button'
            onClick={() => {
              setOpenModels(true)
            }}
            variant='ghost'
          >
            <ModelSelectorLogo provider={selectedModel?.provider || ''} className='size-3 dark:invert' />
            <p className='text-[14px]'>{selectedModel?.name}</p>
          </Button>
        </section>

        <PromptInputSubmit
          className='size-8 rounded-full bg-primary text-primary-foreground transition-colors duration-200 hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground cursor-pointer'
          // disabled={!promptTextStorage.trim()}
          status={status}
          onClick={handleSubmit}
        />
      </section>

      {/* Modal selector */}
      <ModelSelector
        openModel={openModels}
        onOpenModelChange={setOpenModels}
        selectedModelId={selectedModelId}
        onModelChange={onModelChange}
      />
    </section>
  )
}

export default MultimodalInput
