import express from 'express';
import { loginUser, logoutUser } from '../controllers/authController.js';

const authRouter = express.Router();


authRouter.get('/login', (req, res) => {
    res.render('login', { error: '', success: '' });
  });

authRouter.post('/login', loginUser);

authRouter.get('/logout',logoutUser);

export default authRouter;
