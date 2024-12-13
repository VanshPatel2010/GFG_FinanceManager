"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Transaction {
  date?: string;
  amount: number;
  type: 'income' | 'expense';
}

const BalanceTracker: React.FC = () => {
  const [currentBalance, setCurrentBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [amount, setAmount] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [type, setType] = useState<'income' | 'expense'>('income');  // Ensure type is correctly typed as 'income' or 'expense'
  const [loading, setLoading] = useState<boolean>(true);  // Loading state

  useEffect(() => {
    fetchBalances();
  }, []);

  const fetchBalances = async () => {
    setLoading(true);  // Set loading state to true when fetching data
    try {
      const balanceResponse = await axios.get('/api/balanceTracker');
      const currentBalanceResponse = await axios.get('/api/balanceTracker/current');

      setTransactions(balanceResponse.data.data);
      setCurrentBalance(currentBalanceResponse.data.balance);
      setLoading(false);  // Set loading state to false after data is fetched
    } catch (error) {
      console.error('Error fetching balances:', error);
      setLoading(false);  // Set loading state to false in case of an error
    }
  };

  const handleTypeChange = (selectedType: 'income' | 'expense') => {
    setType(selectedType);
  };

  const handleSubmit = async () => {
    try {
      await axios.post('/api/balanceTracker', {
        type,
        amount: parseFloat(amount),
        date: new Date(),
      });
      fetchBalances();  // Refresh the balances
      setAmount('');
      setDescription('');
    } catch (error) {
      console.error('Error adding balance:', error);
      // Optionally, you can set an error state here to display an error message
    }
  };

  const chartData = {
    labels: transactions.map((t) => t.date ? new Date(t.date).toLocaleString() : ''),
    datasets: [
      {
        label: 'Transaction Amounts',
        data: transactions.map((t) => t.amount),
        backgroundColor: transactions.map((t) =>
          t.type === 'income' ? 'green' : 'red'
        ),
      },
    ],
  };

  if (loading) {
    return <p>Loading...</p>;  // Display loading message while fetching data
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#000', color: '#fff' }}>
      <h1>Welcome, kuldeep</h1>
      <h2>Current Balance: ₹{currentBalance.toFixed(2)}</h2>
      <div>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button style={{ backgroundColor: 'green' }} onClick={() => handleTypeChange('income')}>
          Add Gain
        </button>
        <button style={{ backgroundColor: 'red' }} onClick={() => handleTypeChange('expense')}>
          Add Spend
        </button>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div>
        <h3>Transaction History:</h3>
        {transactions.map((t, index) => (
          <p key={index}>
            {t.date ? new Date(t.date).toLocaleString() : 'Unknown Date'} - {t.type === 'income' ? 'gain' : 'loss'} of ₹
            {t.amount}
          </p>
        ))}
      </div>
      <div>
        <h3>Transaction Chart:</h3>
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default BalanceTracker;
