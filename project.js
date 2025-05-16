const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  github: String,
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);