import z from 'zod'

import { eLoginFormKey } from '@/lib/enums/form.enum'

export const getLoginSchema = () =>
  z.object({
    [eLoginFormKey.Email]: z.string().nonempty({ message: 'Field can not be empty' }),
    [eLoginFormKey.Password]: z.string().nonempty({ message: 'Field can not be empty' })
  })

export type LoginFormSchema = z.infer<ReturnType<typeof getLoginSchema>>
