import { GoogleIcon, TwitterXIcon } from '@/icons/layout'
import type { SocialAuthProvider } from './types'

export const socialProviders: SocialAuthProvider[] = [
  {
    id: 'google',
    name: 'Google',
    icon: GoogleIcon,
    iconClass: 'size-5',
  },
  {
    id: 'x',
    name: 'X',
    icon: TwitterXIcon,
    iconClass: 'size-5 fill-current',
  },
]

export const socialAuthData = socialProviders
