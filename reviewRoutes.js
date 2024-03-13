import express from 'express';
import { authenticateJWT } from './authMiddleware.js';
import Review from './Review.js';

const router = express.Router();
//adding review
router.post('/reviews', authenticateJWT, async (req, res) => {
  if (req.user.role !== 'user'  && req.user.role !== 'admin') {
    return res.sendStatus(403);
  }
  try {
    const { businessId, text, rating } = req.body;
    const review = new Review({ user: req.user._id, business: businessId, text, rating });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating review');
  }
});
//getting all reviews
router.get('/reviews', authenticateJWT, async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching reviews');
  }
});
//updating a review
router.put('/reviews/:id', authenticateJWT, async (req, res) => {
  if (req.user.role !== 'user' && req.user.role !== 'admin') {
    return res.sendStatus(403);
  }
  try {
    const { text, rating } = req.body;
    const updatedReview = await Review.findByIdAndUpdate(req.params.id, { text, rating }, { new: true });
    res.json(updatedReview);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating review');
  }
});
//deleting a review
router.delete('/reviews/:id', authenticateJWT, async (req, res) => {
  if (req.user.role !== 'user' && req.user.role !== 'admin') {
    return res.sendStatus(403);
  }
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (!deletedReview) {
      return res.status(404).send('Review not found');
    }
    res.json(deletedReview);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting review');
  }
});
//responding to a review
router.put('/reviews/:id/response', authenticateJWT, async (req, res) => {
  if (req.user.role !== 'business_owner' && req.user.role !== 'admin') {
    return res.sendStatus(403);
  }
  try {
    const { response } = req.body;
    const updatedReview = await Review.findByIdAndUpdate(req.params.id, { response }, { new: true });
    res.json(updatedReview);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating review response');
  }
});

export default router;
