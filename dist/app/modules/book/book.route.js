'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require('express'));
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest'),
);
const book_validation_1 = require('./book.validation');
const book_controller_1 = require('./book.controller');
const router = express_1.default.Router();
router.post(
  '/',
  (0, validateRequest_1.default)(
    book_validation_1.BookValidation.bookZodSchema,
  ),
  book_controller_1.BookController.createBook,
);
router.post('/comment/:id', book_controller_1.BookController.createComment);
router.get('/', book_controller_1.BookController.getAllBooks);
router.get(
  '/my-book/:userEmail',
  book_controller_1.BookController.getSpecificAllBooks,
);
router.get('/comment/:id', book_controller_1.BookController.getComment);
router.get('/:id', book_controller_1.BookController.getSingleBook);
router.patch('/:id', book_controller_1.BookController.updateBook);
router.delete('/:id', book_controller_1.BookController.deleteBook);
exports.BookRoutes = router;
