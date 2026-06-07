import React from 'react';
import { Shield, Users, Activity, Clock } from 'lucide-react';
import { InventoryItem } from '../types';

export default function Home({ inventory }: { inventory: InventoryItem[] }) {
  const totalUnits = inventory.reduce((acc, item) => acc + item.units, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Hero Section */}
      <div className="relative bg-red-700 rounded-2xl overflow-hidden shadow-xl text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-red-800 to-red-600 opacity-90"></div>
        <div className="relative p-10 md:p-16 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-2/3 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Donate Blood, Save Lives</h1>
            <p className="text-red-100 text-lg md:text-xl max-w-2xl">
              Your contribution can bring life and hope to others. Join our mission to ensure safe and adequate blood supply for everyone in need.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <span className="inline-flex items-center space-x-2 bg-white text-red-700 px-6 py-3 rounded-full font-semibold shadow-sm hover:bg-red-50 transition-colors">
                <span>Start Donating Today</span>
              </span>
            </div>
          </div>
          <div className="hidden md:flex md:w-1/3 justify-center">
            <HeartPulse />
          </div>
        </div>
      </div>

      {/* Stats/Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard 
          icon={<Activity className="w-8 h-8 text-red-600" />}
          title="Current Stock"
          value={`${totalUnits} Units`}
          description="Available across our network"
        />
        <FeatureCard 
          icon={<Users className="w-8 h-8 text-blue-600" />}
          title="Active Donors"
          value="1,245+"
          description="Registered life savers"
        />
        <FeatureCard 
          icon={<Shield className="w-8 h-8 text-green-600" />}
          title="Safe & Secure"
          value="100%"
          description="Tested for transmissible diseases"
        />
      </div>

      {/* Basic info about who can donate */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Who Can Donate?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ul className="space-y-4">
            <CheckListItem text="Age between 18 and 65 years" />
            <CheckListItem text="Weight 45 kg or above" />
            <CheckListItem text="Hemoglobin level above 12.5 g/dl" />
          </ul>
          <ul className="space-y-4">
            <CheckListItem text="No recent tattoos or piercings (last 6 months)" />
            <CheckListItem text="No history of Hepatitis, HIV, or heart diseases" />
            <CheckListItem text="Not pregnant or breastfeeding" />
          </ul>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, value, description }: { icon: React.ReactNode, title: string, value: string, description: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
      <div className="bg-gray-50 p-4 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 my-2">{value}</p>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
}

function CheckListItem({ text }: { text: string }) {
  return (
    <li className="flex items-start space-x-3 text-gray-700">
      <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full border-2 border-red-500 bg-red-500 text-white flex items-center justify-center">
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
      </span>
      <span>{text}</span>
    </li>
  );
}

function HeartPulse() {
  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      <div className="absolute w-32 h-32 bg-red-500 rounded-full opacity-20 animate-ping" style={{ animationDuration: '2s' }}></div>
      <div className="absolute w-40 h-40 bg-red-400 rounded-full opacity-10 animate-ping delay-75" style={{ animationDuration: '2s' }}></div>
      <div className="relative z-10 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
        <Activity className="w-12 h-12 text-red-600" />
      </div>
    </div>
  );
}
