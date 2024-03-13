// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// const userSchema = new mongoose.Schema({
//   username: String,
//   password: String,
//   role: String,
//   listings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Listing' }]
// });

// const User = mongoose.model('User', userSchema);

// export const registerRoute = async (req, res) => {
//   const { username, password, role } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);
//   try {
//     const user = new User({ username, password: hashedPassword, role });
//     await user.save();
//     res.status(201).send('User registered successfully');
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error registering user');
//   }
// };

// // export const registerRoute = async (req, res) => {
// //   const { username, password, role } = req.body;
// //   const validRoles = ['admin', 'business_owner', 'user'];
  
// //   // Check if the role provided is valid
// //   if (!validRoles.includes(role)) {
// //     return res.status(400).send('Invalid role');
// //   }

// //   const hashedPassword = await bcrypt.hash(password, 10);
// //   try {
// //     const user = new User({ username, password: hashedPassword, role });
// //     await user.save();
// //     res.status(201).send('User registered successfully');
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).send('Error registering user');
// //   }
// // };


// export const loginRoute = async (req, res) => {
//   const { username, password } = req.body;
//   const user = await User.findOne({ username });
//   if (!user) {
//     return res.status(404).send('User not found');
//   }
//   if (await bcrypt.compare(password, user.password)) {
//     const accessToken = jwt.sign({ username: user.username, role: user.role }, process.env.JWT_SECRET);
//     return res.json({ accessToken });
//   }
//   res.status(403).send('Incorrect password');
// };


import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String,
  listings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Listing' }]
});

const User = mongoose.model('User', userSchema);

export default User;
