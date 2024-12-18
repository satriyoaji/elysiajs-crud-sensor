import { Elysia } from 'elysia';
import { config } from 'dotenv';
import { EnvironmentRoutes } from './routes/environment.route';
import { Database } from './config/database';
import { AuthGuard } from './middlewares/auth.middleware';
import { AuthRoutes } from './routes/auth.route';
import { cors } from '@elysiajs/cors';

// Load .env variables
config();

const PORT = process.env.PORT || '3000';

const app = new Elysia();
app.use(cors({
    origin: '*'
}))

// Health check route (No middleware required)
app.get('/health', async () => {
  try {
    await Database.checkConnection();
    return { status: 'ok', message: 'Server and database are running!' };
  } catch (error) {
    return { status: 'error', message: 'Database connection failed', error: error.message };
  }
})
.group(
    '/api/auth',
    {},
    (app) => AuthRoutes(app)
).group(
    '/api/environment',
    AuthGuard,
    (app) => EnvironmentRoutes(app)
);

// Start the server
app.listen(parseInt(PORT, 10), () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
