'use client'

import { useRef, useState } from 'react'

import { XIcon } from 'lucide-react'
import Image from 'next/image'

import { PromptInputSubmit } from '@/components/elements/prompt-input'
import { ArrowUpIcon, PaperclipIcon } from '@/components/icons'
import ModelSelector from '@/components/model-selector'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { chatModels } from '@/lib/constants'
import { ChatModel } from '@/lib/types'

type PreviewFile = {
  file: File
  url: string
}

const MultimodalInput = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [images, setImages] = useState<PreviewFile[]>([])
  const [openModels, setOpenModels] = useState(false)
  const [selectedModel, setSelectedModel] = useState<ChatModel>(chatModels[0])
  // chọn file
  const handleSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newFiles: PreviewFile[] = Array.from(files).map((file) => ({
      file,
      url: URL.createObjectURL(file)
    }))

    setImages((prev) => [...prev, ...newFiles])

    e.target.value = ''
  }

  const removeImage = (index: number) => {
    setImages((prev) => {
      const clone = [...prev]
      URL.revokeObjectURL(clone[index].url)
      clone.splice(index, 1)
      return clone
    })
  }

  return (
    <section className='w-full border border-input rounded-[12px] p-3 h-auto hover:border-ring dark:hover:border-ring transition-all duration-300 ease-in-out space-y-2'>
      {/* Hidden input */}
      <input ref={fileInputRef} type='file' accept='image/*' multiple className='hidden' onChange={handleSelectFiles} />

      {/* Preview images */}
      {images.length > 0 && (
        <section className='flex gap-2 flex-wrap'>
          {images.map((img, index) => (
            <div
              key={img.url}
              className='relative w-16 h-16 rounded-lg overflow-hidden border fade-in animate-in duration-200'
            >
              <img src={img.url} alt='preview' className='w-full h-full object-cover' />

              {/* remove btn */}
              <button
                onClick={() => removeImage(index)}
                className='absolute top-1 right-1 bg-black/60 text-white rounded-full p-[2px] hover:bg-black'
              >
                <XIcon size={12} />
              </button>
            </div>
          ))}
        </section>
      )}

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
      />

      {/* Bottom bar */}
      <section className='flex items-center gap-2 justify-between'>
        <section className='flex items-center gap-2'>
          <Button
            className='aspect-square size-8 rounded-[6px] p-1 transition-colors hover:bg-accent'
            data-testid='attachments-button'
            onClick={(e) => {
              e.preventDefault()
              fileInputRef.current?.click()
            }}
            variant='ghost'
          >
            <PaperclipIcon size={14} />
          </Button>
          <Button
            className='rounded-[6px] px-2 py-1 transition-colors hover:bg-accent flex items-center gap-2'
            data-testid='attachments-button'
            onClick={() => {
              setOpenModels(true)
            }}
            variant='ghost'
          >
            <Image
              alt={`${selectedModel.name} logo`}
              className='size-3 dark:invert'
              height={12}
              src={`https://models.dev/logos/${selectedModel.provider}.svg`}
              unoptimized
              width={12}
            />
            <p className='text-[14px]'>{selectedModel.name}</p>
          </Button>
        </section>

        <PromptInputSubmit
          className='size-8 rounded-full bg-primary text-primary-foreground transition-colors duration-200 hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground'
          data-testid='send-button'
        >
          <ArrowUpIcon size={14} />
        </PromptInputSubmit>
      </section>
      <ModelSelector
        openModel={openModels}
        onOpenModelChange={setOpenModels}
        selectedModel={selectedModel}
        onSelectModel={setSelectedModel}
      />
    </section>
  )
}

export default MultimodalInput
