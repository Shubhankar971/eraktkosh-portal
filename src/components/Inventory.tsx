import React, { useState } from 'react';
import { Database, TrendingUp, TrendingDown, Save } from 'lucide-react';
import { InventoryItem, BloodGroup } from '../types';

interface InventoryProps {
  inventory: InventoryItem[];
  overrideInventory: (bg: BloodGroup, units: number) => void;
}

export default function Inventory({ inventory, overrideInventory }: InventoryProps) {
  // Local state for editing form
  const [editValues, setEditValues] = useState<Record<BloodGroup, string>>(() => {
    const initial: any = {};
    inventory.forEach(item => {
      initial[item.bloodGroup] = item.units.toString();
    });
    return initial;
  });

  const [saving, setSaving] = useState<BloodGroup | null>(null);

  const handleSave = (bg: BloodGroup) => {
    const val = parseInt(editValues[bg] || '0', 10);
    setSaving(bg);
    
    // Simulate network delay for UX
    setTimeout(() => {
      overrideInventory(bg, isNaN(val) ? 0 : val);
      setSaving(null);
    }, 400);
  };

  const handleInputChange = (bg: BloodGroup, val: string) => {
    setEditValues(prev => ({
      ...prev,
      [bg]: val
    }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center space-x-3 mb-8 pb-4 border-b border-gray-200">
        <Database className="w-8 h-8 text-gray-700" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-500 mt-1">Admin console to manage physical blood unit reserves.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm tracking-wider">
                <th className="px-6 py-4 font-semibold">Blood Group</th>
                <th className="px-6 py-4 font-semibold">Current Stock</th>
                <th className="px-6 py-4 font-semibold">Last Updated</th>
                <th className="px-6 py-4 font-semibold">Update Quantity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {inventory.map((item) => (
                <tr key={item.bloodGroup} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full font-bold bg-red-100 text-red-700">
                      {item.bloodGroup}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                       <span className={`text-xl font-bold ${item.units < 50 ? 'text-red-600' : 'text-gray-900'}`}>
                         {item.units}
                       </span>
                       <span className="text-sm text-gray-500">units</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(item.lastUpdated).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <input 
                        type="number"
                        min="0"
                        value={editValues[item.bloodGroup]}
                        onChange={(e) => handleInputChange(item.bloodGroup, e.target.value)}
                        className="w-24 px-3 py-1.5 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                      <button 
                        onClick={() => handleSave(item.bloodGroup)}
                        disabled={saving === item.bloodGroup || editValues[item.bloodGroup] === item.units.toString()}
                        className="inline-flex items-center justify-center p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        title="Save Changes"
                      >
                        <Save className={`w-5 h-5 ${saving === item.bloodGroup ? 'animate-pulse text-red-600' : ''}`} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="bg-orange-50 border border-orange-100 rounded-xl p-6 text-sm text-orange-800">
        <strong>⚠️ Administrative Notice:</strong> Adjusting unit counts directly affects the public-facing availability dashboard instantly. Please ensure physical stock reconciliation before saving changes.
      </div>
    </div>
  );
}
