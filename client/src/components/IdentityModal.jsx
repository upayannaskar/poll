import React, { useState } from 'react';
import { setUserName } from '../utils/localStorage';

const IdentityModal = ({ onComplete }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      setUserName(name.trim());
      onComplete(name.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full">
        <h3 className="text-xl font-bold mb-2 text-center">Who's voting?</h3>
        <p className="text-gray-600 mb-4 text-center text-sm">Enter your name so your friends know what you picked.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            required
            autoFocus
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 text-center"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Join Poll
          </button>
        </form>
      </div>
    </div>
  );
};

export default IdentityModal;