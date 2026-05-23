import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import pollRoutes from './routes/pollRoutes.js';
import Poll from './models/Poll.js'; 

// Initialize environment variables and connect to the database
dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

// Configure Socket.io with CORS settings to allow your Vite frontend to connect
// 1. Configure Socket.io
const io = new Server(server, {
  cors: {
    // Hardcode your Vercel URL here in an array to guarantee it matches
    origin: [
      'http://localhost:5173', 
      'https://poller-client.vercel.app' // <-- Make sure there is NO trailing slash here!
    ], 
    methods: ['GET', 'POST'],
    credentials: true 
  }
});

// 2. Standard Express Middleware
app.use(cors({
  origin: [
    'http://localhost:5173', 
    'https://poller-client.vercel.app' // <-- Hardcode here too!
  ], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());

// Mount the REST API routes
app.use('/api/polls', pollRoutes);

// --- WebSocket Real-Time Logic ---
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // 1. Join a specific poll's "room" so broadcasts only go to relevant users
  socket.on('joinPoll', (pollId) => {
    socket.join(pollId);
    console.log(`Socket ${socket.id} joined poll: ${pollId}`);
  });

  // 2. Handle the real-time voting event
  socket.on('castVote', async ({ pollId, restaurantName, voterName }) => {
    try {
      console.log(`Received vote for ${restaurantName} from ${voterName}`); // Debugging log
      
      const poll = await Poll.findById(pollId);
      if (!poll) return;

      // Ensure the user only has one active vote by removing their name from all options first
      poll.options.forEach((opt) => {
        opt.votes = opt.votes.filter((name) => name !== voterName);
      });

      // Add the user's name to the newly selected restaurant
      const selectedOption = poll.options.find(
        (opt) => opt.restaurantName === restaurantName
      );
      
      if (selectedOption) {
        selectedOption.votes.push(voterName);
        
        // --- THE CRITICAL FIX ---
        // Explicitly tell Mongoose that the nested array has been modified
        poll.markModified('options'); 
        
        // Save the updated state to MongoDB
        const updatedPoll = await poll.save();

        // Broadcast the updated poll ONLY to users looking at this specific poll URL
        io.to(pollId).emit('pollUpdated', updatedPoll);
      }
    } catch (error) {
      console.error(`Socket voting error: ${error.message}`);
    }
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
