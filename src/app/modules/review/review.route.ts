import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewValidation } from './review.validation';
import { ReviewController } from './review.controller';

const router = express.Router();

router.post(
  '/:id',
  validateRequest(ReviewValidation.reviewZodSchema),
  ReviewController.createReview,
);

// router.get('/', BookController.getAllBooks);

// router.get('/:id', BookController.getSingleBook);

// router.patch('/:id', auth(), BookController.updateBook);

// router.delete('/:id', auth(), BookController.deleteBook);

export const ReviewRoutes = router;
