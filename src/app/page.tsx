import  {NavBar}  from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <NavBar />
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-8">Welcome to Your Budget App</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Budget Tracker</CardTitle>
              <CardDescription>Manage your personal finances</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Track your expenses, set budgets, and achieve your financial goals.</p>
              <Link href="/budget-tracker">
                <Button>Go to Budget Tracker</Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Balance Tracker</CardTitle>
              <CardDescription>Manage your personal finances</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Track your expenses, set budgets, and achieve your financial goals.</p>
              <Link href="/balance">
                <Button>Go to Balance</Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Financial Resources</CardTitle>
              <CardDescription>Learn about personal finance</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Access articles and guides to improve your financial knowledge.</p>
              <Link href="/resources">
                <Button>View Resources</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

