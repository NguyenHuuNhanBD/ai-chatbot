'use client'

import React, { useEffect, useMemo, useState } from 'react'

import { CheckIcon, SearchIcon } from 'lucide-react'
import Image from 'next/image'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { modelsByProvider } from '@/lib/constants'
import { ChatModel } from '@/lib/types'

type ModelSelectorProps = {
  openModel: boolean
  onOpenModelChange: (isOpen: boolean) => void
  selectedModel: ChatModel
  onSelectModel: (model: ChatModel) => void
}

const ModelSelector = ({ openModel, onOpenModelChange, selectedModel, onSelectModel }: ModelSelectorProps) => {
  const [search, setSearch] = useState('')

  const handleSelect = (model: ChatModel) => {
    onSelectModel(model)
    onOpenModelChange(false)
  }

  // ⭐ Filter logic
  const filteredModels = useMemo(() => {
    const keyword = search.trim().toLowerCase()

    if (!keyword) return modelsByProvider

    const result: typeof modelsByProvider = {}

    Object.entries(modelsByProvider).forEach(([provider, models]) => {
      const filtered = models.filter((m) => `${m.name} ${m.id} ${m.provider}`.toLowerCase().includes(keyword))

      if (filtered.length > 0) {
        result[provider] = filtered
      }
    })

    return result
  }, [search])

  const isEmpty = Object.keys(filteredModels).length === 0

  useEffect(() => {
    if (!openModel) {
      const id = setTimeout(() => {
        setSearch('')
      }, 150)

      return () => clearTimeout(id)
    }
  }, [openModel])

  return (
    <Dialog open={openModel} onOpenChange={onOpenModelChange}>
      <DialogContent className='p-0 gap-0'>
        {/* Header */}
        <DialogHeader className='border-b border-b-input'>
          <section className='flex items-center gap-2 p-3'>
            <SearchIcon className='size-4 shrink-0' />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search models...'
              className='
                border-0 shadow-none ring-0
                focus-visible:ring-0 focus-visible:border-0
                outline-none bg-transparent!
              '
            />
          </section>

          <DialogTitle className='sr-only' />
          <DialogDescription className='sr-only' />
        </DialogHeader>

        {/* Content */}
        <section className='flex flex-col p-3 h-75 overflow-y-auto'>
          {isEmpty && <div className='text-sm text-muted-foreground text-center py-8'>No models found</div>}

          {Object.entries(filteredModels).map(([provider, models]) => (
            <section key={provider} className='flex flex-col gap-1 mb-2'>
              <p className='text-[13px] text-muted-foreground'>{provider}</p>

              <article className='flex flex-col'>
                {models.map((model) => {
                  const isSelected = selectedModel.id === model.id

                  return (
                    <section
                      key={model.id}
                      onClick={() => handleSelect(model)}
                      className='
                        flex items-center justify-between
                        p-1 rounded cursor-pointer
                        hover:bg-input
                        transition-colors
                      '
                    >
                      <section className='flex items-center gap-2'>
                        <Image
                          alt={`${model.name} logo`}
                          src={`https://models.dev/logos/${model.provider}.svg`}
                          width={12}
                          height={12}
                          className='size-3 dark:invert'
                          unoptimized
                        />

                        <p className='text-[14px]'>{model.name}</p>
                      </section>

                      {isSelected && <CheckIcon className='size-4 text-primary shrink-0' />}
                    </section>
                  )
                })}
              </article>
            </section>
          ))}
        </section>
      </DialogContent>
    </Dialog>
  )
}

export default ModelSelector
