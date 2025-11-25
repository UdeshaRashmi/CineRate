import React from 'react';
import { Users, Target, Heart, Star } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Star,
      title: 'Rate Movies',
      description: 'Share your ratings with our intuitive 5-star system and detailed reviews.'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Join a passionate community of movie lovers sharing their experiences.'
    },
    {
      icon: Target,
      title: 'Discover New Films',
      description: 'Find your next favorite movie based on community ratings and reviews.'
    },
    {
      icon: Heart,
      title: 'Share Your Passion',
      description: 'Express your love for cinema and connect with like-minded film enthusiasts.'
    }
  ];

  const team = [
    {
      name: 'Movie Lovers',
      role: 'Our Community',
      description: 'Passionate cinephiles from around the world'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-purple-900 to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            About <span className="text-purple-400">CineRate</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We're building the most passionate community of movie enthusiasts, 
            where every review matters and every rating helps others discover their next cinematic adventure.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              At CineRate, we believe that every movie deserves honest feedback and every 
              movie lover deserves a platform to share their voice. We're committed to 
              creating a space where cinematic experiences are celebrated, discussed, 
              and discovered through the power of community-driven reviews.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-gray-700 p-6 rounded-lg hover:bg-gray-650 transition-colors text-center"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-purple-600 rounded-full">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Community</h2>
          <div className="max-w-2xl mx-auto">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-gray-800 p-8 rounded-lg text-center"
              >
                <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                <p className="text-purple-400 font-semibold mb-4">{member.role}</p>
                <p className="text-gray-300">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Join Our Community?
          </h2>
          <p className="text-purple-100 text-lg mb-8">
            Start sharing your movie reviews and connect with fellow cinephiles today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/add-movie"
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Add Your First Review
            </a>
            <a
              href="/movies"
              className="border border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Browse Movies
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;