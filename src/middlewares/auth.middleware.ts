import jwt from 'jsonwebtoken';
import Elysia, { t } from 'elysia';
import { config } from 'dotenv';

// Load .env variables
config();
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

// Guard for JWT validation
export const AuthGuard = {
  beforeHandle({ set, request, error }) {
    // console.log("REQ: ", set, request.headers, error)
    const authHeader = request.headers.get('authorization');

    // Check if the Authorization header exists and starts with "Bearer "
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw {
        status: 401,
        body: { message: 'Unauthorized: No Bearer token provided' },
      };
    }

    const token = authHeader.split(' ')[1];

    // Validate the JWT token
    try {
      jwt.verify(token, JWT_SECRET);
    } catch (err) {
      throw {
        status: 401,
        body: { message: 'Unauthorized: Invalid Bearer Token' },
      };
    }
  },
};

export const AuthMiddleware = async (ctx: any): Promise<{ default: Elysia }> => {
  const authHeader = ctx.request.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw {
      status: 401,
      body: { message: 'Unauthorized: No Bearer token provided' },
    };
  }

  const token = authHeader.split(' ')[1];

  try {
    jwt.verify(token, JWT_SECRET as string);
  } catch (error) {
    throw {
      status: 401,
      body: { message: 'Unauthorized: Invalid token' },
    };
  }

  // Return the app context to satisfy the required type
  return { default: ctx.app };
};

// AuthMiddleware for ElysiaJS
export const AuthMiddlewareBearer = (ctx) => {
  const authHeader = ctx.request.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    ctx.response.status = 401;
    ctx.response.body = { message: 'Unauthorized: No Bearer token provided' };
    return; // Stop further processing
  }

  const token = authHeader.split(' ')[1];
  try {
    jwt.verify(token, JWT_SECRET);
    return; // Token is valid; proceed to next middleware or route
  } catch (error) {
    ctx.response.status = 401;
    ctx.response.body = { message: 'Unauthorized: Invalid token' };
    return; // Stop further processing
  }
};
