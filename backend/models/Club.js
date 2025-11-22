const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      'STEM & Technical',
      'Pre-Professional/Career Development',
      'Media & Communication',
      'Performance & Creative Arts',
      'Outdoor & Recreation',
      'Service Learning & Community Engagement',
      'Advocacy/Social Justice',
      'Research & Innovation',
      'Governance/Leadership',
      'Special Interest/Hobby',
      'Athletic',
      'Cultural/Religious',
      'Business & International Affairs',
      'Eating Club'
    ]
  },
  selective: {
    type: Boolean,
    default: false
  },
  membershipDues: {
    type: Number,
    default: 0,
    min: 0
  },
  timeCommitment: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  image: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Club = mongoose.model('Club', clubSchema);

module.exports = Club;

