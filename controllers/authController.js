import { findUserByEmail, findUserByUsername } from '../services/userService.js';
import { verifyPassword } from '../utils/common/src.js';
import { generateToken } from '../utils/jwt.js';
import verifyRecaptcha from '../utils/recaptcha.js';

export const loginUser = async (req, res) => {
    const { login, password, token } = req.body;

    if (!login || !password || !token) {
        return res.status(400).render('login', {
            error: 'All fields are required.',
            success: ''
        });
    }

    const isHuman = await verifyRecaptcha(token);
    if (!isHuman) {
        return res.status(400).render('login', {
            error: 'Invalid reCAPTCHA. Please try again.',
            success: ''
        });
    }

    const user = login.includes('@')
        ? await findUserByEmail(login)
        : await findUserByUsername(login);

    if (!user) {
        return res.status(400).render('login', {
            error: 'User not found.',
            success: ''
        });
    }

    const validPassword = await verifyPassword(password, user.password);
    if (!validPassword) {
        return res.status(401).render('login', {
            error: 'Incorrect password.',
            success: ''
        });
    }

    const payload = { id: user.id, username: user.username, email: user.email };
    const authToken = generateToken(payload, '15m');

    res.cookie('token', authToken, {
        httpOnly: true,      
        sameSite: 'strict',   
        maxAge: 15 * 60 * 1000 
    });

    return res.redirect('/user/profile');
};

export const logoutUser = (req, res) => {
    res.clearCookie('token');
    res.redirect('/auth/login');
};