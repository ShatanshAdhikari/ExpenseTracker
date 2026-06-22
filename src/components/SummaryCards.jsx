import React from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

const SummaryCards = ({ totalSpent, remaining, topCategory }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Total Spent</p>
            <p className="text-2xl font-bold text-gray-900">${totalSpent.toFixed(2)}</p>
          </div>
          <DollarSign className="w-8 h-8 text-blue-500" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Remaining Budget</p>
            <p className={`text-2xl font-bold ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${remaining.toFixed(2)}
            </p>
          </div>
          {remaining >= 0 ? 
            <TrendingUp className="w-8 h-8 text-green-500" /> :
            <TrendingDown className="w-8 h-8 text-red-500" />
          }
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Top Category</p>
            <p className="text-2xl font-bold text-gray-900">{topCategory}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;