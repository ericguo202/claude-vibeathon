import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function ClubDetail() {
  const { id } = useParams(); // Get the club ID from URL parameter
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClub();
  }, [id]);

  const fetchClub = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/api/clubs/${id}`);
      const result = await response.json();
      
      if (result.success) {
        setClub(result.data);
      } else {
        setError(result.error || 'Failed to fetch club');
      }
    } catch (err) {
      setError('Error connecting to server');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-8 text-center">
        <p className="text-xl">Loading club details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-8 text-center">
        <p className="text-xl text-red-600 mb-4">{error}</p>
        <Link to="/clubs" className="text-blue-600 hover:underline">
          ← Back to All Clubs
        </Link>
      </div>
    );
  }

  if (!club) {
    return (
      <div className="container mx-auto p-8 text-center">
        <p className="text-xl text-gray-600 mb-4">Club not found</p>
        <Link to="/clubs" className="text-blue-600 hover:underline">
          ← Back to All Clubs
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      {/* Back Button */}
      <Link to="/clubs" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to All Clubs
      </Link>

      {/* Club Header with Image */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
        <div className="h-64 overflow-hidden bg-gray-200">
          <img 
            src={`/src/assets/${club.image}`} 
            alt={club.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-4">{club.name}</h1>
          
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">
              {club.category}
            </span>
            {club.selective && (
              <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                Selective
              </span>
            )}
            <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
              {club.timeCommitment} hrs/week
            </span>
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
              {club.membershipDues === 0 ? 'Free' : `$${club.membershipDues}`}
            </span>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">About</h2>
            <p className="text-gray-700 leading-relaxed">{club.description}</p>
          </div>

          {/* Club Information Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Contact</h3>
              <a 
                href={`mailto:${club.email}`} 
                className="text-blue-600 hover:underline break-all"
              >
                {club.email}
              </a>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Time Commitment</h3>
              <p className="text-gray-700">{club.timeCommitment} hours per week</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Membership Dues</h3>
              <p className="text-gray-700">
                {club.membershipDues === 0 ? 'Free' : `$${club.membershipDues} per year`}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Application Process</h3>
              <p className="text-gray-700">
                {club.selective ? 'Selective - Application Required' : 'Open to All'}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <a
              href={`mailto:${club.email}`}
              className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
            >
              Contact Club
            </a>
            <Link
              to="/match"
              className="bg-white text-orange-600 border-2 border-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition"
            >
              Find Similar Clubs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClubDetail;

