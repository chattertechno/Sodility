import type { ReactNode } from 'react'

export interface Children {
  children: ReactNode,
  isAuth:boolean,
  userRole: string | undefined,
  isLoading : boolean
}

export type LayoutProps = {
  title: string
} & Children
