import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import HomePage from './components/HomePage';
import SurveyForm from './components/SurveyForm';
import AllClubs from './components/AllClubs';
import ClubDetail from './components/ClubDetail';
import Results from './components/Results';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation Bar */}
        <nav className="bg-orange-600 text-white shadow-lg">
          <div className="container mx-auto px-8 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="text-2xl font-bold hover:opacity-90 transition">
                🐯 Princeton Club Matcher
              </Link>
              <div className="flex gap-6">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) => 
                    `hover:underline ${isActive ? 'font-bold' : ''}`
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/match"
                  className={({ isActive }) => 
                    `hover:underline ${isActive ? 'font-bold' : ''}`
                  }
                >
                  Take Survey
                </NavLink>
                <NavLink
                  to="/clubs"
                  className={({ isActive }) => 
                    `hover:underline ${isActive ? 'font-bold' : ''}`
                  }
                >
                  All Clubs
                </NavLink>
              </div>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/match" element={<SurveyForm />} />
            <Route path="/results" element={<Results />} />
            <Route path="/clubs" element={<AllClubs />} />
            <Route path="/clubs/:id" element={<ClubDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
