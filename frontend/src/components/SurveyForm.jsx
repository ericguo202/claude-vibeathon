import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SurveyForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    year: '',
    interests: [],
    interestsOther: '',
    timeCommitment: '',
    budget: '',
    careerGoals: '',
    socialProfessionalScale: 5,
    contributionPreferences: [],
    whatMatters: [],
    whatMattersOther: '',
    skillPreference: [],
    selectiveness: '',
    specificClubs: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/api/match-clubs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ surveyResponses: formData })
      });

      const result = await response.json();

      if (result.success) {
        // Navigate to results page with match data
        navigate('/results', {
          state: {
            matches: result.matches,
            summary: result.summary
          }
        });
      } else {
        // Handle specific error types
        if (result.details && result.details.includes('rate limit')) {
          setError('The AI service is currently at capacity. Please wait a minute and try again.');
        } else if (result.details && result.details.includes('timeout')) {
          setError('The request took too long. Please try again.');
        } else {
          setError(result.error || 'Failed to get matches. Please try again.');
        }
      }
    } catch (err) {
      console.error('Error submitting survey:', err);
      
      // Check if it's a network error or timeout
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        setError('Cannot connect to server. Please make sure the backend is running on port 3000.');
      } else {
        setError('An unexpected error occurred. Please try again in a moment.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Princeton Club Matcher</h1>
      <p className="mb-8">Tell us about yourself and we'll match you with clubs that fit your interests!</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Question 1: Year */}
        <div>
          <label className="block font-semibold mb-2">What year are you?</label>
          <select
            name="year"
            value={formData.year}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select your year</option>
            <option value="freshman">Freshman</option>
            <option value="sophomore">Sophomore</option>
            <option value="junior">Junior</option>
            <option value="senior">Senior</option>
          </select>
        </div>

        {/* Question 2: Interests/Hobbies */}
        <div>
          <label className="block font-semibold mb-2">What are your interests and hobbies? (Select all that apply)</label>
          <div className="space-y-2">
            {[
              'STEM/Technology',
              'Arts & Performance',
              'Writing & Journalism',
              'Sports & Fitness',
              'Outdoor Activities',
              'Business & Entrepreneurship',
              'Social Justice & Advocacy',
              'Community Service',
              'Cultural Activities',
              'Games & Recreation'
            ].map(interest => (
              <div key={interest}>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.interests.includes(interest)}
                    onChange={() => handleCheckboxChange('interests', interest)}
                    className="mr-2"
                  />
                  {interest}
                </label>
              </div>
            ))}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.interests.includes('Other')}
                  onChange={() => handleCheckboxChange('interests', 'Other')}
                  className="mr-2"
                />
                Other
              </label>
              {formData.interests.includes('Other') && (
                <input
                  type="text"
                  name="interestsOther"
                  value={formData.interestsOther}
                  onChange={handleInputChange}
                  placeholder="Please specify..."
                  className="w-full p-2 border rounded mt-2 ml-6"
                />
              )}
            </div>
          </div>
        </div>

        {/* Question 3: Time Commitment */}
        <div>
          <label className="block font-semibold mb-2">How much time can you commit per week?</label>
          <select
            name="timeCommitment"
            value={formData.timeCommitment}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select time commitment</option>
            <option value="1-2 hours/week">1-2 hours/week</option>
            <option value="3-5 hours/week">3-5 hours/week</option>
            <option value="5-10 hours/week">5-10 hours/week</option>
            <option value="10+ hours/week">10+ hours/week</option>
            <option value="Flexible">Flexible</option>
          </select>
        </div>

        {/* Question 4: Budget */}
        <div>
          <label className="block font-semibold mb-2">What's your budget for membership dues?</label>
          <select
            name="budget"
            value={formData.budget}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select budget</option>
            <option value="Free only">Free only</option>
            <option value="Under $50">Under $50</option>
            <option value="Under $100">Under $100</option>
            <option value="Under $500">Under $500</option>
            <option value="No limit">No limit</option>
          </select>
        </div>

        {/* Question 5: Career Goals */}
        <div>
          <label className="block font-semibold mb-2">What are your career goals or areas of professional interest?</label>
          <textarea
            name="careerGoals"
            value={formData.careerGoals}
            onChange={handleInputChange}
            placeholder="E.g., software engineering, law, medicine, finance, education..."
            className="w-full p-2 border rounded"
            rows="3"
          />
        </div>

        {/* Question 6: Social vs Professional Scale */}
        <div>
          <label className="block font-semibold mb-2">
            What's your focus? (1 = Purely Social, 10 = Purely Professional)
          </label>
          <div className="flex items-center gap-4">
            <span>Social</span>
            <input
              type="range"
              name="socialProfessionalScale"
              min="1"
              max="10"
              value={formData.socialProfessionalScale}
              onChange={handleInputChange}
              className="flex-1"
            />
            <span>Professional</span>
            <span className="font-bold ml-2">{formData.socialProfessionalScale}</span>
          </div>
        </div>

        {/* Question 7: Contribution Preferences */}
        <div>
          <label className="block font-semibold mb-2">How do you prefer to contribute? (Select all that apply)</label>
          <div className="space-y-2">
            {[
              'Leading/organizing events',
              'Behind-the-scenes work',
              'Direct service/helping others',
              'Creative work',
              'Research/analysis',
              'No preference'
            ].map(pref => (
              <div key={pref}>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.contributionPreferences.includes(pref)}
                    onChange={() => handleCheckboxChange('contributionPreferences', pref)}
                    className="mr-2"
                  />
                  {pref}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Question 8: What Matters Most */}
        <div>
          <label className="block font-semibold mb-2">What matters most to you? (Select your top priorities)</label>
          <div className="space-y-2">
            {[
              'Making close friends',
              'Building professional network',
              'Developing specific skills',
              'Making an impact/helping others',
              'Creative expression',
              'Physical activity',
              'Academic/intellectual growth',
              'Cultural connection'
            ].map(matter => (
              <div key={matter}>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.whatMatters.includes(matter)}
                    onChange={() => handleCheckboxChange('whatMatters', matter)}
                    className="mr-2"
                  />
                  {matter}
                </label>
              </div>
            ))}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.whatMatters.includes('Other')}
                  onChange={() => handleCheckboxChange('whatMatters', 'Other')}
                  className="mr-2"
                />
                Other
              </label>
              {formData.whatMatters.includes('Other') && (
                <input
                  type="text"
                  name="whatMattersOther"
                  value={formData.whatMattersOther}
                  onChange={handleInputChange}
                  placeholder="Please specify..."
                  className="w-full p-2 border rounded mt-2 ml-6"
                />
              )}
            </div>
          </div>
        </div>

        {/* Question 9: Skill Preference */}
        <div>
          <label className="block font-semibold mb-2">What are you looking for? (Select all that apply)</label>
          <div className="space-y-2">
            {[
              'Use skills I already have',
              'Learn completely new skills',
              'Both equally'
            ].map(pref => (
              <div key={pref}>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.skillPreference.includes(pref)}
                    onChange={() => handleCheckboxChange('skillPreference', pref)}
                    className="mr-2"
                  />
                  {pref}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Question 10: Selectiveness Preference */}
        <div>
          <label className="block font-semibold mb-2">Are you open to selective clubs (with application processes)?</label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="selectiveness"
                value="yes"
                checked={formData.selectiveness === 'yes'}
                onChange={handleInputChange}
                className="mr-2"
              />
              Yes, I'm interested in selective clubs
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="selectiveness"
                value="no"
                checked={formData.selectiveness === 'no'}
                onChange={handleInputChange}
                className="mr-2"
              />
              No, only non-selective clubs
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="selectiveness"
                value="no-preference"
                checked={formData.selectiveness === 'no-preference'}
                onChange={handleInputChange}
                className="mr-2"
              />
              No preference
            </label>
          </div>
        </div>

        {/* Question 11: Specific Clubs */}
        <div>
          <label className="block font-semibold mb-2">Any specific clubs you're already curious about? (Optional)</label>
          <textarea
            name="specificClubs"
            value={formData.specificClubs}
            onChange={handleInputChange}
            placeholder="E.g., HackPrinceton, Princeton Triangle Club, Business Today..."
            className="w-full p-2 border rounded"
            rows="2"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Loading Info Message */}
        {loading && (
          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded">
            <p className="font-semibold mb-1">🤖 AI is analyzing your profile...</p>
            <p className="text-sm">This may take 10-30 seconds as we match you with the perfect clubs. Please don't close this page!</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-6 rounded font-semibold transition ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-orange-600 text-white hover:bg-orange-700'
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Finding Your Perfect Matches...
            </span>
          ) : (
            'Find My Clubs 🎯'
          )}
        </button>
      </form>
    </div>
  );
}

export default SurveyForm;

