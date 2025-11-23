// Load environment variables first
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Club = require('./models/Club');
const Anthropic = require('@anthropic-ai/sdk');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/princeton-clubs';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// API Routes

// GET all clubs
app.get('/api/clubs', async (req, res) => {
  try {
    const clubs = await Club.find().sort({ name: 1 });
    res.json({
      success: true,
      count: clubs.length,
      data: clubs
    });
  } catch (error) {
    console.error('Error fetching clubs:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch clubs'
    });
  }
});

// GET single club by ID
app.get('/api/clubs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid club ID format'
      });
    }
    
    const club = await Club.findById(id);
    
    if (!club) {
      return res.status(404).json({
        success: false,
        error: 'Club not found'
      });
    }
    
    res.json({
      success: true,
      data: club
    });
  } catch (error) {
    console.error('Error fetching club:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch club'
    });
  }
});

// POST match clubs using Claude API
app.post('/api/match-clubs', async (req, res) => {
  const startTime = Date.now();
  
  try {
    const { surveyResponses } = req.body;
    
    if (!surveyResponses) {
      return res.status(400).json({
        success: false,
        error: 'Survey responses are required'
      });
    }
    
    console.log('🎯 Processing match request for student:', surveyResponses.year || 'unknown');
    
    // Fetch all clubs from database
    const clubs = await Club.find().sort({ name: 1 });
    console.log(`📚 Fetched ${clubs.length} clubs from database`);
    
    // Prepare club data for Claude (exclude image field)
    const clubData = clubs.map(club => ({
      id: club._id.toString(),
      name: club.name,
      email: club.email,
      description: club.description,
      category: club.category,
      selective: club.selective,
      membershipDues: club.membershipDues,
      timeCommitment: club.timeCommitment
    }));
    
    // Format survey responses nicely
    const formattedSurvey = `
STUDENT PROFILE:
- Year: ${surveyResponses.year}
- Interests & Hobbies: ${surveyResponses.interests.join(', ')}${surveyResponses.interestsOther ? ` (Other: ${surveyResponses.interestsOther})` : ''}
- Available Time per Week: ${surveyResponses.timeCommitment}
- Budget for Membership Dues: ${surveyResponses.budget}
- Career Goals: ${surveyResponses.careerGoals || 'Not specified'}
- Social vs Professional Focus: ${surveyResponses.socialProfessionalScale}/10 (1=Social, 10=Professional)
- Contribution Preferences: ${surveyResponses.contributionPreferences.join(', ')}
- What Matters Most: ${surveyResponses.whatMatters.join(', ')}${surveyResponses.whatMattersOther ? ` (Other: ${surveyResponses.whatMattersOther})` : ''}
- Skill Preference: ${surveyResponses.skillPreference.join(', ')}
- Selectiveness Preference: ${surveyResponses.selectiveness}
- Specific Clubs of Interest: ${surveyResponses.specificClubs || 'None mentioned'}
`;

    // Create comprehensive prompt for Claude
    const prompt = `You are an expert college club advisor helping Princeton students find their perfect club matches.

${formattedSurvey}

AVAILABLE CLUBS:
${JSON.stringify(clubData, null, 2)}

INSTRUCTIONS:
- Analyze the student's interests, time commitment, budget, and preferences
- Select 8-10 clubs that best match their profile, ordered by match score (highest first)
- Include clubs from diverse categories when possible

MATCH SCORE CALCULATION (0-100):
Calculate scores based on these weighted factors:

1. INTEREST ALIGNMENT (40 points max):
   - Strong overlap between student interests and club category/activities: 35-40 points
   - Moderate overlap: 25-34 points
   - Weak overlap: 10-24 points
   - No overlap: 0-9 points

2. PRACTICAL COMPATIBILITY (30 points max):
   - Time commitment fits availability: +15 points (penalty if mismatch)
   - Membership dues within budget: +15 points (exclude club if over budget)
   - Year restrictions respected: +0 points (exclude if restricted)

3. GOALS & VALUES ALIGNMENT (20 points max):
   - Career goals match club focus: +10 points
   - Social/Professional preference matches club culture: +10 points
   - What matters most aligns with club benefits: included in above

4. ENGAGEMENT STYLE FIT (10 points max):
   - Contribution preferences match club opportunities: +5 points
   - Skill preference (use/learn) matches club level: +5 points

5. BONUS FACTORS:
   - Student specifically mentioned this club: +5 points
   - Selectiveness preference matches club: +3 points

SCORE INTERPRETATION:
- 90-100: Exceptional fit - highly recommend
- 80-89: Strong fit - very good match
- 70-79: Good fit - worth exploring
- 60-69: Moderate fit - consider if interested
- Below 60: Weak fit - do not include

IMPORTANT: For the TOP 5 matches, provide full details (reasoning, matchedInterests, commitmentLevel)
For matches 6-10, ONLY provide: clubId, clubName, and matchScore

RESPOND WITH ONLY VALID JSON IN THIS EXACT FORMAT (no other text):
{
  "matches": [
    {
      "clubId": "mongodb_id_here",
      "clubName": "Club Name",
      "matchScore": 95,
      "reasoning": "Detailed explanation of why this is a great match (2-3 sentences)",
      "matchedInterests": ["Interest 1", "Interest 2"],
      "commitmentLevel": "Description like 'Light (1-2 hours/week)' or 'Moderate (4-5 hours/week)'"
    },
    {
      "clubId": "mongodb_id_here",
      "clubName": "Another Club",
      "matchScore": 85
    }
  ],
  "summary": "Overall explanation of the matching strategy and why these clubs were selected (2-3 sentences)"
}

CRITICAL NOTES:
- Calculate match scores using the weighted system above - they should be methodical, not arbitrary
- Only include clubs scoring 60 or above
- First 5 matches must have all fields, matches 6-10 only need clubId, clubName, matchScore
- Order matches from highest to lowest score`;

    // Call Claude API
    console.log('🤖 Calling Claude API...');
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });
    
    // Log token usage for cost tracking
    console.log(`💰 Tokens used - Input: ${message.usage.input_tokens}, Output: ${message.usage.output_tokens}, Total: ${message.usage.input_tokens + message.usage.output_tokens}`);
    
    // Parse Claude's response
    let responseText = message.content[0].text;
    
    // Remove markdown code blocks if present (Claude sometimes wraps JSON in ```json ... ```)
    responseText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    let matchResult;
    
    try {
      matchResult = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse Claude response:', responseText);
      console.error('Parse error:', parseError.message);
      throw new Error('Invalid response format from AI - please try again');
    }
    
    // Validate response structure
    if (!matchResult.matches || !Array.isArray(matchResult.matches)) {
      console.error('Invalid response structure:', matchResult);
      throw new Error('Invalid response structure from AI - please try again');
    }
    
    // Return the matches
    const duration = Date.now() - startTime;
    console.log(`✅ Match request completed in ${duration}ms. Returning ${matchResult.matches.length} matches.`);
    
    res.json({
      success: true,
      matches: matchResult.matches,
      summary: matchResult.summary
    });
    
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`❌ Error matching clubs after ${duration}ms:`, error.message);
    
    // Check for specific error types
    let errorMessage = 'Failed to match clubs';
    if (error.message && error.message.includes('rate_limit')) {
      errorMessage = 'API rate limit exceeded';
    } else if (error.message && error.message.includes('timeout')) {
      errorMessage = 'Request timeout';
    }
    
    res.status(500).json({
      success: false,
      error: errorMessage,
      details: error.message
    });
  }
});

// Start server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});