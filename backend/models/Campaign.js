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
    trim: true,
    maxlength: 100,
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
  toJSON: {
    transform: function (doc, ret) {
      delete ret.__v;
      return ret;
    },
    virtuals: true, 
  },
});

campaignSchema.index({ title: 'text' });
campaignSchema.index({ owner: 1 });
campaignSchema.index({ isPublished: 1 });

campaignSchema.virtual('likeCount').get(function () {
  return this.likes.length;
});

campaignSchema.virtual('commentCount').get(function () {
  return this.comments.length;
});

campaignSchema.pre('save', function (next) {
  if (this.isPublished && !this.publishedDate) {
    this.publishedDate = Date.now();
  }
  next();
});

export default mongoose.model('Campaign', campaignSchema);