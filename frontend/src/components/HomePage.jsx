import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="container mx-auto px-8 py-16 max-w-5xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-orange-600 mb-4">
            Princeton Club Matcher
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Find your perfect club match at Princeton University
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Answer a few questions about your interests, goals, and preferences, 
            and we'll use AI to match you with clubs that align with what you're looking for.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link 
            to="/match"
            className="bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-700 transition text-center"
          >
            Take the Survey
          </Link>
          <Link 
            to="/clubs"
            className="bg-white text-orange-600 border-2 border-orange-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-50 transition text-center"
          >
            Browse All Clubs
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered Matching</h3>
            <p className="text-gray-600">
              Our intelligent system analyzes your responses to find clubs that truly fit your interests and goals.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Quick & Easy</h3>
            <p className="text-gray-600">
              Just 5 minutes to complete the survey and discover clubs you'll love.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">🌟</div>
            <h3 className="text-xl font-semibold mb-2">40+ Clubs</h3>
            <p className="text-gray-600">
              From tech to arts, sports to service — explore diverse opportunities across campus.
            </p>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h4 className="font-semibold">Answer Questions</h4>
                <p className="text-gray-600">Tell us about your interests, time commitment, budget, and goals.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h4 className="font-semibold">Get Matched</h4>
                <p className="text-gray-600">Our AI analyzes your responses and matches you with relevant clubs.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h4 className="font-semibold">Explore & Connect</h4>
                <p className="text-gray-600">Review your personalized recommendations and reach out to clubs you're interested in.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

