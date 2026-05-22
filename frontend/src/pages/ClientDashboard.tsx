/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Client Dashboard Page
 * @created 2026-05-22
 * @updated 2026-05-22
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */

import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const ClientDashboard: React.FC = () => {
  const { user, token } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/users/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile', error);
      } finally {
        setLoading(false);
      }
    };
    if (token) {
      fetchProfile();
    }
  }, [token]);

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Chargement...</div>;
  }

  return (
    <div className="bg-white shadow rounded-2xl p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Bienvenue, {user?.full_name}</h2>
      <p className="text-gray-500 mb-8">Gérez vos commandes, votre profil et vos adresses.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border border-gray-100 rounded-xl p-6 bg-gray-50 shadow-sm">
          <h3 className="font-semibold text-xl text-gray-800 mb-4 flex items-center">
            <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3 text-sm">👤</span>
            Informations du compte
          </h3>
          <div className="space-y-3">
            <p className="text-gray-600 flex justify-between"><span className="font-medium text-gray-700">Email</span> <span>{profile?.email || 'Non renseigné'}</span></p>
            <p className="text-gray-600 flex justify-between"><span className="font-medium text-gray-700">Téléphone</span> <span>{profile?.phone}</span></p>
            <p className="text-gray-600 flex justify-between"><span className="font-medium text-gray-700">Rôle</span> <span className="capitalize">{profile?.role}</span></p>
            <p className="text-gray-600 flex justify-between"><span className="font-medium text-gray-700">Membre depuis</span> <span>{profile?.created_at ? new Date(profile.created_at).toLocaleDateString('fr-FR') : 'N/A'}</span></p>
          </div>
        </div>
        
        <div className="border border-gray-100 rounded-xl p-6 bg-gray-50 shadow-sm">
          <h3 className="font-semibold text-xl text-gray-800 mb-4 flex items-center">
            <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 text-sm">📍</span>
            Adresses d'expédition
          </h3>
          {profile?.addresses && profile.addresses.length > 0 ? (
            <ul className="space-y-3">
              {profile.addresses.map((addr: any, index: number) => (
                <li key={index} className="text-gray-600 bg-white p-3 rounded border border-gray-200">
                  <p className="font-medium text-gray-800">{addr.street}</p>
                  <p>{addr.city}, {addr.country}</p>
                  {addr.details && <p className="text-sm text-gray-500 mt-1">{addr.details}</p>}
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500 italic mb-4">Aucune adresse enregistrée.</p>
              <button className="text-sm text-blue-600 font-medium hover:text-blue-800">
                + Ajouter une adresse
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
