import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Users, Shield, Zap, Heart, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
  const features = [
    { icon: MapPin, title: 'Activités locales', description: 'Découvrez toutes les activités sportives près de chez vous' },
    { icon: Zap, title: 'Recommandations intelligentes', description: 'Suggestions personnalisées selon vos préférences et la météo' },
    { icon: Shield, title: 'Badge SportZen', description: 'Identifiez les lieux bienveillants et non-compétitifs' },
    { icon: Users, title: 'Offres entreprises', description: 'Solutions bien-être sur mesure pour les professionnels' }
  ];

  const testimonials = [
    { name: 'Marie L.', role: 'Utilisatrice', content: "Grâce à SportRadar, j'ai retrouvé le plaisir de bouger ! Les recommandations sont parfaites.", rating: 5 },
    { name: 'Tech Solutions', role: 'Entreprise', content: "Le pack bien-être entreprise a transformé l'ambiance de nos équipes. Très professionnel.", rating: 5 }
  ];

  // Carousel images
  const images = [
    "/images/hero/yoga.png",
    "/images/hero/swiming.png",
    "/images/hero/runing.jpeg",
    "/images/hero/boxing.png",
    "/images/hero/dance.png",
  ];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen font-sans text-gray-800">
      {/* Hero Section with Carousel */}
      <section className="relative bg-gradient-to-br from-red-50 via-white to-red-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left: Image Carousel */}
            <div className="lg:w-1/2 w-full">
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <img
                  src={images[current]}
                  alt="Sport"
                  className="w-full h-80 lg:h-96 object-cover transition-opacity duration-1000"
                  key={current}
                />
              </div>
            </div>
            {/* Right: Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 w-full text-center lg:text-left"
            >
              <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
                Retrouvez le{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">plaisir</span>
                <br /> de bouger
              </h1>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                SportRadar vous accompagne dans votre reprise d'activité sportive avec des recommandations personnalisées,
                des activités locales et une approche bienveillante du bien-être.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/activities"
                  className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:brightness-110 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center space-x-2"
                >
                  <span>Découvrir les activités</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/login"
                  className="border-2 border-red-600 text-red-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-red-600 hover:text-white transition-all duration-300 transform hover:scale-105"
                >
                  Créer mon compte
                </Link>
              </div>
            </motion.div>
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