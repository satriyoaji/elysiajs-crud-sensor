import { Elysia } from 'elysia';
import { config } from 'dotenv';
import { EnvironmentRoutes } from './routes/environment.route';
import { Database } from './config/database';
import { AuthGuard } from './middlewares/auth.middleware';

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
})
// .guard(
//     {
//         beforeHandle({ set, cookie: { session }, error }) {
//             console.log("Set: ", set.headers.authorization)
//             // return error(401)
//         }
//     }
// )
.group(
    '/api/environment',
    AuthGuard,
    (app) => EnvironmentRoutes(app) //.use(AuthMiddlewareBearer)
);

// Start the server
app.listen(parseInt(PORT, 10), () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
