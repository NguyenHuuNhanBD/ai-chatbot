'use client'
import { useEffect } from 'react'

import clsx from 'clsx'

import useGlobalLoaderStore from '@/stores/global-loader'

import styles from './styles.module.css'

const GlobalLoader = () => {
  const { isLoading } = useGlobalLoaderStore()
  useEffect(() => {
    if (isLoading) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [isLoading])

  if (!isLoading) return null

  return (
    <section className='fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-gray-800/20 backdrop-blur-sm z-[9999999]'>
      <span className={clsx(styles['loader'])} />
    </section>
  )
}

export default GlobalLoader
