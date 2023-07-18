'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const user_route_1 = require('../modules/user/user.route');
const book_route_1 = require('../modules/book/book.route');
const review_route_1 = require('../modules/review/review.route');
const wishlist_route_1 = require('../modules/wishlist/wishlist.route');
const router = express_1.default.Router();
const moduleRoutes = [
  {
    path: '/auth',
    route: user_route_1.AuthUserRoutes,
  },
  {
    path: '/book',
    route: book_route_1.BookRoutes,
  },
  {
    path: '/review',
    route: review_route_1.ReviewRoutes,
  },
  {
    path: '/wishlist',
    route: wishlist_route_1.WishlistRoutes,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
