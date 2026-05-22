/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Admin Dashboard Page
 * @created 2026-05-22
 * @updated 2026-05-22
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */

import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const AdminDashboard: React.FC = () => {
  const { token } = useAuth();
  const [adminStatus, setAdminStatus] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/users/admin-test', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAdminStatus(response.data.message);
      } catch (error) {
        console.error('Error checking admin status', error);
        setAdminStatus('Erreur de validation des droits (Accès Refusé).');
      } finally {
        setLoading(false);
      }
    };
    if (token) {
      checkAdmin();
    }
  }, [token]);

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Tableau de bord Administrateur</h2>
        <p className="text-gray-500 mb-6">Vue d'ensemble de la plateforme Alixco Luxe.</p>
        
        {loading ? (
          <div className="text-gray-500">Vérification des droits...</div>
        ) : (
          <div className={`p-4 rounded-lg border font-medium ${
            adminStatus.includes('Erreur') 
              ? 'bg-red-50 text-red-800 border-red-200' 
              : 'bg-green-50 text-green-800 border-green-200'
          } inline-block`}>
            Statut RBAC : {adminStatus}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
          <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl mr-4">
            📦
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">0</h3>
            <p className="text-gray-500 font-medium">Commandes à traiter</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
          <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xl mr-4">
            🛍️
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">0</h3>
            <p className="text-gray-500 font-medium">Produits en ligne</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center">
          <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xl mr-4">
            👥
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">0</h3>
            <p className="text-gray-500 font-medium">Clients inscrits</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
