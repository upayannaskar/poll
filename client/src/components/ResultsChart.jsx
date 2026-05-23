import React from 'react';

const ResultsChart = ({ poll }) => {
  // Calculate total votes across all options to determine bar widths
  const totalVotes = poll.options.reduce((acc, option) => acc + option.votes.length, 0);

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
      <h3 className="text-xl font-bold mb-4 text-gray-700">Live Results</h3>
      
      {totalVotes === 0 ? (
        <p className="text-gray-500 italic">No votes cast yet. Be the first!</p>
      ) : (
        <div className="space-y-5">
          {poll.options.map((option) => {
            const voteCount = option.votes.length;
            const percentage = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0;

            return (
              <div key={option._id || option.restaurantName}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-semibold text-gray-700">{option.restaurantName}</span>
                  <span className="text-gray-500">{voteCount} vote{voteCount !== 1 && 's'}</span>
                </div>
                
                {/* Visual Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1 overflow-hidden">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>

                {/* Voter Names Array */}
                {voteCount > 0 && (
                  <p className="text-xs text-gray-500">
                    Voted by: <span className="font-medium text-gray-600">{option.votes.join(', ')}</span>
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ResultsChart;