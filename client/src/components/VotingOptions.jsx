import React from 'react';

const VotingOptions = ({ poll, currentUser, socket }) => {
  
 const handleVote = (restaurantName) => {
  console.log("1. Click registered for:", restaurantName);
  console.log("2. Voter Name is:", currentUser);
  console.log("3. Poll ID is:", poll._id);
  console.log("4. Is Socket connected?", socket ? socket.connected : false);

  if (socket) {
    socket.emit('castVote', {
      pollId: poll._id,
      restaurantName,
      voterName: currentUser
    });
    console.log("5. Emission sent to backend!");
  } else {
    console.warn("SOCKET IS NULL OR UNDEFINED");
  }
};

  // Helper to check if the current user voted for a specific option
  const hasVotedFor = (option) => option.votes.includes(currentUser);

  return (
    <div>
      <h3 className="text-xl font-bold mb-4 text-gray-700">Cast Your Vote</h3>
      <div className="space-y-3">
        {poll.options.map((option) => (
          <button
            key={option._id || option.restaurantName}
            onClick={() => handleVote(option.restaurantName)}
            className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
              hasVotedFor(option)
                ? 'border-blue-500 bg-blue-50 text-blue-800 font-bold shadow-sm'
                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50 text-gray-700'
            }`}
          >
            {option.restaurantName}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VotingOptions;
