import { eLoginFormKey } from '@/lib/enums'

export const formHelper = {
  getDefaultValuesLogin: () => {
    return {
      [eLoginFormKey.Email]: '',
      [eLoginFormKey.Password]: ''
    }
  }
}
