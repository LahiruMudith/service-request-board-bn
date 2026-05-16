const mongoose = require('mongoose');

const jobRequestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['Plumbing', 'Electrical', 'Painting', 'Joinery', 'Other'],
      message: '{VALUE} is not a supported category'
    }
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
  },
  contactName: {
    type: String,
    required: [true, 'Contact name is required'],
  },
  contactEmail: {
    type: String,
    required: [true, 'Contact email is required'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Closed'],
    default: 'Open',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('JobRequest', jobRequestSchema);
