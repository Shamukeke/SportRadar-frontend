import React, { useEffect, useState } from 'react';
import { fetchPlans, signupCompany } from '../api/companyService';
import { useNavigate } from 'react-router-dom';

const BusinessSignupForm: React.FC = () => {
    const [plans, setPlans] = useState([]);
    const [form, setForm] = useState({ name: '', email: '', password: '', plan_id: null });
    const navigate = useNavigate();

    useEffect(() => { fetchPlans().then(res => setPlans(res.data)); }, []);

    const handleSubmit = async e => {
        e.preventDefault();
        await signupCompany(form);
        navigate('/login');
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-6 bg-white rounded">
            <h2>Créer un compte entreprise</h2>
            <input placeholder="Nom de l'entreprise" onChange={e => setForm({ ...form, name: e.target.value })} />
            <input placeholder="Email" type="email" onChange={e => setForm({ ...form, email: e.target.value })} />
            <input placeholder="Mot de passe" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
            <select onChange={e => setForm({ ...form, plan_id: e.target.value })}>
                <option value="">-- Choisir un plan --</option>
                {plans.map(p => <option key={p.id} value={p.id}>{p.name} - {p.price}/{p.billing_period}</option>)}
            </select>
            <button type="submit">S'inscrire</button>
        </form>
    );
};
export default BusinessSignupForm;