// const listingSchema = new mongoose.Schema({
//     name: String,
//     businessPhone: String,
//     city: String,
//     address: String,
//     images: [String]
//   });
  
//   const Listing = mongoose.model('Listing', listingSchema);
  
// // Create a new listing
// app.post('/listings', authenticateJWT, async (req, res) => {
//     if (req.user.role !== 'business_owner') {
//       return res.sendStatus(403);
//     }
//     try {
//       const { name, businessPhone, city, address, images } = req.body;
//       const listing = new Listing({ name, businessPhone, city, address, images });
//       await listing.save();
//       // Add the listing to the business owner's listings
//       req.user.listings.push(listing);
//       await req.user.save();
//       res.status(201).json(listing);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Error creating listing');
//     }
//   });
  
//   // Read all listings
//   app.get('/listings', authenticateJWT, async (req, res) => {
//     try {
//       const listings = await Listing.find();
//       res.json(listings);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Error fetching listings');
//     }
//   });
  
//   // Read a specific listing
//   app.get('/listings/:id', authenticateJWT, async (req, res) => {
//     try {
//       const listing = await Listing.findById(req.params.id);
//       if (!listing) {
//         return res.status(404).send('Listing not found');
//       }
//       res.json(listing);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Error fetching listing');
//     }
//   });
  
//   // Update a listing
//   app.put('/listings/:id', authenticateJWT, async (req, res) => {
//     if (req.user.role !== 'business_owner' && req.user.role !== 'admin') {
//       return res.sendStatus(403);
//     }
//     try {
//       const { name, businessPhone, city, address, images } = req.body;
//       const updatedListing = await Listing.findByIdAndUpdate(req.params.id, { name, businessPhone, city, address, images }, { new: true });
//       res.json(updatedListing);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Error updating listing');
//     }
//   });
  
//   // Delete a listing
//   app.delete('/listings/:id', authenticateJWT, async (req, res) => {
//     if (req.user.role !== 'admin') {
//       return res.sendStatus(403);
//     }
//     try {
//       const deletedListing = await Listing.findByIdAndDelete(req.params.id);
//       if (!deletedListing) {
//         return res.status(404).send('Listing not found');
//       }
//       res.json(deletedListing);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Error deleting listing');
//     }
//   });
  

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
