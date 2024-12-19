// // import './globals.css'
// import { Inter } from 'next/font/google'
// import { getServerSession } from 'next-auth/next'
// import { authOptions } from './api/auth/[...nextauth]/route'
// import Link from 'next/link'
// import { Button } from '@/app/components/ui/button'
// import { signOut } from 'next-auth/react'
// import SignOutButton from './components/SignOutButton'
// import { SessionProvider } from 'next-auth/react'

// const inter = Inter({ subsets: ['latin'] })

// export default async function RootLayout({
//   children
// }: {
//   children: React.ReactNode
// }) {
//   const session = await getServerSession(authOptions)

//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <nav className="bg-gray-800 text-white p-4">
//           <div className="container mx-auto flex justify-between items-center">
//             <Link href="/" className="text-xl font-bold">Budget App</Link>
//             <div className="space-x-4">
//               <Link href="/budget-tracker">Budget Tracker</Link>  
//               <Link href="/resources">Resources</Link>
//               {session ? (
//                 <>
//                   <span>Signed in as {session.user?.email}</span>
//                   <SignOutButton/>
//                   </>
                
//               ) : (
//                 <Link href="/api/auth/signin">
//                   <Button>Sign In</Button>
//                 </Link>
//               )}
//             </div>
//           </div>
//         </nav>
//         <main>{children}</main>
//       </body>
//     </html>
//   )
// }

// import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Budget Tracker',
  description: 'Manage your finances with ease',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

