import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema({
  name: String,
  businessPhone: String,
  city: String,
  address: String,
  images: [String]
});

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;
