/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Sidebar navigation component
 * @created 2026-05-22
 * @updated 2026-05-22
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const getLinks = () => {
    if (user?.role === 'admin') {
      return [
        { path: '/admin', label: 'Dashboard Admin' },
        { path: '/admin/products', label: 'Produits' },
        { path: '/admin/orders', label: 'Commandes' },
        { path: '/admin/users', label: 'Utilisateurs' },
      ];
    }
    return [
      { path: '/dashboard', label: 'Mon Dashboard' },
      { path: '/dashboard/orders', label: 'Mes Commandes' },
      { path: '/dashboard/profile', label: 'Mon Profil' },
    ];
  };

  const links = getLinks();

  return (
    <div className="w-64 bg-white border-r h-full flex flex-col shadow-sm">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800">Alixco Luxe</h2>
      </div>
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
              location.pathname === link.path
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t">
        <div className="mb-4 px-2">
          <p className="text-sm font-medium text-gray-900">{user?.full_name}</p>
          <p className="text-xs text-gray-500 truncate">{user?.email}</p>
        </div>
        <button
          onClick={logout}
          className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors"
        >
          Déconnexion
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
