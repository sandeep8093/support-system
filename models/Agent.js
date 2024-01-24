const mongoose = require('mongoose');
const agentSchema = mongoose.Schema(
  {
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    name: { 
        type: String, 
        required: true 
    },
    phone: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default:true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
  },
  { timestamps: true },
  { minimize: false }
);

module.exports = mongoose.model('Agent', agentSchema);
