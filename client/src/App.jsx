import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SocketProvider } from './context/SocketContext';

// Components
import CreatePoll from './components/CreatePoll';
import PollContainer from './components/PollContainer';

const App = () => {
  return (
    // Wrap the entire app in the SocketProvider so any component can access the live connection
    <SocketProvider>
      <Router>
        {/* Global Layout Wrapper */}
        <div className="min-h-screen bg-gray-100 font-sans text-gray-900 pb-12">
          
          {/* Global Header */}
          <header className="bg-white shadow-sm p-4 mb-8">
            <div className="max-w-3xl mx-auto flex items-center justify-center">
              <a href="/" className="hover:opacity-80 transition-opacity">
                <h1 className="text-3xl font-extrabold text-blue-600 tracking-tight">
                  🍕 Where Should We Eat?
                </h1>
              </a>
            </div>
          </header>

          {/* Main Content Area Routing */}
          <main className="px-4">
            <Routes>
              {/* Homepage: Create a new poll */}
              <Route path="/" element={<CreatePoll />} />
              
              {/* Shareable Poll Link */}
              <Route path="/poll/:id" element={<PollContainer />} />
              
              {/* Catch-all for invalid or malformed URLs */}
              <Route 
                path="*" 
                element={
                  <div className="text-center mt-20">
                    <h2 className="text-2xl font-bold text-gray-700">404 - Page Not Found</h2>
                    <p className="text-gray-500 mt-2">Looks like this poll doesn't exist.</p>
                    <a href="/" className="text-blue-500 hover:underline mt-4 inline-block font-medium">
                      Create a new poll
                    </a>
                  </div>
                } 
              />
            </Routes>
          </main>

        </div>
      </Router>
    </SocketProvider>
  );
};

export default App;