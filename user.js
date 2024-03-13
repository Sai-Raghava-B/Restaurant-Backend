import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String,
  listings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Listing' }]
});

const User = mongoose.model('User', userSchema);

export default User;
