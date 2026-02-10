import { PropsWithChildren } from 'react'

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <section className='flex h-dvh w-screen items-start justify-center bg-background pt-12 md:items-center md:pt-0'>
      <section className='flex w-full max-w-md flex-col gap-12 overflow-hidden rounded-2xl'>{children}</section>
    </section>
  )
}

export default AuthLayout
