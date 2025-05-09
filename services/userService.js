import * as UserModel from '../models/userModel.js';

export const createUser = async ({ username, email, password }) => {
  try {
    return await UserModel.createUser({ username, email, password });
  } catch (err) {
    console.error('Error creating user:', err);
    throw new Error('Error creating user, please try again later.');
  }
};

export const findUserByEmail = async (email) => {
  try {
    return await UserModel.findUserByEmail(email);
  } catch (err) {
    console.error('Error finding user by email:', err);
    throw new Error('Error checking email, please try again later.');
  }
};

export const findUserByUsername = async (username) => {
  try {
    return await UserModel.findUserByUsername(username);
  } catch (err) {
    console.error('Error finding user by username:', err);
    throw new Error('Error checking username, please try again later.');
  }
};
