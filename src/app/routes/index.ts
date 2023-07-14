import express from 'express';
import { AuthUserRoutes } from '../modules/user/user.route';
import { BookRoutes } from '../modules/book/book.route';

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
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
