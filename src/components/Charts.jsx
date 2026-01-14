import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { COLORS } from '../utils/calculations';

const Charts = ({ categoryTotals }) => {
  const chartData = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value
  }));

  if (chartData.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Spending by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-6 space-y-2">
        {Object.entries(categoryTotals)
          .sort((a, b) => b[1] - a[1])
          .map(([cat, amount], idx) => (
            <div key={cat} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                />
                <span className="text-sm text-gray-700">{cat}</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">${amount.toFixed(2)}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Charts;