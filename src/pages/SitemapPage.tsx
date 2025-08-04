// src/pages/SitemapPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Home, Activity, Users, MapPin, FileText, Award, Briefcase, User, HelpCircle } from 'lucide-react';

const routes = [
    { path: '/', label: 'Accueil', icon: <Home className="inline w-5 h-5 mr-2" /> },
    { path: '/activities', label: 'Activités', icon: <Activity className="inline w-5 h-5 mr-2" /> },
    { path: '/recommendations', label: 'Recommandations intelligentes', icon: <MapPin className="inline w-5 h-5 mr-2" /> },
    { path: '/badges', label: 'Badge SportZen', icon: <Award className="inline w-5 h-5 mr-2" /> },
    { path: '/corporate-offers', label: 'Offres entreprises', icon: <Briefcase className="inline w-5 h-5 mr-2" /> },
    { path: '/dashboard', label: 'Dashboard', icon: <FileText className="inline w-5 h-5 mr-2" /> },
    { path: '/profile', label: 'Profil', icon: <User className="inline w-5 h-5 mr-2" /> },
    { path: '/legal', label: 'Mentions légales', icon: <FileText className="inline w-5 h-5 mr-2" /> },
    { path: '/privacy', label: 'Politique de confidentialité', icon: <FileText className="inline w-5 h-5 mr-2" /> },
    { path: '/faq', label: 'FAQ', icon: <HelpCircle className="inline w-5 h-5 mr-2" /> },
    { path: '/sitemap', label: 'Plan du site', icon: <FileText className="inline w-5 h-5 mr-2" /> },
];

const SitemapPage: React.FC = () => (
    <>
        <Helmet>
            <title>Plan du site - SportRadar</title>
            <meta name="description" content="Naviguez facilement sur toutes les pages de SportRadar grâce au plan du site." />
            <meta name="robots" content="index, follow" />
        </Helmet>

        <div className="min-h-screen bg-[#C7C5C5] py-16 px-4 flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8"
            >
                <h1 className="text-3xl font-bold text-[#0a1128] mb-6 text-center">
                    Plan du site (Sitemap)
                </h1>
                <ul className="space-y-4">
                    {routes.map(({ path, label, icon }) => (
                        <li key={path}>
                            <Link
                                to={path}
                                className="flex items-center text-lg text-[#0a1128] hover:text-[#dc5f18] transition"
                            >
                                {icon}
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </motion.div>
        </div>
    </>
);

export default SitemapPage;