import { PropsWithChildren } from 'react'

import AuthLayout from '@/layouts/auth-layout'

const Page = ({ children }: PropsWithChildren) => {
  return <AuthLayout>{children}</AuthLayout>
}

export default Page
