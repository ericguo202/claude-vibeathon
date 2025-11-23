import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function AllClubs() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    'All',
    'STEM & Technical',
    'Pre-Professional/Career Development',
    'Media & Communication',
    'Performance & Creative Arts',
    'Outdoor & Recreation',
    'Service Learning & Community Engagement',
    'Advocacy/Social Justice',
    'Research & Innovation',
    'Governance/Leadership',
    'Special Interest/Hobby',
    'Athletic',
    'Cultural/Religious',
    'Business & International Affairs',
    'Eating Club'
  ];

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/clubs');
      const result = await response.json();
      
      if (result.success) {
        setClubs(result.data);
      } else {
        setError('Failed to fetch clubs');
      }
    } catch (err) {
      setError('Error connecting to server');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Filter clubs by category and search query
  const filteredClubs = clubs.filter(club => {
    // Category filter
    const matchesCategory = selectedCategory === 'All' || club.category === selectedCategory;
    
    // Search filter (case-insensitive, starts with query)
    const matchesSearch = searchQuery === '' || 
      club.name.toLowerCase().startsWith(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="container mx-auto p-8 text-center">
        <p className="text-xl">Loading clubs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-8 text-center">
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 max-w-6xl">
      <h1 className="text-4xl font-bold mb-4">All Princeton Clubs</h1>
      <p className="text-gray-600 mb-8">Browse all {clubs.length} clubs available on campus</p>

      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div>
          <label className="block font-semibold mb-2">Search by Club Name:</label>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Type to search... (e.g., 'Hoagie', 'AI', 'Tennis')"
              className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <svg 
              className="absolute left-3 top-3 h-5 w-5 text-gray-400"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block font-semibold mb-2">Filter by Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full md:w-auto px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category} {category === 'All' ? `(${clubs.length})` : `(${clubs.filter(c => c.category === category).length})`}
              </option>
            ))}
          </select>
        </div>

        {/* Results Count */}
        {(searchQuery || selectedCategory !== 'All') && (
          <p className="text-sm text-gray-600">
            Showing <span className="font-bold text-orange-600">{filteredClubs.length}</span> of {clubs.length} clubs
            {searchQuery && <span> matching "{searchQuery}"</span>}
          </p>
        )}
      </div>

      {/* Clubs Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClubs.map(club => (
          <div key={club._id} className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">{club.name}</h3>
            
            <div className="mb-3">
              <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
                {club.category}
              </span>
              {club.selective && (
                <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded ml-2">
                  Selective
                </span>
              )}
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{club.description}</p>

            <div className="space-y-1 text-sm mb-4">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Dues:</span>
                <span>{club.membershipDues === 0 ? 'Free' : `$${club.membershipDues}`}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Time:</span>
                <span>{club.timeCommitment} hrs/week</span>
              </div>
            </div>

            <Link 
              to={`/clubs/${club._id}`}
              className="block w-full text-center bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>

      {filteredClubs.length === 0 && (
        <div className="text-center mt-8">
          <p className="text-gray-500 text-lg mb-4">
            {searchQuery 
              ? `No clubs found matching "${searchQuery}"${selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}.`
              : `No clubs found in ${selectedCategory}.`
            }
          </p>
          {(searchQuery || selectedCategory !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="text-orange-600 font-semibold hover:text-orange-700 underline"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default AllClubs;

