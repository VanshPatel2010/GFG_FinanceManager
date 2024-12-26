'use client'

import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'

export function NavBar() {
  const { data: session, status } = useSession()

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">Budget App</Link>
        <div className="space-x-4">
          <Link href="/budget-tracker">Budget Tracker</Link>
          <Link href="/resources">Resources</Link>
          {status === 'authenticated' ? (
            <>
              <span>Signed in as {session.user?.email}</span>
              <Button onClick={() => signOut()}>Sign Out</Button>
              <span>Balance {session.user?.balance}</span>
            </>
          ) : (
            <Button onClick={() => signIn()}>Sign In</Button>
          )}
        </div>
      </div>
    </nav>
  )
}

