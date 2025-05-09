import express from 'express';
import { getUserProfile, registerUser } from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js'

const userRouter = express.Router();

userRouter.get('/register', (req, res) => {
  res.render('register', { error: '', success: '' });
});
userRouter.post('/register', registerUser);

userRouter.get('/profile', authMiddleware, getUserProfile);

export default userRouter;
