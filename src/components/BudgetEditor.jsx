import React from 'react';
import { CATEGORIES } from '../utils/calculations';

const BudgetEditor = ({ budgets, categoryTotals, onBudgetChange }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Monthly Budgets</h2>
      <div className="space-y-3">
        {CATEGORIES.map(cat => {
          const spent = categoryTotals[cat] || 0;
          const budget = budgets[cat] || 0;
          const overBudget = budget > 0 && spent > budget;
          
          return (
            <div key={cat}>
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">{cat}</label>
                {overBudget && (
                  <span className="text-xs text-red-600 font-semibold">Over budget!</span>
                )}
              </div>
              <input
                type="number"
                step="0.01"
                value={budgets[cat] || ''}
                onChange={(e) => onBudgetChange(cat, e.target.value)}
                placeholder="0.00"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  overBudget ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              />
              {budget > 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  ${spent.toFixed(2)} / ${budget.toFixed(2)}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetEditor;