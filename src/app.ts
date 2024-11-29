import { Elysia } from 'elysia';
import { config } from 'dotenv';
import { EnvironmentRoutes } from './routes/environment.route';
import { Database } from './config/database';
import jwt from '@elysiajs/jwt';

// Load .env variables
config();

const PORT = process.env.PORT || '3000';

const app = new Elysia();

// Health check route (No middleware required)
app.get('/health', async () => {
  try {
    await Database.checkConnection();
    return { status: 'ok', message: 'Server and database are running!' };
  } catch (error) {
    return { status: 'error', message: 'Database connection failed', error: error.message };
  }
}).group(
    '/api/environment',
    {},
    (app) => EnvironmentRoutes(app).use(
        jwt({
          name: 'jwt',
          secret: process.env.JWT_SECRET as string,
        })
      )
);

// Protect all environment routes with AuthMiddleware
// app.use(AuthMiddleware).group('/api/environment', (group) => {
//     // group.use(AuthMiddleware);
//     EnvironmentRoutes(group);
//     return EnvironmentRoutes(group.use(AuthMiddleware)); // Return the modified group
// }, {
    
// });

// Start the server
app.listen(parseInt(PORT, 10), () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
