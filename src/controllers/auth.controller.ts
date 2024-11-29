import { Handler } from 'elysia';
import { AuthService } from '../services/auth.service';

export const AuthController = {
  generateToken(handler: Handler) {
    try {
      // Example payload for the token
      const payload = {
        id: 1, // Replace with dynamic data if needed
        username: 'testuser',
        role: 'user', // You can change or extend the payload as necessary
      };

      const token = AuthService.generateToken(payload);

      handler.set.status = 200
      return { status: 'OK', token: `Bearer ${token}`, message: 'data sensor successfully fetched' };
    } catch (error) {
      console.error('[AuthController.generateToken] Error:', error);

      handler.set.status = 500
      return { status: 'ERROR', message: 'Failed to generate token' };
    }
  },
};
