import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  text: { 
    type: String, 
    required: true, 
    trim: true, 
    maxlength: 500 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const campaignSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true, 
    trim: true, 
    maxlength: 100 
  },
  description: {
    type: String,
    required: true,
  },
  character: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Character',
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isPublished: { 
    type: Boolean, 
    default: false 
  },
  publishedDate: { 
    type: Date,
    default: function () {
      return this.isPublished ? Date.now() : null;
    },
  },
  likes: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }],
  comments: [commentSchema],
}, {
  timestamps: true,
  
});


export default mongoose.model('Campaign', campaignSchema);