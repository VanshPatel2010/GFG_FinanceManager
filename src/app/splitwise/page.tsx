'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { IExpense } from '@/models/Expense';

interface Expense extends IExpense {
  _id: string;
}

export default function SplitwisePage() {
  const [expenses, setExpenses] = useState<IExpense[]>([])
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [paidBy, setPaidBy] = useState('')
  const [splitAmong, setSplitAmong] = useState('')

  useEffect(() => {
    fetchExpenses()
  }, [])

  const fetchExpenses = async () => {
    const response = await fetch('/api/splitwise/expense')
    const data = await response.json()
    setExpenses(data)
  }

  const addExpense = async () => {
    if (description && amount && paidBy && splitAmong) {
      const response = await fetch('/api/splitwise/expense', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description,
          amount: parseFloat(amount),
          paidBy,
          splitAmong: splitAmong.split(',').map(name => name.trim()),
        }),
      })

      if (response.ok) {
        setDescription('')
        setAmount('')
        setPaidBy('')
        setSplitAmong('')
        fetchExpenses()
      }
    }
  }

  const calculateSplits = () => {
    const balances: { [key: string]: number } = {}

    expenses.forEach(expense => {
      const splitAmount = expense.amount / expense.splitAmong.length

      if (!balances[expense.paidBy]) {
        balances[expense.paidBy] = 0
      }
      balances[expense.paidBy] += expense.amount

      expense.splitAmong.forEach(person => {
        if (!balances[person]) {
          balances[person] = 0
        }
        balances[person] -= splitAmount
      })
    })

    return balances
  }

  const balances = calculateSplits()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Splitwise</h1>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Add Split Expense</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter description"
                />
              </div>
              <div>
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <Label htmlFor="paidBy">Paid By</Label>
                <Input
                  id="paidBy"
                  value={paidBy}
                  onChange={(e) => setPaidBy(e.target.value)}
                  placeholder="Enter name of person who paid"
                />
              </div>
              <div>
                <Label htmlFor="splitAmong">Split Among (comma-separated)</Label>
                <Input
                  id="splitAmong"
                  value={splitAmong}
                  onChange={(e) => setSplitAmong(e.target.value)}
                  placeholder="Enter names, separated by commas"
                />
              </div>
              <Button onClick={addExpense}>Add Split Expense</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Split Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {expenses.map((expense) => (
                <li key={expense._id} className="flex justify-between items-center">
                  <span>{expense.description}</span>
                  <span>${expense.amount.toFixed(2)} (Paid by {expense.paidBy})</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Balances</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {Object.entries(balances).map(([person, balance]) => (
                <li key={person} className="flex justify-between items-center">
                  <span>{person}</span>
                  <span className={balance >= 0 ? 'text-green-500' : 'text-red-500'}>
                    {balance >= 0 ? 'Owed ' : 'Owes '}${Math.abs(balance).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

