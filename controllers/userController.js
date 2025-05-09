import {hashPassword} from '../utils/common/src.js';
import { createUser, findUserByEmail, findUserByUsername } from '../services/userService.js';

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).render('register', { error: 'All fields are required.',success:'' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).render('register', { error: 'Invalid email format.',success:'' });
  }

  if (password.length < 8) {
    return res.status(400).render('register', { error: 'Password must be at least 8 characters.' ,success:''});
  }

  try {
    const existingUsername = await findUserByUsername(username);
    if (existingUsername) {
      return res.status(400).render('register', { error: 'Username already exists.',success:'' });
    }

    const existingEmail = await findUserByEmail(email);
    if (existingEmail) {
      return res.status(400).render('register', { error: 'Email already registered.',success:'' });
    }

    const hashedPassword = await hashPassword(password);

    await createUser({ username, email, password: hashedPassword });
    return res.render('login', { success: 'Registration successful! Please log in.',error:'' });

  } catch (err) {
    console.error('Registration error:', err);
    return res.status(400).render('register', { error: 'Something went wrong. Please try again later.' ,success:''});
  }
};

export const getUserProfile = async (req, res) => {
  try {
    let user;

    if (req.user?.email) {
      user = await findUserByEmail(req.user.email);
    } else if (req.user?.username) {
      user = await findUserByUsername(req.user.username);
    }

    if (!user) {
      return res.status(400).render('login', { error: 'User not found.', success: '' });
    }

    return res.render('profile', {
      user,
      success: 'Welcome to your profile!',
      error: ''
    });
  } catch (err) {
    console.error('Error fetching user profile:', err);
    return res.status(400).render('profile', {
      user: {},
      success: '',
      error: 'Something went wrong. Please try again later.'
    });
  }
};




