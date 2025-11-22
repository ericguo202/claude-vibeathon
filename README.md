# 🐯 TigerDen

**Your Den. Your Community. Your Place at Princeton.**

TigerDen is an AI-powered platform that helps Princeton students discover clubs where they'll truly belong. Think DateDrop and MarriagePact, but for finding your place on campus and building your Princeton community.

---

## 🎯 What It Does

TigerDen uses advanced AI matching to connect Princeton students with clubs that align perfectly with their interests, goals, and lifestyle. Instead of scrolling through endless club lists or relying on word-of-mouth, students take a personalized 5-minute survey and receive intelligent recommendations powered by Claude AI.

**Key Features:**
- **Smart Matching**: AI analyzes 11+ factors including interests, time commitment, budget, career goals, and social preferences
- **Personalized Results**: Get 8-10 club recommendations ranked by match score with detailed reasoning
- **Comprehensive Database**: 40+ Princeton clubs across 14 categories (STEM, Arts, Athletics, Cultural, and more)
- **Detailed Insights**: Each top match includes why it's a good fit, matched interests, and time commitment details
- **Easy Exploration**: Browse all clubs by category or dive deep into individual club pages

---

## 🎬 3-Minute Interview Demo

[**Watch the Demo Video**](https://youtu.be/GwZiXfuwfY8)

---

## 💡 Use Cases

### Why This Helps Princeton Students

**1. Reduces Decision Paralysis**
- With 400+ student organizations at Princeton, finding the right clubs is overwhelming
- TigerDen cuts through the noise and provides personalized, data-driven recommendations
- Students discover clubs they might never have found on their own

**2. Promotes Genuine Belonging**
- Matches consider personality, goals, and values—not just surface-level interests
- Students find communities where they'll truly connect and thrive
- Reduces the trial-and-error of attending random club meetings

**3. Saves Time & Energy**
- 5-minute survey vs. hours of research and club fair browsing
- AI does the heavy lifting of matching interests with opportunities
- Instant recommendations with clear reasoning for each match

**4. Supports Diverse Engagement**
- Surfaces clubs across all categories and commitment levels
- Considers budget constraints (especially important for eating clubs)
- Helps students balance academics, social life, and extracurriculars

### How It Makes Princeton a Better Place

**Stronger Communities**: When students find clubs that truly fit, they're more engaged, committed, and likely to build meaningful friendships. This creates tighter-knit, more vibrant campus communities.

**Increased Participation**: By lowering barriers to discovery, more students—especially freshmen and those new to campus—can find their place and get involved early in their Princeton journey.

**Better Mental Health**: Finding belonging and community is crucial for student wellbeing. TigerDen helps students build social connections and support networks faster.

**More Equitable Access**: Not all students have the same social networks or knowledge about clubs. TigerDen democratizes access to information and opportunities across the entire student body.

**Data-Driven Club Growth**: Clubs can understand what attracts students to their community and optimize their messaging and recruitment strategies.

---

## 🔧 Technical Details

### Tech Stack

**Frontend**
- **Framework**: React 19 with JSX
- **Styling**: TailwindCSS 4.1
- **Routing**: React Router DOM
- **Build Tool**: Vite 7
- **State Management**: React Hooks (useState, useEffect)

**Backend**
- **Runtime**: Node.js
- **Framework**: Express.js 5
- **Database**: MongoDB with Mongoose ODM
- **AI**: Anthropic Claude API (Claude Sonnet 4)
- **Environment**: dotenv for configuration
- **CORS**: Enabled for frontend-backend communication

**Architecture**
- RESTful API design
- Client-server separation
- MongoDB for persistent storage
- AI-powered matching via Claude API
- Responsive, mobile-friendly UI

**Key API Endpoints**
- `GET /api/clubs` - Fetch all clubs
- `GET /api/clubs/:id` - Get individual club details
- `POST /api/match-clubs` - AI-powered matching endpoint

**Database Schema**
- Clubs: name, email, description, category, selective status, membership dues, time commitment, image
- 14 enumerated categories covering all aspects of Princeton life

**AI Integration**
- Structured prompts with student survey data and club database
- JSON response parsing with error handling
- Optimized token usage (~4,500 tokens per request)
- Top 5 matches get detailed reasoning; remaining matches get basic info

---

## 📝 Acknowledgements

### AI Disclosure

This project was developed with significant assistance from AI tools:
- **Claude AI (Anthropic)**: Used for both the application's core matching functionality and development assistance
- The matching algorithm, prompt engineering, and portions of the codebase were created with AI collaboration
- This represents a transparent, ethical use of AI to build tools that benefit the Princeton community

### Special Thanks

**Claude Builder Club at Princeton** - Thank you for providing free API credits that made this project possible. Your support enables students to experiment with cutting-edge AI technology and build meaningful applications for our community.

**Hoagie Club** - Thank you for organizing this hackathon and creating a space where Princeton students can collaborate, learn, and build together. Your dedication to fostering the campus tech community makes events like this possible.

**The Princeton Community** - To all the clubs, students, and organizations that make Princeton vibrant and diverse—this platform exists to help more students discover and join the incredible communities you've built.

---

## 🚀 Future Vision

TigerDen is just the beginning. Our vision is to create an all-in-one platform where Princeton students can:
- Discover and join clubs
- Stay updated on events and activities
- Connect with other members
- Manage club membership and communications
- Build a comprehensive profile of campus involvement

**Want to contribute or learn more?** Reach out to the TigerDen team!

---

*Built with 🧡 at Princeton University*

