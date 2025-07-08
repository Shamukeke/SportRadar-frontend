// File: src/pages/features/AnalyticsAvancesPage.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, ArrowLeft, CheckCircle } from 'lucide-react';

const analyticsDetails = [
    'Visualisation des tendances sur plusieurs périodes',
    'Segmentation par équipe et par activité',
    'Export au format CSV ou PDF'
];

const AnalyticsAvancesPage: React.FC = () => {
    const navigate = useNavigate();

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-[#C7C5C5] py-10 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 space-y-8">
                {/* Bouton Retour */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-[#0a1128] hover:text-[#dc5f18] transition"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    <span>Retour</span>
                </button>

                {/* En-tête */}
                <div className="flex items-center space-x-4">
                    <div className="p-3 bg-[#dc5f18] rounded-md">
                        <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-[#0a1128]">Analytics avancés</h1>
                </div>

                {/* Introduction courte */}
                <p className="text-gray-700">
                    Bénéficiez d’outils d’analyse avancée pour mesurer l’engagement,
                    optimiser les performances et prendre des décisions éclairées.
                </p>

                {/* Liste des points clés */}
                <ul className="list-disc list-inside space-y-2">
                    {analyticsDetails.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                            <CheckCircle className="w-5 h-5 text-[#dc5f18] flex-shrink-0 mt-1" />
                            <span className="text-gray-700 font-medium">{item}</span>
                        </li>
                    ))}
                </ul>

                {/* Sections détaillées */}
                <div className="mt-6 space-y-8">
                    <section>
                        <h4 className="text-xl font-semibold text-[#0a1128]">Visualisation des tendances</h4>
                        <p className="text-gray-700">
                            Accédez à des graphiques interactifs montrant l'évolution des indicateurs
                            clés sur des plages temporelles personnalisables, avec zoom et filtres.
                        </p>
                    </section>

                    <section>
                        <h4 className="text-xl font-semibold text-[#0a1128]">Segmentation avancée</h4>
                        <p className="text-gray-700">
                            Filtrez et segmentez vos données par équipe, type d’activité ou période
                            pour des analyses ciblées et comparatives.
                        </p>
                    </section>

                    <section>
                        <h4 className="text-xl font-semibold text-[#0a1128]">Export des rapports</h4>
                        <p className="text-gray-700">
                            Téléchargez vos rapports personnalisés au format CSV ou PDF,
                            incluant tableaux et graphiques, prêts à être partagés.
                        </p>
                    </section>
                </div>

                {/* Illustrations */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <img
                        src="/images/features/analytics-trends.png"
                        alt="Graphiques de tendance"
                        className="w-full h-auto rounded-lg shadow"
                    />
                    <img
                        src="/images/features/analytics-segmentation.png"
                        alt="Segmentation des données"
                        className="w-full h-auto rounded-lg shadow"
                    />
                </div>
            </div>
        </div>
    );
};

export default AnalyticsAvancesPage;
