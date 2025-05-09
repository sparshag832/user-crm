import { verifyToken } from "../utils/jwt.js";

const authMiddleware = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.redirect('/auth/login');
  }

  try {
    const decoded = verifyToken(token)
    req.user = decoded; 
    next();
  } catch (err) {
    console.error('Invalid token:', err.message);
    return res.clearCookie('token').redirect('/auth/login');
  }
};

export default authMiddleware;
