import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthUserValidation } from './user.validation';
import { AuthUserController } from './user.controller';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(AuthUserValidation.userZodSchema),
  AuthUserController.createUser,
);

export const AuthUserRoutes = router;
