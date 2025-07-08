// File: src/pages/BusinessPage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users,
  BarChart3,
  Calendar as CalendarIcon,
  Shield,
  CheckCircle,
  ArrowRight,
  Award
} from 'lucide-react';
import Newsletter from '../components/Newsletter';

const features = [
  {
    icon: Users,
    title: "Gestion d'équipe",
    path: '/features/gestion-equipe',
    description: 'Planifiez et suivez les activités de vos collaborateurs',
    details: [
      'Tableau de bord récapitulatif des sessions planifiées',
      'Assignation des tâches et des créneaux par collaborateur',
      'Suivi en temps réel des présences et des performances',
      'Rapports automatisés envoyés par e-mail'
    ]
  },
  {
    icon: BarChart3,
    title: 'Analytics avancés',
    path: '/features/analytics-avances',
    description: "Tableaux de bord détaillés sur l'engagement et la satisfaction",
    details: [
      'Visualisation des tendances sur plusieurs périodes',
      'Segmentation par équipe et par activité',
      'Export des données au format CSV ou PDF'
    ]
  },
  {
    icon: CalendarIcon,
    title: 'Planification flexible',
    path: '/features/planification-flexible',
    description: 'Créez des créneaux sur mesure selon vos besoins',
    details: [
      'Glisser-déposer pour réorganiser le planning',
      'Notifications automatiques aux participants',
      'Intégration avec Google Calendar et Outlook'
    ]
  },
  {
    icon: Shield,
    title: 'Conformité RGPD',
    path: '/features/conformite-rgpd',
    description: 'Protection totale des données de vos employés',
    details: [
      'Stockage chiffré des informations sensibles',
      'Gestion des droits d’accès et des preuves de consentement',
      'Journalisation des opérations pour audit'
    ]
  }
];

const benefits = [
  'Réduction de l’absentéisme',
  'Bien-être au travail accru',
  'Cohésion d’équipe renforcée',
  'Productivité améliorée',
  'Attractivité employeur',
  'ROI mesurable'
];

const plans = [
  {
    name: 'Starter',
    price: '29€',
    period: 'mois',
    popular: false,
    features: ['Jusqu’à 25 employés', 'Activités de base', 'Support email', 'Rapports mensuels']
  },
  {
    name: 'Professional',
    price: '79€',
    period: 'mois',
    popular: true,
    features: [
      'Jusqu’à 100 employés',
      'Activités premium',
      'Support prioritaire',
      'Analytics avancés',
      'API complète'
    ]
  },
  {
    name: 'Enterprise',
    price: 'Sur mesure',
    period: '',
    popular: false,
    features: [
      'Employés illimités',
      'Toutes les activités',
      'Account manager dédié',
      'Rapports personnalisés',
      'Intégration SIRH'
    ]
  }
];

const testimonials = [
  {
    company: 'TechFlow',
    logo: '🚀',
    text: 'SportRadar Pro a transformé notre culture d’entreprise : +85 % de participation !',
    author: 'Marie Dubois, DRH'
  },
  {
    company: 'GreenCorp',
    logo: '🌱',
    text: "La cohésion d'équipe n’a jamais été aussi forte. Un vrai boost !",
    author: 'Thomas Martin, CEO'
  }
];

