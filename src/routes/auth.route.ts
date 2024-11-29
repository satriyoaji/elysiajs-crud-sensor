import { AuthController } from '../controllers/auth.controller';

export const AuthRoutes = (app) => {
  return app.post('/token', AuthController.generateToken);
};
