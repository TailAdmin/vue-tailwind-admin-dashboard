import type { Component } from 'vue'

export interface SocialAuthProvider {
  id: string
  name: string
  icon: Component
  iconClass: string
}

export type { SignInFormData } from './schema'