const BusinessPage: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const closeModal = () => setSelectedFeature(null);

  return (
    <div className="min-h-screen bg-[#C7C5C5] py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#0a1128] to-[#14213d] text-white rounded-2xl p-8">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-8">
            {/* Texte et Boutons */}
            <div className="lg:w-1/2 space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl lg:text-6xl font-extrabold leading-tight"
              >
                Le bien-être <span className="text-[#dc5f18]">entreprise</span><br />nouvelle génération
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-lg text-gray-200"
              >
                SportRadar Pro vous offre une plateforme complète pour booster
                l’engagement, suivre l’impact et garantir la conformité RGPD,
                le tout en temps réel.
              </motion.p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/request-demo"
                  className="bg-[#dc5f18] hover:brightness-110 transition px-6 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2"
                >
                  <span>Voir la démo</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="#pricing"
                  className="border-2 border-[#dc5f18] hover:bg-[#dc5f18] hover:text-white transition px-6 py-3 rounded-lg font-semibold text-[#dc5f18] text-center"
                >
                  Obtenir les tarifs
                </Link>
              </div>
              {/* Illustrations de bénéfices dans le hero */}
              <div className="grid grid-cols-3 gap-4 pt-6">
                {benefits.slice(0, 3).map((b, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <CheckCircle className="w-6 h-6 text-[#dc5f18] flex-shrink-0" />
                    <span className="text-sm text-gray-200">{b}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Démo Vidéo */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 bg-black rounded-lg overflow-hidden shadow-lg"
            >
              {/* Replace src with actual demo video or GIF */}
              <video
                src="/videos/business-demo.mp4"
                controls
                className="w-full h-auto"
              />
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-white shadow-lg rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-[#dc5f18]">500+</div>
              <div className="text-gray-600">Entreprises clientes</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#0a1128]">85%</div>
              <div className="text-gray-600">Taux de participation</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#dc5f18]">32%</div>
              <div className="text-gray-600">Réduction absentéisme</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#0a1128]">4.8/5</div>
              <div className="text-gray-600">Satisfaction employé</div>
            </div>
          </div>
        </section>

        {/* Features Section avec hover et Link */}
        <section className="bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-[#0a1128] mb-6 text-center">
            Une plateforme complète
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <Link
                  key={i}
                  to={f.path}
                  className="group block relative p-6 rounded-lg border border-gray-200 bg-gray-50 overflow-hidden"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    className="relative z-10"
                  >
                    <div className="w-12 h-12 flex items-center justify-center bg-[#dc5f18] rounded-md mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-[#0a1128] mb-2 text-lg">
                      {f.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {f.description}
                    </p>
                  </motion.div>

                </Link>
              );
            })}
          </div>
        </section>
        {/* Benefits Section */}
        <section className="bg-white shadow-lg rounded-2xl p-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2">
              <h2 className="text-2xl font-bold text-[#0a1128] mb-4">
                Des bénéfices concrets
              </h2>
              <ul className="space-y-3">
                {benefits.map((b, i) => (
                  <li key={i} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-[#dc5f18]" />
                    <span className="text-gray-600">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-6">
              {/* Mini-stats if desired */}
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <CalendarIcon className="w-10 h-10 text-[#0a1128] mx-auto mb-2" />
                <div className="font-bold text-[#dc5f18] text-2xl">+23%</div>
                <div className="text-gray-600 text-sm">Productivité</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <Users className="w-10 h-10 text-[#0a1128] mx-auto mb-2" />
                <div className="font-bold text-[#dc5f18] text-2xl">92%</div>
                <div className="text-gray-600 text-sm">Engagement</div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-[#0a1128] mb-6 text-center">
            Choisissez votre formule
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`p-6 rounded-lg transition border ${plan.popular ? 'border-[#dc5f18]' : 'border-gray-200'
                  }`}
              >
                {plan.popular && (
                  <span className="inline-block mb-4 bg-[#dc5f18] text-white px-3 py-1 rounded-full text-sm">
                    Populaire
                  </span>
                )}
                <h3 className="text-xl font-semibold text-[#0a1128] mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-[#dc5f18] mb-4">
                  {plan.price}
                  {plan.period && <span className="text-gray-600 text-lg">/{plan.period}</span>}
                </div>
                <ul className="space-y-2 mb-6 text-gray-600 text-sm">
                  {plan.features.map((f, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-[#dc5f18]" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={plan.price === 'Sur mesure' ? '/contact' : '/signup'}
                  className="block text-center bg-[#dc5f18] text-white px-4 py-2 rounded-lg font-semibold hover:brightness-110 transition"
                >
                  {plan.price === 'Sur mesure' ? 'Nous contacter' : 'Commencer'}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials & Newsletter */}
        <section className="bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-[#0a1128] mb-6 text-center">
            Ils nous font confiance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {testimonials.map((t, i) => (
              <div key={i} className="p-6 border border-gray-200 rounded-lg">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">{t.logo}</span>
                  <h3 className="text-lg font-semibold text-[#0a1128]">{t.company}</h3>
                </div>
                <p className="text-gray-600 italic mb-2">"{t.text}"</p>
                <p className="text-gray-800 font-medium">{t.author}</p>
              </div>
            ))}
          </div>
          <Newsletter />
        </section>

        {/* Call to Action */}
        <section className="bg-white shadow-lg rounded-2xl p-8 text-center">
          <Award className="w-12 h-12 text-[#dc5f18] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#0a1128] mb-4">
            Prêt·e à booster le bien-être de vos équipes ?
          </h2>
          <Link
            to="/request-demo"
            className="inline-block bg-[#dc5f18] text-white px-6 py-3 rounded-lg font-semibold hover:brightness-110 transition"
          >
            Demander une démo gratuite
          </Link>
        </section>

      </div>
    </div>
  );
}

export default BusinessPage;
