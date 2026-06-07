import React from 'react';
import { RefreshCw, Droplet } from 'lucide-react';
import { InventoryItem, BloodGroup } from '../types';

export default function Dashboard({ inventory }: { inventory: InventoryItem[] }) {
  // Sort inventory nicely
  const sortedInventory = [...inventory].sort((a, b) => {
    // Custom sort to group rh types: A+, A-, B+, B-, O+, O-, AB+, AB-
    const groupOrder: Record<BloodGroup, number> = {
      'A+': 1, 'A-': 2,
      'B+': 3, 'B-': 4,
      'O+': 5, 'O-': 6,
      'AB+': 7, 'AB-': 8
    };
    return groupOrder[a.bloodGroup] - groupOrder[b.bloodGroup];
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-gray-200 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Real-Time Availability</h1>
          <p className="text-gray-500 mt-1">Live status of blood group stocks across our primary storage centers.</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 bg-red-50 text-red-700 px-4 py-2 rounded-full font-medium">
          <RefreshCw className="w-4 h-4 animate-spin-slow" />
          <span>Live Updates Active</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {sortedInventory.map((item) => (
          <StockCard key={item.bloodGroup} item={item} />
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mt-8">
        <h3 className="text-blue-800 font-semibold mb-2">Need Blood urgently?</h3>
        <p className="text-blue-700 mb-4">Contact our 24/7 helpdesk or walk into the nearest center directly. Severe emergencies bypass standard queuing.</p>
        <span className="font-mono text-lg font-bold text-blue-900 border-b-2 border-blue-900 pb-1">1800-00-BLOOD</span>
      </div>
    </div>
  );
}

function StockCard({ item }: { item: InventoryItem }) {
  // Determine color coding based on stock levels
  let StatusWrapper = 'bg-white border-gray-200';
  let TextColor = 'text-green-600';
  let StatusText = 'Available';

  if (item.units === 0) {
    StatusWrapper = 'bg-red-50 border-red-200';
    TextColor = 'text-red-600';
    StatusText = 'Out of Stock';
  } else if (item.units < 50) {
    StatusWrapper = 'bg-yellow-50 border-yellow-200';
    TextColor = 'text-yellow-600';
    StatusText = 'Low Stock';
  }

  const lastUpdated = new Date(item.lastUpdated);
  const timeString = lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={`rounded-2xl border p-6 flex flex-col justify-between shadow-sm transition-all hover:shadow-md ${StatusWrapper}`}>
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600">
          <span className="text-xl font-bold font-sans">{item.bloodGroup}</span>
        </div>
        <div className={`flex items-center space-x-1 text-xs font-semibold px-2.5 py-1 rounded-full ${item.units === 0 ? 'bg-red-100' : (item.units < 50 ? 'bg-yellow-100' : 'bg-green-100')} ${TextColor}`}>
          <span>{StatusText}</span>
        </div>
      </div>
      
      <div>
        <div className="flex items-end space-x-2">
          <span className="text-4xl font-bold text-gray-900">{item.units}</span>
          <span className="text-sm font-medium text-gray-500 mb-1">units</span>
        </div>
        <div className="text-xs text-gray-400 mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
          <span>Updated</span>
          <span>{timeString}</span>
        </div>
      </div>
    </div>
  );
}
