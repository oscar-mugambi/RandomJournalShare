import dotenv from 'dotenv';
import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { CustomJwtPayload } from '../types/custom-jwt-type';
import { query as db } from '../db';
import { checkIfUserExists } from '../db/dbHelpers';

dotenv.config();

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

  const user = await db.query(
    'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
    [userObject.username, userObject.email, userObject.password]
  );

  if (user.rowCount === 0) {
    return res.status(500).json({
      success: false,
      message: 'An error occurred while creating the user',
    });
  }

  delete user.rows[0].password;

  const accessToken = jwt.sign(
    {
      user_id: user.rows[0].user_id,
      username: user.rows[0].username,
      email: user.rows[0].email,
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: '30m',
    }
  );

  const refreshToken = jwt.sign(
    {
      email: user.rows[0].email,
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
    data: user.rows[0],
    message: 'User created successfully',
    accessToken,
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await db.query(
    'SELECT user_id, username, email, password FROM users WHERE email = $1',
    [email]
  );
  if (user.rowCount === 0) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  const passwordMatch = await bcryptjs.compare(password, user.rows[0].password);
  if (!passwordMatch) {
    return res.status(401).json({
      success: false,
      message: 'Incorrect password',
    });
  }

  const accessToken = jwt.sign(
    {
      user_id: user.rows[0].user_id,
      username: user.rows[0].username,
      email: user.rows[0].email,
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: '30m',
    }
  );

  const refreshToken = jwt.sign(
    {
      email: user.rows[0].email,
    },
    process.env.REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: '1d',
    }
  );

  delete user.rows[0].password;

  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    data: user.rows[0],
    message: 'User logged in successfully',
    accessToken,
  });
};

export const refresh = async (req: Request, res: Response) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
    });
  }

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string,
    async (err: Error | null, decoded: string | JwtPayload | undefined) => {
      if (err || !decoded || typeof decoded !== 'object') {
        return res.status(403).json({
          success: false,
          message: 'Forbidden',
        });
      }

      const decodedPayload = decoded as CustomJwtPayload;
      const user = await db.query('SELECT user_id, username, email FROM users WHERE email = $1', [
        decodedPayload.email,
      ]);

      if (user.rowCount === 0) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }

      const accessToken = jwt.sign(
        {
          user_id: user.rows[0].user_id,
          username: user.rows[0].username,
          email: user.rows[0].email,
        },
        process.env.ACCESS_TOKEN_SECRET as string,
        {
          expiresIn: '15m',
        }
      );

      res.json({
        success: true,
        data: user.rows[0],
        message: 'Access token renewed successfully',
        accessToken,
      });
    }
  );
};

export const logout = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.status(204).json({
      success: true,
      message: 'No cookie found',
    });
  }

  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  });

  res.status(200).json({
    success: true,
    message: 'User logged out successfully',
  });
};
