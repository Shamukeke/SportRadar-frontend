import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Users, Shield, Zap, Heart, Star } from 'lucide-react';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: MapPin,
      title: 'Activités locales',
      description: 'Découvrez toutes les activités sportives près de chez vous'
    },
    {
      icon: Zap,
      title: 'Recommandations intelligentes',
      description: 'Suggestions personnalisées selon vos préférences et la météo'
    },
    {
      icon: Shield,
      title: 'Badge SportZen',
      description: 'Identifiez les lieux bienveillants et non-compétitifs'
    },
    {
      icon: Users,
      title: 'Offres entreprises',
      description: 'Solutions bien-être sur mesure pour les professionnels'
    }
  ];

  const testimonials = [
    {
      name: 'Marie L.',
      role: 'Utilisatrice',
      content: 'Grâce à SportRadar, j\'ai retrouvé le plaisir de bouger ! Les recommandations sont parfaites.',
      rating: 5
    },
    {
      name: 'Tech Solutions',
      role: 'Entreprise',
      content: 'Le pack bien-être entreprise a transformé l\'ambiance de nos équipes. Très professionnel.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-sky-50 via-white to-emerald-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Retrouvez le <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-emerald-600">plaisir</span><br />
              de bouger
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              SportRadar vous accompagne dans votre reprise d'activité sportive avec des recommandations 
              personnalisées, des activités locales et une approche bienveillante du bien-être.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/activities"
                className="bg-sky-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-sky-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <span>Découvrir les activités</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/login"
                className="border-2 border-sky-600 text-sky-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-sky-600 hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                Créer mon compte
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-sky-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-16 h-16 bg-emerald-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-orange-200 rounded-full opacity-20 animate-pulse delay-500"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Une approche innovante du bien-être
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez nos fonctionnalités pensées pour vous accompagner dans votre parcours sportif
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-sky-600 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold">500+</div>
              <div className="text-sky-100">Activités référencées</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold">10k+</div>
              <div className="text-sky-100">Utilisateurs actifs</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold">95%</div>
              <div className="text-sky-100">Satisfaction utilisateur</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ce qu'ils disent de nous</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-sky-50 to-emerald-50 rounded-3xl p-12">
            <Heart className="w-16 h-16 text-sky-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Prêt à commencer votre parcours bien-être ?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Rejoignez des milliers d'utilisateurs qui ont déjà transformé leur quotidien
            </p>
            <Link
              to="/login"
              className="bg-sky-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-sky-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center space-x-2"
            >
              <span>Commencer maintenant</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;