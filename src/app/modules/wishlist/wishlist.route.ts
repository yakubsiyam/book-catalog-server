import express from 'express';
import { WishlistController } from './wishlist.controller';

const router = express.Router();

router.post('/', WishlistController.createWishlist);

router.get('/:userEmail', WishlistController.getMyAllWishlist);

export const WishlistRoutes = router;
