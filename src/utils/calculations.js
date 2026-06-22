export const calculations = {
  getCurrentMonth: () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  },

  getPreviousMonth: () => {
    const now = new Date();
    const prev = new Date(now.getFullYear(), now.getMonth() - 1);
    return `${prev.getFullYear()}-${String(prev.getMonth() + 1).padStart(2, '0')}`;
  },

  getMonthExpenses: (expenses, month) => {
    return expenses.filter(e => e.date.startsWith(month));
  },

  getTotalSpent: (expenses) => {
    return expenses.reduce((sum, e) => sum + e.amount, 0);
  },

  getCategoryTotals: (expenses) => {
    return expenses.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount;
      return acc;
    }, {});
  },

  getTopCategory: (categoryTotals) => {
    return Object.entries(categoryTotals)
      .sort((a, b) => b[1] - a[1])[0]?.[0] || 'None';
  },

  getTotalBudget: (budgets) => {
    return Object.values(budgets).reduce((sum, b) => sum + b, 0);
  }
};

export const CATEGORIES = ['Food', 'Rent', 'Transport', 'Entertainment', 'Bills', 'Shopping', 'Health', 'Other'];
export const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#14b8a6', '#6b7280'];