import express from 'express';
import { authenticateJWT, authorizeRole } from './authMiddleware.js';
import Listing from './listing.js';

const router = express.Router();

// Create a new listing
router.post('/listings', authenticateJWT, authorizeRole(['business_owner','admin']), async (req, res) => {
  try {
    const { name, businessPhone, city, address, images } = req.body;
    const listing = new Listing({ name, businessPhone, city, address, images });
    await listing.save();
    res.status(201).json(listing);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating listing');
  }
});

// Read all listings
router.get('/listings', authenticateJWT, async (req, res) => {
  try {
    const listings = await Listing.find();
    res.json(listings);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching listings');
  }
});

// Read a specific listing
router.get('/listings/:id', authenticateJWT, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).send('Listing not found');
    }
    res.json(listing);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching listing');
  }
});

// Update a listing
router.put('/listings/:id', authenticateJWT, authorizeRole(['business_owner', 'admin']), async (req, res) => {
  try {
    const { name, businessPhone, city, address, images } = req.body;
    const updatedListing = await Listing.findByIdAndUpdate(req.params.id, { name, businessPhone, city, address, images }, { new: true });
    res.json(updatedListing);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating listing');
  }
});

// Delete a listing
router.delete('/listings/:id', authenticateJWT, authorizeRole(['admin']), async (req, res) => {
  try {
    const deletedListing = await Listing.findByIdAndDelete(req.params.id);
    if (!deletedListing) {
      return res.status(404).send('Listing not found');
    }
    res.json(deletedListing);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting listing');
  }
});

export default router;
