import { sign, verify } from 'jsonwebtoken';

export const createToken = async (payload) => {
  const token = await sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
  return token;
};

export const verifyToken = async (token) => {
  const decoded = await verify(token, process.env.TOKEN_SECRET);
  return decoded;
};
