import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import { query as db } from '../db';
import { checkIfUserExists } from '../db/dbHelpers';
import jwt from 'jsonwebtoken';
import { CreateNewUser, GetAllUserDataType } from '../types/db';

export const getAllUsers = async (_req: Request, res: Response) => {
  const { rows } = await db.query<GetAllUserDataType>('SELECT email, username FROM users');

  if (rows.length === 0) {
    return res.status(200).json({
      success: true,
      data: [],
      message: 'No users found',
    });
  }

  res.status(200).json({
    success: true,
    data: rows,
    message: 'Users retrieved successfully',
  });
};

export const createNewUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const emailExists = await checkIfUserExists('email', email);

  if (emailExists) {
    return res.status(409).json({
      success: false,
      message: 'Email already exists',
    });
  }

  const usernameExists = await checkIfUserExists('username', username);

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

  const { rows } = await db.query<CreateNewUser>(
    'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
    [userObject.username, userObject.email, userObject.password]
  );

  if (rows.length === 0) {
    return res.status(500).json({
      success: false,
      message: 'An error occurred while creating the user',
    });
  }
  delete rows[0].password;

  const accessToken = jwt.sign(
    {
      user_id: rows[0].user_id,
      username: rows[0].username,
      email: rows[0].email,
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: '30m',
    }
  );

  const refreshToken = jwt.sign(
    {
      email: rows[0].email,
    },
    process.env.REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: '1d',
    }
  );
  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    success: true,
    data: rows[0],
    message: 'User created successfully',
    accessToken,
  });
};

export const deleteUser = async (req: Request, res: Response) => {
  const { email } = req.body;

  const userExists = await checkIfUserExists('email', email);

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
