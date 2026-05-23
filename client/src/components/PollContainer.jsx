import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPoll } from '../utils/api';
import { getUserName } from '../utils/localStorage';
import { useSocket } from '../context/SocketContext';
import IdentityModal from './IdentityModal';
import VotingOptions from './VotingOptions';
import ResultsChart from './ResultsChart';

const PollContainer = () => {
  const { id } = useParams();
  const socket = useSocket();
  
  const [poll, setPoll] = useState(null);
  const [currentUser, setCurrentUser] = useState(getUserName());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // 1. Fetch initial poll data
    const fetchPoll = async () => {
      try {
        const data = await getPoll(id);
        setPoll(data);
      } catch (err) {
        setError('Poll not found or has expired.');
      } finally {
        setLoading(false);
      }
    };
    fetchPoll();
  }, [id]);

  useEffect(() => {
    // 2. Set up Socket listeners
    // We only need the socket and the URL ID to set this up.
    if (socket) {
      socket.emit('joinPoll', id);

      socket.on('pollUpdated', (updatedPoll) => {
        setPoll(updatedPoll);
      });

      return () => {
        socket.off('pollUpdated'); // Clean up when leaving the page
      };
    }
  }, [socket, id]); // <-- REMOVED `poll` FROM THIS ARRAY!

  if (loading) return <div className="text-center mt-10">Loading poll...</div>;
  if (error) return <div className="text-center mt-10 text-red-500 font-bold">{error}</div>;

  // If no username is found locally, force them to enter it
  if (!currentUser) {
    return <IdentityModal onComplete={setCurrentUser} />;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 md:p-6 bg-white rounded-xl shadow-md">
      <div className="mb-6 border-b pb-4">
        <h2 className="text-3xl font-extrabold text-gray-800">{poll.title}</h2>
        <p className="text-gray-500 mt-2">Share URL to invite friends. Voting as: <strong>{currentUser}</strong></p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <VotingOptions poll={poll} currentUser={currentUser} socket={socket} />
        <ResultsChart poll={poll} />
      </div>
    </div>
  );
};

export default PollContainer;
