const mongoose = require('mongoose');

const CodeEntitySchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  filePath: { type: String, required: true },
  entityName: { type: String, required: true },
  rawCode: { type: String, required: true },
  lines: {
    start: { type: Number },
    end: { type: Number }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CodeEntity', CodeEntitySchema);