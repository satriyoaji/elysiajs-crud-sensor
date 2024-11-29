import jwt from 'jsonwebtoken';

export const AuthService = {
  generateToken(payload: any): string {
    const secret = process.env.JWT_SECRET;
    const options = { expiresIn: '24h' };

    if (!secret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    return jwt.sign(payload, secret, options);
  },
};
