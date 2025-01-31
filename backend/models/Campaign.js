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
    type: String, 
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // content: { 
  //   type: String, 
  //   required: true, 
  //   trim: true 
  // },
  isPublished: { 
    type: Boolean, 
    default: false 
  },
  publishedDate: { 
    type: Date 
  },
  likes: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }],
  comments: [commentSchema],
  // user: { 
  //   type: mongoose.Schema.Types.ObjectId, 
  //   ref: 'User', 
  //   required: true 
  // },
}, {
  timestamps: true,
  toJSON: {
    transform: function (doc, ret) {
      delete ret.__v;
      return ret;
    },
  },
});

export default mongoose.model('Campaign', campaignSchema);