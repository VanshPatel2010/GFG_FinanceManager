'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BudgetTracker = () => {
  // State variables
  const [budget, setBudget] = useState<number>(0);
  const [additionalAmount, setAdditionalAmount] = useState<number>(0);
  const [newCategory, setNewCategory] = useState<string>('');
  const [categories, setCategories] = useState<{ id: string; name: string; idealAmount: number }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [expenseAmount, setExpenseAmount] = useState<number>(0);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const budgetResponse = await axios.get('/api/budgetTracker');
        setBudget(budgetResponse.data.total);

        const categoryResponse = await axios.get('/api/budgetTracker/category');
        setCategories(categoryResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Handlers
  const handleSetBudget = async () => {
    try {
      const response = await axios.post('/api/budgetTracker', { total: budget });
      setBudget(response.data.total);
    } catch (error) {
      console.error('Error setting budget:', error);
    }
  };

  const handleIncreaseBudget = async () => {
    try {
      const response = await axios.put('/api/budgetTracker', { additionalAmount });
      setBudget(response.data.total);
    } catch (error) {
      console.error('Error increasing budget:', error);
    }
  };

  const handleAddCategory = async () => {
    try {
      const response = await axios.post('/api/budgetTracker/category', { name: newCategory, idealAmount: 0 });
      setCategories((prev) => [...prev, response.data]);
      setNewCategory('');
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      await axios.delete(`/api/budgetTracker/category?id=${selectedCategory}`);
      setCategories((prev) => prev.filter((category) => category.id !== selectedCategory));
      setSelectedCategory('');
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleAddExpense = async () => {
    try {
      const response = await axios.post('/api/budgetTracker/expense', {
        amount: expenseAmount,
        categoryId: selectedCategory,
      });
      setBudget((prev) => prev - expenseAmount);
      setExpenseAmount(0);
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  return (
    <div style={{ padding: '20px', color: 'white', backgroundColor: '#000', fontFamily: 'Arial, sans-serif' }}>
      <h1>Budget Tracker</h1>

      {/* Set Budget */}
      <div style={{ marginBottom: '20px' }}>
        <h2>Set Your Budget</h2>
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <button onClick={handleSetBudget} style={{ padding: '5px 10px' }}>
          Set Budget
        </button>
      </div>

      {/* Increase Budget */}
      <div style={{ marginBottom: '20px' }}>
        <h2>Increase Your Budget</h2>
        <input
          type="number"
          value={additionalAmount}
          onChange={(e) => setAdditionalAmount(Number(e.target.value))}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <button onClick={handleIncreaseBudget} style={{ padding: '5px 10px' }}>
          Increase Budget
        </button>
      </div>

      {/* Add Category */}
      <div style={{ marginBottom: '20px' }}>
        <h2>Add Category</h2>
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Enter new category"
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <button onClick={handleAddCategory} style={{ padding: '5px 10px' }}>
          Add Category
        </button>
      </div>

      {/* Delete Category */}
      <div style={{ marginBottom: '20px' }}>
        <h2>Delete Category</h2>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button onClick={handleDeleteCategory} style={{ padding: '5px 10px' }}>
          Delete Category
        </button>
      </div>

      {/* Ideal Plan */}
      <div style={{ marginBottom: '20px' }}>
        <h2>Ideal Plan</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '10px' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '1px solid white', padding: '5px' }}>Category</th>
              <th style={{ borderBottom: '1px solid white', padding: '5px' }}>Ideal Budget</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td style={{ borderBottom: '1px solid white', padding: '5px' }}>{category.name}</td>
                <td style={{ borderBottom: '1px solid white', padding: '5px' }}>${category.idealAmount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button style={{ padding: '5px 10px' }}>Custom Budgeting</button>
      </div>

      {/* Actual Expenses */}
      <div>
        <h2>Actual Expenses</h2>
        <div style={{ marginBottom: '10px' }}>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ marginRight: '10px', padding: '5px' }}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(Number(e.target.value))}
            placeholder="Amount"
            style={{ marginRight: '10px', padding: '5px' }}
          />
          <button onClick={handleAddExpense} style={{ padding: '5px 10px' }}>
            Add Expense
          </button>
        </div>
      </div>
    </div>
  );
};

export default BudgetTracker;
