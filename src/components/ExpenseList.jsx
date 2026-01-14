import React from 'react';
import { Trash2, Edit2 } from 'lucide-react';

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Expenses</h2>
      <div className="space-y-2">
        {expenses.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No expenses yet</p>
        ) : (
          expenses
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map(expense => (
              <div key={expense.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-900">${expense.amount.toFixed(2)}</span>
                    <span className="text-sm text-gray-600">{expense.category}</span>
                  </div>
                  <p className="text-xs text-gray-500">{expense.date}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(expense)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(expense.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default ExpenseList;