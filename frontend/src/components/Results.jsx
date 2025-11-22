import { useLocation, Link } from 'react-router-dom';

function Results() {
  const location = useLocation();
  const { matches, summary } = location.state || { matches: [], summary: '' };

  // Split matches into top 5 and others
  const topMatches = matches.slice(0, 5);
  const otherMatches = matches.slice(5);

  if (!matches || matches.length === 0) {
    return (
      <div className="container mx-auto p-8 max-w-4xl text-center">
        <h1 className="text-3xl font-bold mb-4">No Results Found</h1>
        <p className="text-gray-600 mb-6">
          Please take the survey first to get your personalized club recommendations.
        </p>
        <Link
          to="/match"
          className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
        >
          Take Survey
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="text-5xl mb-4">🐯</div>
        <h1 className="text-4xl font-bold text-orange-600 mb-4">Welcome to Your Den! 🎯</h1>
        
        {/* Summary from Claude */}
        <div className="bg-orange-50 border-l-4 border-orange-600 p-6 rounded-lg">
          <p className="text-lg text-gray-800">{summary}</p>
        </div>
      </div>

      {/* Top 5 Matches Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">🌟 Your Top {topMatches.length} Matches</h2>
        <p className="text-gray-600 mb-6">
          These clubs are the best fit based on your survey responses!
        </p>

        <div className="space-y-6">
          {topMatches.map((match, index) => (
            <div
              key={match.clubId}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                {/* Match Rank Badge */}
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 flex flex-col items-center justify-center md:w-32">
                  <div className="text-sm font-semibold mb-1">Match #{index + 1}</div>
                  <div className="text-4xl font-bold">{match.matchScore}</div>
                  <div className="text-xs mt-1">Score</div>
                </div>

                {/* Club Details */}
                <div className="flex-1 p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{match.clubName}</h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-block bg-orange-100 text-orange-800 text-xs px-3 py-1 rounded-full font-semibold">
                          {match.commitmentLevel}
                        </span>
                        {match.matchedInterests && match.matchedInterests.map(interest => (
                          <span
                            key={interest}
                            className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Match Reasoning */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <span className="text-lg mr-2">💡</span>
                      Why this club?
                    </h4>
                    <p className="text-gray-700 leading-relaxed">{match.reasoning}</p>
                  </div>

                  {/* Action Button */}
                  <Link
                    to={`/clubs/${match.clubId}`}
                    className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
                  >
                    View Club Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Other Matches Section */}
      {otherMatches.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">✨ Other Great Options</h2>
          <p className="text-gray-600 mb-6">
            These clubs also match your interests and are worth exploring!
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {otherMatches.map((match, index) => (
              <div
                key={match.clubId}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-5 border border-gray-200"
              >
                <div className="flex items-start gap-4">
                  {/* Compact Score Badge */}
                  <div className="flex-shrink-0 bg-gradient-to-br from-orange-400 to-orange-500 text-white rounded-lg p-3 text-center min-w-[60px]">
                    <div className="text-xs font-semibold">#{index + 6}</div>
                    <div className="text-2xl font-bold">{match.matchScore}</div>
                  </div>

                  {/* Compact Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold mb-2 truncate">{match.clubName}</h3>
                    
                    {/* Only show badges if data is available */}
                    {(match.commitmentLevel || match.matchedInterests) && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {match.commitmentLevel && (
                          <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
                            {match.commitmentLevel}
                          </span>
                        )}
                        {match.matchedInterests && match.matchedInterests.slice(0, 2).map(interest => (
                          <span
                            key={interest}
                            className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    )}

                    <Link
                      to={`/clubs/${match.clubId}`}
                      className="inline-block text-orange-600 font-semibold text-sm hover:text-orange-700 transition"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer Actions */}
      <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/clubs"
          className="bg-white text-orange-600 border-2 border-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition text-center"
        >
          Browse All Clubs
        </Link>
        <Link
          to="/match"
          className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition text-center"
        >
          Take Survey Again
        </Link>
      </div>
    </div>
  );
}

export default Results;

