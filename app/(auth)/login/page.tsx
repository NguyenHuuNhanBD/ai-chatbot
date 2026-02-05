'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { AuthForm } from '@/components/auth-form'
import { SubmitButton } from '@/components/submit-button'
import { formHelper } from '@/lib/helpers'
import { LoginFormSchema, getLoginSchema } from '@/lib/helpers/schemas.helper'
import { LoginPayload } from '@/lib/types'
import { AuthService } from '@/services/auth.service'
import useGlobalLoaderStore from '@/stores/global-loader'

export default function LoginPage() {
  const formSchema = getLoginSchema()
  const { startLoading, stopLoading } = useGlobalLoaderStore()
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: formHelper.getDefaultValuesLogin(),
    mode: 'all'
  })

  // Upsert mutation
  const loginMutation = useMutation({
    mutationFn: (payload?: LoginPayload) => {
      // startLoading()
      return AuthService.login(payload)
    },
    onSettled: () => {
      // stopLoading()
    },
    onSuccess: (res) => {
      const isSuccess = res?.data
      if (isSuccess) {
        toast.success('Thanh cong')
      }
    }
  })

  const handleSubmit = (values: LoginFormSchema) => {
    loginMutation.mutate(values)
  }

  return (
    <section className='flex h-dvh w-screen items-start justify-center bg-background pt-12 md:items-center md:pt-0'>
      <section className='flex w-full max-w-md flex-col gap-12 overflow-hidden rounded-2xl'>
        <AuthForm form={form} onSubmit={handleSubmit} authType='LOGIN'>
          <SubmitButton isLoading={loginMutation.isPending} isDisabled={!form.formState.isValid}>
            Sign in
          </SubmitButton>
        </AuthForm>
      </section>
    </section>
  )
}
