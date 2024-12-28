
'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Budget, Category, Expense } from '@/types/budget'
import { NavBar } from '../components/NavBar'
import { signIn } from 'next-auth/react'
import styles from '@/styles/BudgetTracker.module.css'
import { Trash2 } from 'lucide-react'

export default function BudgetTracker() {
  const { data: session, status } = useSession()
  const [budget, setBudget] = useState<Budget | null>(null)
  const [loading, setLoading] = useState(true)
  const [newCategory, setNewCategory] = useState<Omit<Category, 'expenses'>>({ name: '', allocation: 0 })
  const [newExpense, setNewExpense] = useState<Omit<Expense, 'date'> & { categoryIndex: number }>({ categoryIndex: 0, description: '', amount: 0 })
  const [newBudgetAmount, setNewBudgetAmount] = useState<number>(0)

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.id) {
      fetchBudget()
    }
  }, [status, session])

  const fetchBudget = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/budget')
      if (!res.ok) {
        if (res.status === 404) {
          setBudget({ userId: session!.user!.id, totalBudget: 0, categories: [] })
        } else {
          throw new Error('Failed to fetch budget')
        }
      } else {
        const data = await res.json()
        setBudget(data)
      }
    } catch (error) {
      console.error('Error fetching budget:', error)
      setBudget({ userId: session!.user!.id, totalBudget: 0, categories: [] })
    } finally {
      setLoading(false)
    }
  }

  //chart
  
  const createOrUpdateBudget = async (updatedBudget: Budget) => {
    if (!budget) return
    try {
      setLoading(true)
      const method = budget._id ? 'PUT' : 'POST'
      const res = await fetch('/api/budget', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBudget)
      })
      if (!res.ok) {
        throw new Error('Failed to update budget')
      }
      const data = await res.json()
      setBudget(data)
    } catch (error) {
      console.error('Error updating budget:', error)
    } finally {
      setLoading(false)
    }
  }

  const addCategory = () => {
    if (!budget) return
    const updatedBudget: Budget = {
      ...budget,
      categories: [...budget.categories, { ...newCategory, expenses: [] }]
    }
    setBudget(updatedBudget)
    setNewCategory({ name: '', allocation: 0 })
    createOrUpdateBudget(updatedBudget)
  }

  const addExpense = () => {
    if (!budget) return
    const updatedBudget: Budget = {
      ...budget,
      categories: budget.categories.map((category, index) => {
        if (index === newExpense.categoryIndex) {
          return {
            ...category,
            expenses: [
              ...category.expenses,
              {
                description: newExpense.description,
                amount: newExpense.amount,
                date: new Date()
              }
            ]
          }
        }
        return category
      })
    }
    setBudget(updatedBudget)
    setNewExpense({ categoryIndex: 0, description: '', amount: 0 })
    createOrUpdateBudget(updatedBudget)
  }

  const deleteCategory = (indexToDelete: number) => {
    if (!budget) return
    const updatedBudget: Budget = {
      ...budget,
      categories: budget.categories.filter((_, index) => index !== indexToDelete)
    }
    setBudget(updatedBudget)
    createOrUpdateBudget(updatedBudget)
  }

  const addBudget = () => {
    if (!budget) return
    const updatedBudget: Budget = {
      ...budget,
      totalBudget: budget.totalBudget + newBudgetAmount
    }
    setBudget(updatedBudget)
    setNewBudgetAmount(0)
    createOrUpdateBudget(updatedBudget)
  }

  if (status === 'unauthenticated') {
    return (
      <div>
        Please sign in to access the Budget Tracker.
        <Button onClick={() => signIn()}>Sign In</Button>
      </div>
    )
  }
  
  return (
    <>
      <NavBar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Budget Tracker</h1>
        {budget && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Total Budget</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-semibold mb-2">Current Budget: ${budget.totalBudget}</p>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={newBudgetAmount}
                    onChange={(e) => setNewBudgetAmount(Number(e.target.value))}
                    placeholder="Enter amount to add"
                    className="flex-grow"
                  />
                  <Button onClick={addBudget}>Add to Budget</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Add Category</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="Category Name"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                  className="mb-2"
                />
                <Input
                  type="number"
                  placeholder="Allocation"
                  value={newCategory.allocation}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, allocation: Number(e.target.value) }))}
                  className="mb-2"
                />
                <Button onClick={addCategory}>Add Category</Button>
              </CardContent>
            </Card>

            {budget.categories.length > 0 && (
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Add Expense</CardTitle>
                </CardHeader>
                <CardContent>
                  <select
                    value={newExpense.categoryIndex}
                    onChange={(e) => setNewExpense(prev => ({ ...prev, categoryIndex: Number(e.target.value) }))}
                    className="mb-2 w-full p-2 border rounded"
                  >
                    {budget.categories.map((category, index) => (
                      <option key={index} value={index}>{category.name}</option>
                    ))}
                  </select>
                  <Input
                    placeholder="Description"
                    value={newExpense.description}
                    onChange={(e) => setNewExpense(prev => ({ ...prev, description: e.target.value }))}
                    className="mb-2"
                  />
                  <Input
                    type="number"
                    placeholder="Amount"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense(prev => ({ ...prev, amount: Number(e.target.value) }))}
                    className="mb-2"
                  />
                  <Button onClick={addExpense}>Add Expense</Button>
                </CardContent>
              </Card>
            )}

            {budget.categories.map((category, index) => (
              <Card key={index} className="mt-4">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>{category.name}</CardTitle>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => deleteCategory(index)}
                    className="h-8 w-8"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <p>Allocation: ${category.allocation}</p>
                  <p>Expenses:</p>
                  <ul>
                    {category.expenses.map((expense, expIndex) => (
                      <li key={expIndex}>{expense.description}: ${expense.amount}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </>
        )}
      </div>
    </>
  )
}

