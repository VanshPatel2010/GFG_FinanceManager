// 'use client'

// import { useState, useEffect } from 'react'
// import { useSession } from 'next-auth/react'
// import { useParams } from 'next/navigation'
// import { Input } from '@/components/ui/input'
// import { Button } from '@/components/ui/button'
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
// import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
// import { Loader2 } from 'lucide-react'

// interface Group {
//   _id: string
//   name: string
//   members: string[]
// }

// interface Expense {
//   _id: string
//   description: string
//   amount: number
//   paidBy: string
//   splitAmong: string[]
//   date: string
// }

// export default function GroupPage() {
//   const params = useParams()
//   const { data: session, status } = useSession()
//   const [group, setGroup] = useState<Group | null>(null)
//   const [expenses, setExpenses] = useState<Expense[]>([])
//   const [newMember, setNewMember] = useState('')
//   const [description, setDescription] = useState('')
//   const [amount, setAmount] = useState('')
//   const [paidBy, setPaidBy] = useState('')
//   const [splitType, setSplitType] = useState('equally')
//   const [error, setError] = useState<string | null>(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const [isAddingExpense, setIsAddingExpense] = useState(false)

//   useEffect(() => {
//     if (status === 'authenticated' && params.id) {
//       fetchGroupDetails()
//       fetchExpenses()
//     }
//   }, [status, params.id])

