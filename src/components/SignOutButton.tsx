// src/app/components/SignOutButton.tsx
'use client'

import { signOut } from 'next-auth/react'
import { Button } from './ui/button'

export default function SignOutButton() {
  return (
    <Button onClick={() => signOut()} variant="outline">
      Sign Out
    </Button>
  )
}
