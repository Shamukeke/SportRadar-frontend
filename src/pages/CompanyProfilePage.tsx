import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const CompanyProfilePage: React.FC = () => {
    const { user } = useAuth();
    if (!user || user.type !== 'business' || !user.company) return null;
    const { company } = user;

    return (
        <div className="min-h-screen bg-[#C7C5C5] py-10 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-6">
                <h1 className="text-3xl font-bold">Mon Entreprise</h1>
                <p><strong>Nom :</strong> {company.name}</p>
                <p><strong>Plan :</strong> {company.plan.name} ({company.plan.price}€/ {company.plan.billing_period})</p>
                <p><strong>Statut :</strong> {company.is_active ? 'Actif' : 'En attente de paiement'}</p>
                <Link to="/invite-employee" className="inline-block bg-[#dc5f18] text-white px-4 py-2 rounded-lg">
                    Inviter des collaborateurs
                </Link>
            </div>
        </div>
    );
};
export default CompanyProfilePage;