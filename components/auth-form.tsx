import Link from 'next/link'
import { UseFormReturn } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ROUTES } from '@/lib/constants'
import { eLoginFormKey } from '@/lib/enums'
import { LoginFormSchema } from '@/lib/helpers/schemas.helper'

type AuthType = 'LOGIN' | 'REGISTER'

type AuthFormProps = {
  form: UseFormReturn<LoginFormSchema>
  authType?: AuthType
  onSubmit: (values: LoginFormSchema) => void
  children?: React.ReactNode
}
export function AuthForm({ form, authType = 'LOGIN', onSubmit, children }: AuthFormProps) {
  const isLoginType = authType === 'LOGIN'

  return (
    <section className='flex flex-col gap-12'>
      {/* Title */}
      <div className='flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16'>
        <h3 className='font-semibold text-xl dark:text-zinc-50'>{isLoginType ? 'Sign In ' : 'Sign up'}</h3>
        <p className='text-gray-500 text-sm dark:text-zinc-400'>
          {isLoginType ? 'Use your email and password to sign in' : 'Create an account with your email and password'}
        </p>
      </div>

      <section className='flex flex-col gap-8'>
        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4 px-4 sm:px-16'>
            {/* Email */}
            <FormField
              control={form.control}
              name={eLoginFormKey.Email}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input placeholder='user@chatbot.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name={eLoginFormKey.Password}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type='password' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {children}
          </form>
        </Form>

        {/* Link */}
        <p className='text-center text-gray-600 text-sm dark:text-zinc-400'>
          {isLoginType ? "Don't have an account? " : 'Already have an account? '}
          <Link
            className='font-semibold text-gray-800 hover:underline dark:text-zinc-200'
            href={isLoginType ? `/${ROUTES.AUTH.REGISTER}` : `/${ROUTES.AUTH.LOGIN}`}
          >
            {isLoginType ? 'Sign up' : 'Sign in'}
          </Link>
          {isLoginType ? ' for free.' : ' instead.'}
        </p>
      </section>
    </section>
  )
}
