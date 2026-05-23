import Poll from '../models/Poll.js';

// @desc    Create a new poll
// @route   POST /api/polls
// @access  Public
export const createPoll = async (req, res) => {
  try {
    const { title, options } = req.body;

    // 1. Basic validation
    if (!title || !options || !Array.isArray(options) || options.length === 0) {
      return res.status(400).json({ 
        message: 'A title and an array of restaurant options are required.' 
      });
    }

    // 2. Format the options array to match the Mongoose schema
    // Assuming the frontend sends an array of strings: ['Taco Shop', 'Pizza Place']
    const formattedOptions = options.map((opt) => ({
      restaurantName: opt,
      votes: [], // Initialize with zero votes
    }));

    // 3. Create and save the poll
    const newPoll = new Poll({
      title,
      options: formattedOptions,
    });

    const savedPoll = await newPoll.save();

    // 4. Send back the saved poll (the frontend needs the _id to generate the URL)
    res.status(201).json(savedPoll);

  } catch (error) {
    console.error(`Error creating poll: ${error.message}`);
    res.status(500).json({ message: 'Server error while creating the poll.' });
  }
};

// @desc    Get poll data by ID
// @route   GET /api/polls/:id
// @access  Public
export const getPoll = async (req, res) => {
  try {
    const { id } = req.params;

    const poll = await Poll.findById(id);

    // 1. Check if poll exists (or if it was auto-deleted by the 24h TTL index)
    if (!poll) {
      return res.status(404).json({ message: 'Poll not found or has expired.' });
    }

    // 2. Return the poll data to render the UI
    res.status(200).json(poll);

  } catch (error) {
    console.error(`Error fetching poll: ${error.message}`);
    
    // Handle cases where the ID provided isn't a valid MongoDB ObjectId format
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Invalid poll link.' });
    }

    res.status(500).json({ message: 'Server error while fetching the poll.' });
  }
};