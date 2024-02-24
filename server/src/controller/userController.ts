import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import { query as db } from '../db';
import { checkIfExists } from '../db/dbHelpers';

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await db.query('SELECT * FROM users');

  if (users.rowCount === 0) {
    return res.status(200).json({
      success: true,
      data: [],
      message: 'No users found',
    });
  }

  res.status(200).json({
    success: true,
    data: users.rows,
    message: 'Users retrieved successfully',
  });
};

export const createNewUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const emailExists = await checkIfExists('email', email);

  if (emailExists) {
    return res.status(409).json({
      success: false,
      message: 'Email already exists',
    });
  }

  const usernameExists = await checkIfExists('username', username);

  if (usernameExists) {
    return res.status(409).json({
      success: false,
      message: 'Username already exists',
    });
  }

  const hashedPassword = await bcryptjs.hash(password, 10);

  const userObject = {
    username,
    email,
    password: hashedPassword,
  };

  const user = await db.query(
    'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
    [userObject.username, userObject.email, userObject.password]
  );

  if (user) {
    res.status(201).json({
      success: true,
      data: user.rows[0],
      message: 'User created successfully',
    });
  } else {
    res.status(500).json({
      success: false,
      message: 'An error occurred while creating the user',
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { email } = req.body;

  const userExists = await checkIfExists('email', email);

  if (!userExists) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  } else {
    const user = await db.query('DELETE FROM users WHERE email = $1 RETURNING *', [email]);
    res.status(200).json({
      success: true,
      data: user.rows[0],
      message: 'User deleted successfully',
    });
  }
};
