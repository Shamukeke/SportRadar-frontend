import React from 'react';
import { 
  Users, 
  TrendingUp, 
  Shield, 
  Calendar,
  Award,
  BarChart3,
  Heart,
  CheckCircle,
  ArrowRight,
  Building,
  Target,
  Zap
} from 'lucide-react';

const BusinessPage: React.FC = () => {
  const features = [
    {
      icon: Users,
      title: 'Gestion d\'équipe',
      description: 'Planifiez et suivez les activités de tous vos collaborateurs'
    },
    {
      icon: BarChart3,
      title: 'Analytics avancés',
      description: 'Tableaux de bord détaillés sur l\'engagement et la satisfaction'
    },
    {
      icon: Calendar,
      title: 'Planification flexible',
      description: 'Organisez des créneaux sur mesure selon vos besoins'
    },
    {
      icon: Shield,
      title: 'Conformité RGPD',
      description: 'Protection totale des données de vos employés'
    }
  ];

  const benefits = [
    'Réduction de l\'absentéisme',
    'Amélioration du bien-être au travail',
    'Renforcement de la cohésion d\'équipe',
    'Augmentation de la productivité',
    'Attractivité employeur renforcée',
    'ROI mesurable et quantifiable'
  ];

  const plans = [
    {
      name: 'Starter',
      price: '29€',
      period: 'par mois',
      description: 'Parfait pour les petites équipes',
      features: [
        'Jusqu\'à 25 employés',
        'Activités de base',
        'Support email',
        'Rapports mensuels'
      ],
      popular: false
    },
    {
      name: 'Professional',
      price: '79€',
      period: 'par mois',
      description: 'Idéal pour les entreprises en croissance',
      features: [
        'Jusqu\'à 100 employés',
        'Activités premium',
        'Support prioritaire',
        'Analytics avancés',
        'Événements sur mesure',
        'API complète'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Sur mesure',
      period: '',
      description: 'Solution complète pour les grandes organisations',
      features: [
        'Employés illimités',
        'Toutes les activités',
        'Account manager dédié',
        'Rapports personnalisés',
        'Intégration SIRH',
        'Formation équipes'
      ],
      popular: false
    }
  ];

  const testimonials = [
    {
      company: 'TechFlow',
      logo: '🚀',
      text: 'SportRadar a révolutionné notre approche du bien-être. 85% de participation en 3 mois !',
      author: 'Marie Dubois, DRH'
    },
    {
      company: 'GreenCorp',
      logo: '🌱',
      text: 'L\'impact sur la cohésion d\'équipe est remarquable. Un investissement qui en vaut la peine.',
      author: 'Thomas Martin, CEO'
    }
  ];

  return (
    <div className="min-h-screen #0a1128">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sky-600 via-sky-700 to-emerald-600 text-gray-200 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 #0a1128/20 rounded-2xl flex items-center justify-center">
                <Building className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Bien-être entreprise<br />
              <span className="text-sky-200">nouvelle génération</span>
            </h1>
            <p className="text-xl text-sky-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transformez la culture de votre entreprise avec SportRadar Pro. 
              Des solutions sur mesure pour le bien-être de vos équipes, 
              avec des résultats mesurables et un impact durable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="#0a1128 text-sky-700 px-8 py-4 rounded-xl text-lg font-semibold hover:#0a1128 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2">
                <span>Demander une démo</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border-2 border-white text-gray-200 px-8 py-4 rounded-xl text-lg font-semibold hover:#0a1128 hover:text-sky-700 transition-all duration-300">
                Voir les tarifs
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 #0a1128">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-sky-600">500+</div>
              <div className="text-gray-600">Entreprises partenaires</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-emerald-600">85%</div>
              <div className="text-gray-600">Taux de participation moyen</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-orange-600">-32%</div>
              <div className="text-gray-600">Réduction de l'absentéisme</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-purple-600">4.8/5</div>
              <div className="text-gray-600">Satisfaction employés</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 #0a1128">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-400 mb-4">
              Une plateforme complète pour vos équipes
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tous les outils nécessaires pour créer une culture d'entreprise axée sur le bien-être
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group p-8 #0a1128 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="w-14 h-14 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-gray-200" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-400 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 #0a1128">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-400 mb-6">
                Des bénéfices concrets pour votre entreprise
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                Notre approche scientifique du bien-être en entreprise génère des résultats 
                mesurables et durables pour vos équipes et votre organisation.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                    <span className="text-gray-400 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-sky-50 p-6 rounded-2xl text-center">
                <TrendingUp className="w-12 h-12 text-sky-600 mx-auto mb-4" />
                <div className="text-2xl font-bold text-sky-700">+23%</div>
                <div className="text-sm text-sky-600">Productivité</div>
              </div>
              <div className="bg-emerald-50 p-6 rounded-2xl text-center">
                <Heart className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <div className="text-2xl font-bold text-emerald-700">92%</div>
                <div className="text-sm text-emerald-600">Bien-être</div>
              </div>
              <div className="bg-orange-50 p-6 rounded-2xl text-center">
                <Target className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <div className="text-2xl font-bold text-orange-700">-45%</div>
                <div className="text-sm text-orange-600">Turnover</div>
              </div>
              <div className="bg-purple-50 p-6 rounded-2xl text-center">
                <Zap className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <div className="text-2xl font-bold text-purple-700">3.2x</div>
                <div className="text-sm text-purple-600">ROI moyen</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 #0a1128">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-400 mb-4">
              Des offres adaptées à votre taille
            </h2>
            <p className="text-gray-600 text-lg">
              Choisissez la formule qui correspond le mieux aux besoins de votre entreprise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative #0a1128 rounded-2xl shadow-sm p-8 ${
                  plan.popular 
                    ? 'border-2 border-sky-500 transform scale-105' 
                    : 'border border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-sky-500 text-gray-200 px-4 py-2 rounded-full text-sm font-semibold">
                      Le plus populaire
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-400 mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-400">{plan.price}</span>
                    {plan.period && <span className="text-gray-600 ml-2">{plan.period}</span>}
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <span className="text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                    plan.popular
                      ? '#e63946 text-gray-200 hover:brightness-110'
                      : '#0a1128 text-gray-400 hover:#0a1128'
                  }`}
                >
                  {plan.price === 'Sur mesure' ? 'Nous contacter' : 'Commencer l\'essai'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 #0a1128">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-400 mb-4">
              Ils nous font confiance
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="#0a1128 p-8 rounded-2xl">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 #0a1128 rounded-lg flex items-center justify-center text-2xl mr-4">
                    {testimonial.logo}
                  </div>
                  <div className="font-bold text-gray-400 text-lg">{testimonial.company}</div>
                </div>
                <p className="text-gray-400 mb-6 text-lg italic">"{testimonial.text}"</p>
                <div className="text-gray-600">{testimonial.author}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-sky-600 to-emerald-600 text-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Award className="w-16 h-16 text-gray-200 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">
            Prêt à transformer votre entreprise ?
          </h2>
          <p className="text-xl text-sky-100 mb-8">
            Rejoignez les centaines d'entreprises qui ont déjà fait le choix du bien-être
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="#0a1128 text-sky-700 px-8 py-4 rounded-xl text-lg font-semibold hover:#0a1128 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Demander une démo gratuite
            </button>
            <button className="border-2 border-white text-gray-200 px-8 py-4 rounded-xl text-lg font-semibold hover:#0a1128 hover:text-sky-700 transition-all duration-300">
              Parler à un expert
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BusinessPage;