import mongoose from 'mongoose';

const pollSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  options: [
    {
      restaurantName: { 
        type: String, 
        required: true 
      },
      // Array of names of users who voted for this specific option
      votes: [{ 
        type: String 
      }] 
    }
  ],
  createdAt: { 
    type: Date, 
    default: Date.now, 
    // TTL Index: MongoDB will automatically delete the document after 86,400 seconds (24 hours)
    expires: 86400 
  }
});

const Poll = mongoose.model('Poll', pollSchema);

export default Poll;