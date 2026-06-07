import { useState } from 'react';
import { useBloodBank } from './hooks/useBloodBank';
import { TabState } from './types';
import { Droplet, Home as HomeIcon, LineChart, UserPlus, FileArchive } from 'lucide-react';

import Home from './components/Home';
import Dashboard from './components/Dashboard';
import DonorRegistration from './components/DonorRegistration';
import Inventory from './components/Inventory';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabState>('home');
  const { inventory, addDonor, overrideInventory } = useBloodBank();

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-red-200">
      {/* Header / Navbar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <div 
              className="flex items-center space-x-2 cursor-pointer group"
              onClick={() => setActiveTab('home')}
            >
              <div className="bg-red-600 p-2 rounded-lg text-white group-hover:bg-red-700 transition-colors">
                <Droplet className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">
                <span className="text-red-600">e</span>RaktKosh<span className="font-medium text-gray-500 text-sm ml-1">Portal</span>
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              <NavButton 
                active={activeTab === 'home'} 
                onClick={() => setActiveTab('home')}
                icon={<HomeIcon className="w-4 h-4" />}
                label="Home"
              />
              <NavButton 
                active={activeTab === 'dashboard'} 
                onClick={() => setActiveTab('dashboard')}
                icon={<LineChart className="w-4 h-4" />}
                label="Availability"
              />
              <NavButton 
                active={activeTab === 'donor_registration'} 
                onClick={() => setActiveTab('donor_registration')}
                icon={<UserPlus className="w-4 h-4" />}
                label="Register Donor"
              />
              <NavButton 
                active={activeTab === 'inventory'} 
                onClick={() => setActiveTab('inventory')}
                icon={<FileArchive className="w-4 h-4" />}
                label="Inventory"
              />
            </nav>

            {/* Mobile menu button (Simplified for demo) */}
            <div className="md:hidden flex items-center">
              <span className="text-sm font-medium text-gray-500 capitalize">{activeTab.replace('_', ' ')}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Bar */}
      <div className="md:hidden bg-white border-b border-gray-200 flex overflow-x-auto">
         <MobileNavButton active={activeTab === 'home'} onClick={() => setActiveTab('home')} label="Home" />
         <MobileNavButton active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} label="Availability" />
         <MobileNavButton active={activeTab === 'donor_registration'} onClick={() => setActiveTab('donor_registration')} label="Register" />
         <MobileNavButton active={activeTab === 'inventory'} onClick={() => setActiveTab('inventory')} label="Inventory" />
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'home' && <Home inventory={inventory} />}
        {activeTab === 'dashboard' && <Dashboard inventory={inventory} />}
        {activeTab === 'donor_registration' && <DonorRegistration onRegister={addDonor} />}
        {activeTab === 'inventory' && <Inventory inventory={inventory} overrideInventory={overrideInventory} />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2026 eRaktKosh Clone. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
        active 
          ? 'bg-red-50 text-red-700' 
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function MobileNavButton({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-3 px-2 text-center text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
        active
          ? 'border-red-600 text-red-600'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
      }`}
    >
      {label}
    </button>
  );
}
