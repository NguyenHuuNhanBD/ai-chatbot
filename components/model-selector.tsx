import React from 'react'

import { SearchAlert, SearchIcon } from 'lucide-react'
import { CheckIcon } from 'lucide-react'
import Image from 'next/image'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { modelsByProvider } from '@/lib/constants'
import { ChatModel } from '@/lib/types'

type ModelSelectorProps = {
  openModel: boolean
  onOpenModelChange: (isOpen: boolean) => void
  selectedModel: ChatModel
  onSelectModel: (model: ChatModel) => void
}
const ModelSelector = ({ openModel, onOpenModelChange, selectedModel, onSelectModel }: ModelSelectorProps) => {
  const handleSelect = (model: ChatModel) => {
    onSelectModel(model)
    onOpenModelChange(false)
  }
  return (
    <Dialog open={openModel} onOpenChange={onOpenModelChange}>
      <DialogContent className='p-0 gap-0'>
        <DialogHeader className='border-b border-b-input'>
          <section className='flex items-center justify-center p-3'>
            <SearchIcon className='size-4.5' />
            <Input
              placeholder='Search models...'
              className='
              border-0 shadow-none ring-0
              focus-visible:ring-0 focus-visible:border-0
              focus-visible:outline-none
              outline-none
              bg-transparent!
            '
            />
          </section>
          <DialogTitle className='sr-only'></DialogTitle>
          <DialogDescription className='sr-only'></DialogDescription>
        </DialogHeader>
        {/* Content */}
        <section className='flex flex-col p-3 h-75 overflow-y-auto'>
          {Object.entries(modelsByProvider).map(([key, value]) => {
            return (
              <section key={key} className='flex flex-col gap-1'>
                <p className='text-[13px]'>{key}</p>
                <article className='flex flex-col'>
                  {value.map((model) => {
                    const isSelected = selectedModel.id === model.id
                    return (
                      <section
                        key={model.id}
                        className='flex items-center justify-between p-1 hover:bg-input rounded'
                        onClick={() => {
                          handleSelect(model)
                        }}
                      >
                        <section className='flex items-center gap-2'>
                          <Image
                            alt={`${model.name} logo`}
                            className='size-3 dark:invert'
                            height={12}
                            src={`https://models.dev/logos/${model.provider}.svg`}
                            unoptimized
                            width={12}
                          />
                          <p className='text-[14px]'>{model.name}</p>
                        </section>
                        {isSelected && <CheckIcon className='size-4 text-primary shrink-0' />}
                      </section>
                    )
                  })}
                </article>
              </section>
            )
          })}
        </section>
      </DialogContent>
    </Dialog>
  )
}

export default ModelSelector
