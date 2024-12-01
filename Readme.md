## Environment Sensor API

### Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`).
Then copy the environment variables `.env.example` to `.env` and adjust your own environment.
finally you can start a development server:

```bash
npm run dev
# or
yarn dev
```

### SQL Data Migration
You can run this DDL SQL script to operate the data in Database:
```SQL 
-- PostgreSQL
CREATE TABLE environment_sensors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL,
  value NUMERIC NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Building

To create a production version of your app:

```bash
npm run build
# or
yarn build
```
