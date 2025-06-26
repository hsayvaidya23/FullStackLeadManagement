const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  contact: {
    type: String,
    required: [true, 'Please add a phone number']
  },
  altContact: String,
  altEmail: String,
  status: {
    type: String,
    enum: ['New', 'Follow-Up', 'Qualified', 'Converted'],
    default: 'New'
  },
  qualification: {
    type: String,
    enum: ['High School', 'Bachelors', 'Masters', 'PhD', 'Other'],
    required: true
  },
  interest: {
    type: String,
    enum: ['Web Development', 'Mobile Development', 'Data Science', 'UI/UX Design', 'Digital Marketing'],
    required: true
  },
  source: {
    type: String,
    enum: ['Website', 'Social Media', 'Email Campaign', 'Cold Call', 'Other'],
    required: true
  },
  assignedTo: {
    type: String,
    required: true
  },
  updatedAt: {
    type: String,
    // default: Date.now
  },
  notes: String,
  city: String,
  state: String,
  passoutYear: Number,
  heardFrom: String
});

module.exports = mongoose.model('Lead', LeadSchema);