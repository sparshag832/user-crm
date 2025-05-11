import cookieParser from 'cookie-parser';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import rateLimit from 'express-rate-limit';
import { createUsersTable } from './models/userModel.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import dotenv from 'dotenv';


dotenv.config({ path: './.env' });

const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100,
    message: "Too many requests from this IP, please try again later",
    standardHeaders: true, 
    legacyHeaders: false, 
  });

app.use(limiter)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname,'public')))

app.set('view engine', 'ejs');


createUsersTable();

// Routes
app.use('/user', userRouter);
app.use('/auth',authRouter)

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the User Authentication App!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
