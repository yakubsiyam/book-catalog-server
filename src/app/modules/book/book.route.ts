import express from 'express';
// import { ENUM_USER_ROLE } from '../../../enums/user';
// import auth from '../../middlewares/auth';
// import { CowController } from './cow.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BookValidation } from './book.validation';
import { BookController } from './book.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(BookValidation.bookZodSchema),
  BookController.createBook,
);

router.get('/', BookController.getAllBooks);

router.get('/:id', BookController.getSingleBook);

// router.patch('/:id', auth(ENUM_USER_ROLE.SELLER), CowController.updateCow);

// router.delete('/:id', auth(ENUM_USER_ROLE.SELLER), CowController.deleteCow);

export const BookRoutes = router;
