const mongoose = require('mongoose');

const ChatSessionSchema = new Schema({
    participants: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    messages: [{
      type: Schema.Types.ObjectId,
      ref: 'ChatMessage'
    }],
    status: {
      type: String,
      enum: ['active', 'archived', 'closed'],
      default: 'active'
    }
    },
    {
        timestamps: true,
    }
);