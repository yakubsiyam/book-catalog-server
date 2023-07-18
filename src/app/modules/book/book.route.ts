import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BookValidation } from './book.validation';
import { BookController } from './book.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(BookValidation.bookZodSchema),
  BookController.createBook,
);

router.post('/comment/:id', BookController.createComment);

router.get('/', BookController.getAllBooks);

router.get('/my-book/:userEmail', BookController.getSpecificAllBooks);

router.get('/comment/:id', BookController.getComment);

router.get('/:id', BookController.getSingleBook);

router.patch('/:id', BookController.updateBook);

router.delete('/:id', BookController.deleteBook);

export const BookRoutes = router;
