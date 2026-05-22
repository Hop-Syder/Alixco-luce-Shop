/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Dashboard Layout wrapper
 * @created 2026-05-22
 * @updated 2026-05-22
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */

import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuth } from '../../context/AuthContext';

const DashboardLayout: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-800">
              {user?.role === 'admin' ? 'Administration' : 'Espace Client'}
            </h1>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
