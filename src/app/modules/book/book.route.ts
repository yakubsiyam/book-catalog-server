import express from 'express';
// import { ENUM_USER_ROLE } from '../../../enums/user';
// import auth from '../../middlewares/auth';
// import { CowController } from './cow.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BookValidation } from './book.validation';
import { BookController } from './book.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/',
  validateRequest(BookValidation.bookZodSchema),
  BookController.createBook,
);

router.post('/comment/:id', BookController.createComment);

router.get('/', BookController.getAllBooks);

router.get('/comment/:id', BookController.getComment);

router.get('/:id', BookController.getSingleBook);

router.patch('/:id', auth(), BookController.updateBook);

router.delete('/:id', auth(), BookController.deleteBook);

export const BookRoutes = router;
