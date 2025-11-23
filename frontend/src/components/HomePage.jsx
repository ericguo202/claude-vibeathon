import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function HomePage() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="container mx-auto px-8 py-16 max-w-5xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="text-6xl mb-4">🐯</div>
          <h1 className="text-6xl font-bold text-orange-600 mb-4">
            TigerDen
          </h1>
          <p className="text-2xl font-semibold text-gray-800 mb-6">
            Your Den. Your Community. Your Place at Princeton.
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-4">
            Like <span className="font-semibold text-orange-600">DateDrop</span> and <span className="font-semibold text-orange-600">MarriagePact</span> but for finding clubs and your place on campus.
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Take our AI-powered quiz to discover clubs where you'll truly belong, meet your people, 
            and find your pack at Princeton.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link 
            to="/match"
            className="bg-orange-600 text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-orange-700 transition text-center shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Find Your Den
          </Link>
          <Link 
            to="/clubs"
            className="bg-white text-orange-600 border-2 border-orange-600 px-10 py-4 rounded-lg font-semibold text-lg hover:bg-orange-50 transition text-center shadow-md"
          >
            Browse All Clubs
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-orange-500">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold mb-2">Smart AI Matching</h3>
            <p className="text-gray-600">
              Our AI analyzes your interests, goals, and personality to match you with clubs where you'll truly thrive.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-orange-500">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-semibold mb-2">Find Your People</h3>
            <p className="text-gray-600">
              Connect with clubs and communities that share your passions and help you build lifelong friendships.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-orange-500">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Quick & Personalized</h3>
            <p className="text-gray-600">
              Just 5 minutes to get personalized recommendations tailored specifically to you and your Princeton journey.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white p-8 rounded-xl shadow-lg mb-16">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">40+</div>
              <div className="text-orange-100">Campus Clubs</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">14</div>
              <div className="text-orange-100">Club Categories</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">AI</div>
              <div className="text-orange-100">Powered Matching</div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            How TigerDen Works
          </h2>
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-md">
                1
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Share Your Story</h4>
                <p className="text-gray-600">
                  Tell us about your interests, hobbies, career goals, time availability, and what matters most to you. 
                  The more we know, the better we can match you!
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-md">
                2
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">AI Finds Your Match</h4>
                <p className="text-gray-600">
                  Our intelligent matching algorithm analyzes your profile against dozens of Princeton clubs 
                  to find the perfect fit for your unique interests and goals.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-md">
                3
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Discover Your Den</h4>
                <p className="text-gray-600">
                  Get personalized recommendations with detailed explanations of why each club is a great match. 
                  Explore club details, reach out to officers, and find your community!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center bg-orange-50 p-10 rounded-xl border-2 border-orange-200">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Ready to Find Your Place at Princeton?
          </h3>
          <p className="text-gray-600 mb-6">
            Join tigers like you in discovering where they belong on campus.
          </p>
          <Link 
            to="/match"
            className="inline-block bg-orange-600 text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-orange-700 transition shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            🐯 Start Your Journey
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

