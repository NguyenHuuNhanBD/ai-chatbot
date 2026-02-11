'use client'

import { useEffect, useMemo, useState } from 'react'

import { CheckIcon, SearchIcon } from 'lucide-react'

import ModelSelectorLogo from '@/components/model-selector-logo'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { MODELS_BY_PROVIDER } from '@/lib/constants'
import cookieHelper from '@/lib/helpers/cookie.helper'

type ModelSelectorProps = {
  openModel: boolean
  onOpenModelChange: (isOpen: boolean) => void
  selectedModelId: string
  onModelChange: (id: string) => void
}

const ModelSelector = ({ openModel, onOpenModelChange, selectedModelId, onModelChange }: ModelSelectorProps) => {
  const [search, setSearch] = useState('')

  const handleSelectedModel = (id: string) => {
    onModelChange(id)
    onOpenModelChange(false)
    cookieHelper.setValueIntoKey('chat-model', id)
  }

  // ⭐ Filter logic
  const filteredModels = useMemo(() => {
    const keyword = search.trim().toLowerCase()

    if (!keyword) return MODELS_BY_PROVIDER

    const result: typeof MODELS_BY_PROVIDER = {}

    Object.entries(MODELS_BY_PROVIDER).forEach(([provider, models]) => {
      const filtered = models.filter((m) => `${m.name} ${m.provider}`.toLowerCase().includes(keyword))

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
                  const isSelected = selectedModelId === model.id
                  return (
                    <section
                      key={model.id}
                      onClick={() => handleSelectedModel(model.id)}
                      className='
                        flex items-center justify-between
                        p-1 rounded cursor-pointer
                        hover:bg-input
                        transition-colors
                      '
                    >
                      <section className='flex items-center gap-2'>
                        <ModelSelectorLogo provider={model.provider} className='size-3 dark:invert' />
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
