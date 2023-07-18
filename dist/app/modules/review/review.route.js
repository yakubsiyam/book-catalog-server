'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.ReviewRoutes = void 0;
const express_1 = __importDefault(require('express'));
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest'),
);
const review_validation_1 = require('./review.validation');
const review_controller_1 = require('./review.controller');
const router = express_1.default.Router();
router.post(
  '/:id',
  (0, validateRequest_1.default)(
    review_validation_1.ReviewValidation.reviewZodSchema,
  ),
  review_controller_1.ReviewController.createReview,
);
// router.get('/', BookController.getAllBooks);
// router.get('/:id', BookController.getSingleBook);
// router.patch('/:id', auth(), BookController.updateBook);
// router.delete('/:id', auth(), BookController.deleteBook);
exports.ReviewRoutes = router;
