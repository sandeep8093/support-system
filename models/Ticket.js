const mongoose = require('mongoose');
const ticketSchema = mongoose.Schema(
  {
    topic: { 
        type: String, 
        required: true 
    },
    description: {
        type: String,
        required: true
    },
    severity: {
        type: String,
        required: true
    },
    type: { 
        type: String, 
        required: true 
    },
    assignedTo: {
        type: String, 
        required: false,
      },
    status: { 
        type: String, 
        required: true,
        default:"New" 
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    resolvedOn: {
        type: Date,
        required: false
    },
  },
  { timestamps: true },
  { minimize: false }
);

module.exports = mongoose.model('Ticket', ticketSchema);
