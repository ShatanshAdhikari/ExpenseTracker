import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { calculations } from '../utils/calculations';
import SummaryCards from '../components/SummaryCards';
import ExpenseForm from '../components/ExpenseForm';
import BudgetEditor from '../components/BudgetEditor';
import ExpenseList from '../components/ExpenseList';
import Charts from '../components/Charts';
const Dashboard = () => {
  const [expenses, setExpenses] = useLocalStorage('expenses', []);
  const [budgets, setBudgets] = useLocalStorage('budgets', {});
  const [showForm, setShowForm] = useState(false);
  const [showBudgets, setShowBudgets] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    amount: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0]
  });

  // Calculations
  const currentMonth = calculations.getCurrentMonth();
  const previousMonth = calculations.getPreviousMonth();
  const currentMonthExpenses = calculations.getMonthExpenses(expenses, currentMonth);
  const previousMonthExpenses = calculations.getMonthExpenses(expenses, previousMonth);
  const totalSpent = calculations.getTotalSpent(currentMonthExpenses);
  const previousTotal = calculations.getTotalSpent(previousMonthExpenses);
  const categoryTotals = calculations.getCategoryTotals(currentMonthExpenses);
  const topCategory = calculations.getTopCategory(categoryTotals);
  const totalBudget = calculations.getTotalBudget(budgets);
  const remaining = totalBudget - totalSpent;

  // Handlers
  const handleSubmit = () => {
    const amount = parseFloat(formData.amount);
    if (!amount || amount <= 0) return;

    if (editingId) {
      setExpenses(expenses.map(exp => 
        exp.id === editingId ? { ...formData, amount, id: editingId } : exp
      ));
      setEditingId(null);
    } else {
      setExpenses([...expenses, { ...formData, amount, id: Date.now() }]);
    }

    setFormData({ amount: '', category: 'Food', date: new Date().toISOString().split('T')[0] });
    setShowForm(false);
  };

  const handleEdit = (expense) => {
    setFormData(expense);
    setEditingId(expense.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const handleBudgetChange = (category, value) => {
    const amount = parseFloat(value) || 0;
    setBudgets({ ...budgets, [category]: amount });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Expense Tracker</h1>
          <p className="text-gray-600">Understand and control spending in minutes</p>
        </header>

        <SummaryCards 
          totalSpent={totalSpent}
          remaining={remaining}
          topCategory={topCategory}
        />

        {previousTotal > 0 && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-lg font-semibold mb-2">Monthly Comparison</h2>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">This month: ${totalSpent.toFixed(2)}</span>
              <span className="text-gray-400">vs</span>
              <span className="text-gray-600">Last month: ${previousTotal.toFixed(2)}</span>
              {totalSpent !== previousTotal && (
                <span className={`font-semibold ${totalSpent < previousTotal ? 'text-green-600' : 'text-red-600'}`}>
                  {totalSpent < previousTotal ? '↓' : '↑'} 
                  {Math.abs(((totalSpent - previousTotal) / previousTotal) * 100).toFixed(1)}%
                </span>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => { setShowForm(!showForm); setEditingId(null); }}
                className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-5 h-5" />
                Add Expense
              </button>
              <button
                onClick={() => setShowBudgets(!showBudgets)}
                className="flex-1 bg-gray-200 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-300"
              >
                Set Budgets
              </button>
            </div>

            {showForm && (
              <ExpenseForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                editingId={editingId}
              />
            )}

            {showBudgets && (
              <BudgetEditor
                budgets={budgets}
                categoryTotals={categoryTotals}
                onBudgetChange={handleBudgetChange}
              />
            )}

            <ExpenseList
              expenses={currentMonthExpenses}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>

          <div>
            <Charts categoryTotals={categoryTotals} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;