// src/pages/LegalPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const LegalPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#C7C5C5] py-16 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-8">
                <h1 className="text-4xl font-bold text-[#0a1128] text-center mb-4">Mentions légales</h1>

                {/* Éditeur du site */}
                <section>
                    <h2 className="text-2xl font-semibold text-[#0a1128] mb-2">Éditeur</h2>
                    <p className="text-gray-700">
                        VitaMobilis <br />
                        SAS au capital de 40 000 €<br />
                        Siège social : 11 rue de la Santé, 75013 Paris, France<br />
                        SIREN :  841 222 897  – RCS Paris 841 222 897 <br />
                        contact@vitamobilis.fr – Tél. : 01 23 45 67 89<br />

                    </p>
                </section>

                {/* Hébergeur */}
                <section>
                    <h2 className="text-2xl font-semibold text-[#0a1128] mb-2">Hébergeur</h2>
                    <p className="text-gray-700">
                        Vercel Inc.<br />
                        340 S Lemon Ave #4133, Walnut, CA 91789, USA<br />
                        Site : <a href="https://vercel.com" className="text-[#dc5f18] hover:underline">vercel.com</a>
                    </p>
                </section>

                {/* Propriété intellectuelle */}
                <section>
                    <h2 className="text-2xl font-semibold text-[#0a1128] mb-2">Propriété intellectuelle</h2>
                    <p className="text-gray-700">
                        Tous les contenus (textes, images, logos, vidéos, etc.) présents sur SportRadar sont la propriété exclusive de SportRadar ou de ses partenaires.
                        Toute reproduction, distribution ou adaptation, en tout ou partie, est strictement interdite sans autorisation écrite préalable.
                    </p>
                </section>

                {/* Données personnelles */}
                <section>
                    <h2 className="text-2xl font-semibold text-[#0a1128] mb-2">Données personnelles</h2>
                    <p className="text-gray-700">
                        Conformément à la loi « Informatique et Libertés » du 6 janvier 1978 modifiée et au RGPD, vous disposez d’un droit d’accès, de rectification et de suppression des données qui vous concernent.
                        Pour l’exercer, contactez-nous à l’adresse : <a href="mailto:contact@sportradar.com" className="text-[#dc5f18] hover:underline">contact@sportradar.com</a>.
                    </p>
                </section>

                {/* Cookies */}
                <section>
                    <h2 className="text-2xl font-semibold text-[#0a1128] mb-2">Cookies</h2>
                    <p className="text-gray-700">
                        Ce site utilise des cookies indispensables à son fonctionnement et à la mesure d’audience. Vous pouvez désactiver ces traceurs via les paramètres de votre navigateur.
                    </p>
                </section>

                {/* Responsabilité */}
                <section>
                    <h2 className="text-2xl font-semibold text-[#0a1128] mb-2">Responsabilité</h2>
                    <p className="text-gray-700">
                        VitaMobilis ne saurait être tenue responsable des dommages directs ou indirects pouvant résulter de l’accès ou de l’utilisation du site.
                    </p>
                </section>

                {/* Conditions d’utilisation*/}
                <section>
                    <h2 className="text-2xl font-semibold text-[#0a1128] mb-2">Conditions d’utilisation</h2>
                    <p className="text-gray-700">
                        L’utilisation de ce site implique l’acceptation pleine et entière des présentes conditions.
                    </p>
                </section>

                {/* Date de mise à jour*/}
                <section>
                    <h2 className="text-2xl font-semibold text-[#0a1128] mb-2">Dernière mise à jour</h2>
                    <p className="text-gray-700">
                        16 juillet 2025
                    </p>
                </section>



                {/* Retour à l’accueil */}
                <div className="text-center">
                    <Link to="/" className="text-[#dc5f18] hover:underline font-semibold">
                        ← Retour à l’accueil
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LegalPage;
