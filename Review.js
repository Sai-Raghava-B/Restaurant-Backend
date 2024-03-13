import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  business: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing' },
  text: String,
  rating: Number,
  date: { type: Date, default: Date.now },
  response: String // for business owner response
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
