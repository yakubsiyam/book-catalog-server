import express from 'express';
import { AuthUserRoutes } from '../modules/user/user.route';
import { BookRoutes } from '../modules/book/book.route';
import { ReviewRoutes } from '../modules/review/review.route';
import { WishlistRoutes } from '../modules/wishlist/wishlist.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthUserRoutes,
  },
  {
    path: '/book',
    route: BookRoutes,
  },
  {
    path: '/review',
    route: ReviewRoutes,
  },
  {
    path: '/wishlist',
    route: WishlistRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
