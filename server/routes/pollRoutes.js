import express from 'express';
import { createPoll, getPoll } from '../controllers/pollController.js';

const router = express.Router();

// @route   POST /api/polls
// @desc    Create a new poll
router.post('/', createPoll);

// @route   GET /api/polls/:id
// @desc    Fetch a specific poll by ID
router.get('/:id', getPoll);

export default router;