//   const fetchGroupDetails = async () => {
//     setIsLoading(true)
//     try {
//       const response = await fetch(`/api/splitwise/groups/${params.id}`)
//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.error || 'Failed to fetch group details')
//       }
//       const data = await response.json()
//       setGroup(data)
//     } catch (error) {
//       setError(error instanceof Error ? error.message : 'Failed to fetch group details')
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const fetchExpenses = async () => {
//     try {
//       const response = await fetch(`/api/splitwise/expense?groupId=${params.id}`)
//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.error || 'Failed to fetch expenses')
//       }
//       const data = await response.json()
//       setExpenses(data)
//     } catch (error) {
//       setError(error instanceof Error ? error.message : 'Failed to fetch expenses')
//     }
//   }

//   const handleAddMember = async () => {
//     if (!newMember.trim()) return
    
//     try {
//       const response = await fetch(`/api/splitwise/groups/${params.id}/members`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email: newMember }),
//       })

//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.error || 'Failed to add member')
//       }
      
//       setNewMember('')
//       fetchGroupDetails()
//     } catch (error) {
//       setError(error instanceof Error ? error.message : 'Failed to add member')
//     }
//   }

//   const handleAddExpense = async () => {
//     if (!description || !amount || !paidBy) return
    
//     setIsAddingExpense(true)
//     try {
//       const response = await fetch('/api/splitwise/expense', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           description,
//           amount: parseFloat(amount),
//           paidBy,
//           splitAmong: group?.members || [],
//           groupId: params.id,
//         }),
//       })

//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.error || 'Failed to add expense')
//       }
      
//       setDescription('')
//       setAmount('')
//       setPaidBy('')
//       fetchExpenses()
//     } catch (error) {
//       setError(error instanceof Error ? error.message : 'Failed to add expense')
//     } finally {
//       setIsAddingExpense(false)
//     }
//   }

//   if (status === 'loading' || isLoading) {
//     return (
//       <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
//         <Loader2 className="w-8 h-8 animate-spin" />
//       </div>
//     )
//   }

//   if (status === 'unauthenticated') {
//     return (
//       <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
//         <p className="text-2xl">Please sign in to access this page.</p>
//       </div>
//     )
//   }

//   if (error || !group) {
//     return (
//       <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
//         <Alert variant="destructive">
//           <AlertTitle>Error</AlertTitle>
//           <AlertDescription>{error || 'Failed to load group data'}</AlertDescription>
//         </Alert>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-[#121212] text-white p-8">
//       <div className="max-w-4xl mx-auto space-y-8">
//         <h1 className="text-3xl font-bold text-center">{group.name}</h1>

//         <div className="space-y-4">
//           <h2 className="text-xl font-semibold text-[#87CEEB]">Members</h2>
//           <div className="space-y-2">
//             {group.members.map((member) => (
//               <div key={member} className="p-2 bg-[#2D2D2D] rounded">
//                 {member}
//               </div>
//             ))}
//           </div>
//           <div className="flex gap-2">
//             <Input
//               placeholder="Add new member"
//               value={newMember}
//               onChange={(e) => setNewMember(e.target.value)}
//               className="bg-[#2D2D2D] border-gray-700 text-white"
//             />
//             <Button
//               onClick={handleAddMember}
//               className="bg-gradient-to-r from-[#1E3B8B] to-[#87CEEB] hover:opacity-90"
//             >
//               ADD MEMBER
//             </Button>
//           </div>
//         </div>

//         <div className="space-y-4">
//           <h2 className="text-xl font-semibold text-[#87CEEB]">Add New Expense</h2>
//           <Input
//             placeholder="Description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="bg-[#2D2D2D] border-gray-700 text-white"
//           />
//           <Input
//             type="number"
//             placeholder="0"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             className="bg-[#2D2D2D] border-gray-700 text-white"
//           />
//           <Select value={paidBy} onValueChange={setPaidBy}>
//             <SelectTrigger className="bg-[#2D2D2D] border-gray-700 text-white">
//               <SelectValue placeholder="Select Payer" />
//             </SelectTrigger>
//             <SelectContent className="bg-[#2D2D2D] border-gray-700 text-white">
//               {group.members.map((member) => (
//                 <SelectItem key={member} value={member}>
//                   {member}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//           <Select value={splitType} onValueChange={setSplitType}>
//             <SelectTrigger className="bg-[#2D2D2D] border-gray-700 text-white">
//               <SelectValue placeholder="Split Type" />
//             </SelectTrigger>
//             <SelectContent className="bg-[#2D2D2D] border-gray-700 text-white">
//               <SelectItem value="equally">Split Equally</SelectItem>
//             </SelectContent>
//           </Select>
//           <Button
//             onClick={handleAddExpense}
//             disabled={isAddingExpense}
//             className="w-full bg-gradient-to-r from-[#1E3B8B] to-[#87CEEB] hover:opacity-90"
//           >
//             {isAddingExpense ? (
//               <>
//                 <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                 Adding Expense...
//               </>
//             ) : (
//               'ADD EXPENSE'
//             )}
//           </Button>
//         </div>

//         <div className="space-y-4">
//           <h2 className="text-xl font-semibold text-[#87CEEB]">Expenses</h2>
//           {expenses.length === 0 ? (
//             <p className="text-center text-gray-400">No expenses yet. Add your first expense!</p>
//           ) : (
//             expenses.map((expense) => (
//               <div key={expense._id} className="p-4 bg-[#2D2D2D] rounded">
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <h3 className="font-semibold">{expense.description}</h3>
//                     <p className="text-sm text-gray-400">Paid by {expense.paidBy}</p>
//                   </div>
//                   <p className="text-lg">${expense.amount.toFixed(2)}</p>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         <div className="space-y-4">
//           <h2 className="text-xl font-semibold text-[#87CEEB]">Charts</h2>
//           {/* Add charts implementation here */}
//         </div>
//       </div>
//     </div>
//   )
// }

'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Loader2 } from 'lucide-react'

interface Group {
  _id: string
  name: string
  members: string[]
}

interface Split {
  user: string
  amount: number
}

interface Expense {
  _id: string
  description: string
  amount: number
  paidBy: string
  splitType: 'equal' | 'unequal'
  splits: Split[]
  date: string
}

export default function GroupPage() {
  const params = useParams()
  const { data: session, status } = useSession()
  const [group, setGroup] = useState<Group | null>(null)
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [newMember, setNewMember] = useState('')
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [paidBy, setPaidBy] = useState('')
  const [splitType, setSplitType] = useState<'equal' | 'unequal'>('equal')
  const [splits, setSplits] = useState<Split[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAddingExpense, setIsAddingExpense] = useState(false)

  useEffect(() => {
    if (status === 'authenticated' && params.id) {
      fetchGroupDetails()
      fetchExpenses()
    }
  }, [status, params.id])

  useEffect(() => {
    if (group && group.members.length > 0) {
      const equalSplit = parseFloat(amount) / group.members.length
      setSplits(group.members.map(member => ({ user: member, amount: equalSplit })))
    }
  }, [group, amount])

  const fetchGroupDetails = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/splitwise/groups/${params.id}`)
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch group details')
      }
      const data = await response.json()
      setGroup(data)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch group details')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchExpenses = async () => {
    try {
      const response = await fetch(`/api/splitwise/expense?groupId=${params.id}`)
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch expenses')
      }
      const data = await response.json()
      setExpenses(data)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch expenses')
    }
  }

  const handleAddMember = async () => {
    if (!newMember.trim()) return
    
    try {
      const response = await fetch(`/api/splitwise/groups/${params.id}/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newMember }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to add member')
      }
      
      setNewMember('')
      fetchGroupDetails()
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to add member')
    }
  }

  const handleSplitChange = (user: string, newAmount: string) => {
    const newSplits = splits.map(split => 
      split.user === user ? { ...split, amount: parseFloat(newAmount) || 0 } : split
    )
    setSplits(newSplits)
  }

  const handleAddExpense = async () => {
    if (!description || !amount || !paidBy) return
    
    setIsAddingExpense(true)
    try {
      const response = await fetch('/api/splitwise/expense', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description,
          amount: parseFloat(amount),
          paidBy,
          splitType,
          splits,
          groupId: params.id,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to add expense')
      }
      
      setDescription('')
      setAmount('')
      setPaidBy('')
      setSplitType('equal')
      fetchExpenses()
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to add expense')
    } finally {
      setIsAddingExpense(false)
    }
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
        <p className="text-2xl">Please sign in to access this page.</p>
      </div>
    )
  }

  if (error || !group) {
    return (
      <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error || 'Failed to load group data'}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center">{group.name}</h1>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-[#87CEEB]">Members</h2>
          <div className="space-y-2">
            {group.members.map((member) => (
              <div key={member} className="p-2 bg-[#2D2D2D] rounded">
                {member}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Add new member"
              value={newMember}
              onChange={(e) => setNewMember(e.target.value)}
              className="bg-[#2D2D2D] border-gray-700 text-white"
            />
            <Button
              onClick={handleAddMember}
              className="bg-gradient-to-r from-[#1E3B8B] to-[#87CEEB] hover:opacity-90"
            >
              ADD MEMBER
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-[#87CEEB]">Add New Expense</h2>
          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-[#2D2D2D] border-gray-700 text-white"
          />
          <Input
            type="number"
            placeholder="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-[#2D2D2D] border-gray-700 text-white"
          />
          <Select value={paidBy} onValueChange={setPaidBy}>
            <SelectTrigger className="bg-[#2D2D2D] border-gray-700 text-white">
              <SelectValue placeholder="Select Payer" />
            </SelectTrigger>
            <SelectContent className="bg-[#2D2D2D] border-gray-700 text-white">
              {group.members.map((member) => (
                <SelectItem key={member} value={member}>
                  {member}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={splitType} onValueChange={(value: 'equal' | 'unequal') => setSplitType(value)}>
            <SelectTrigger className="bg-[#2D2D2D] border-gray-700 text-white">
              <SelectValue placeholder="Split Type" />
            </SelectTrigger>
            <SelectContent className="bg-[#2D2D2D] border-gray-700 text-white">
              <SelectItem value="equal">Split Equally</SelectItem>
              <SelectItem value="unequal">Split Unequally</SelectItem>
            </SelectContent>
          </Select>
          {splitType === 'unequal' && (
            <div className="space-y-2">
              {splits.map((split, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={split.user}
                    disabled
                    className="bg-[#2D2D2D] border-gray-700 text-white flex-grow"
                  />
                  <Input
                    type="number"
                    value={split.amount}
                    onChange={(e) => handleSplitChange(split.user, e.target.value)}
                    className="bg-[#2D2D2D] border-gray-700 text-white w-24"
                  />
                </div>
              ))}
            </div>
          )}
          <Button
            onClick={handleAddExpense}
            disabled={isAddingExpense}
            className="w-full bg-gradient-to-r from-[#1E3B8B] to-[#87CEEB] hover:opacity-90"
          >
            {isAddingExpense ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Adding Expense...
              </>
            ) : (
              'ADD EXPENSE'
            )}
          </Button>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-[#87CEEB]">Expenses</h2>
          {expenses.length === 0 ? (
            <p className="text-center text-gray-400">No expenses yet. Add your first expense!</p>
          ) : (
            expenses.map((expense) => (
              <div key={expense._id} className="p-4 bg-[#2D2D2D] rounded">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{expense.description}</h3>
                    <p className="text-sm text-gray-400">Paid by {expense.paidBy}</p>
                    <p className="text-xs text-gray-500">Split: {expense.splitType}</p>
                  </div>
                  <p className="text-lg">${expense.amount.toFixed(2)}</p>
                </div>
                {expense.splitType === 'unequal' && (
                  <div className="mt-2 text-sm">
                    <p className="font-semibold">Split details:</p>
                    {expense.splits.map((split, index) => (
                      <p key={index}>{split.user}: ${split.amount.toFixed(2)}</p>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-[#87CEEB]"></h2>
          {/* Add charts implementation here */}
        </div>
      </div>
    </div>
  )
}


