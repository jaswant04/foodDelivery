import express from 'express';
import { getItemsByCategory, getAllItems } from '../controllers/itemController.js';

const router = express.Router();

// Get all items
router.get('/all', getAllItems);

// Get items by category (Veg, Non-Veg, etc.)
router.get('/category/:type', getItemsByCategory);

export default router;
