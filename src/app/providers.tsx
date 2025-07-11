'use client'
import { NhostReactProvider } from '@nhost/react'
import { NhostApolloProvider } from '@nhost/react-apollo'
import { nhost } from '../lib/nhost'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NhostReactProvider nhost={nhost}>
      <NhostApolloProvider nhost={nhost}>
        {children}
      </NhostApolloProvider>
    </NhostReactProvider>
  )
}