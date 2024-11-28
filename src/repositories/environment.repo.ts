import { pool } from '../config/database';

export const EnvironmentRepository = {
  async create(data: any) {
    try {
      const query = `INSERT INTO environment_sensors (name, type, value)
                     VALUES ($1, $2, $3) RETURNING *`;
      const values = [data.name, data.type, data.value, data.unit, data.location];
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error(`[EnvironmentRepository.create] Error: ${error.message}`, {
        stack: error.stack,
        file: __filename,
      });
      throw new Error('Failed to create environment sensor data');
    }
  },

  async findById(id: number) {
    try {
      const result = await pool.query(`SELECT * FROM environment_sensors WHERE id = $1`, [id]);
      return result.rows[0];
    } catch (error) {
      console.error(`[EnvironmentRepository.findById] Error: ${error.message}`, {
        stack: error.stack,
        file: __filename,
      });
      throw new Error('Failed to find environment sensor by ID');
    }
  },

  async findAll() {
    try {
      const result = await pool.query(`SELECT * FROM environment_sensors`);
      return result.rows;
    } catch (error) {
      console.error(`[EnvironmentRepository.findAll] Error: ${error.message}`, {
        stack: error.stack,
        file: __filename,
      });
      throw new Error('Failed to fetch all environment sensors');
    }
  },

  async update(id: number, data: any) {
    try {
      const query = `UPDATE environment_sensors
                     SET name = $1, type = $2, value = $3, updated_at = CURRENT_TIMESTAMP
                     WHERE id = $4 RETURNING *`;
      const values = [data.name, data.type, data.value, data.unit, data.location, id];
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error(`[EnvironmentRepository.update] Error: ${error.message}`, {
        stack: error.stack,
        file: __filename,
      });
      throw new Error('Failed to update environment sensor data');
    }
  },

  async delete(id: number) {
    try {
      const result = await pool.query(`DELETE FROM environment_sensors WHERE id = $1 RETURNING *`, [id]);
      return result.rows[0];
    } catch (error) {
      console.error(`[EnvironmentRepository.delete] Error: ${error.message}`, {
        stack: error.stack,
        file: __filename,
      });
      throw new Error('Failed to delete environment sensor data');
    }
  },
};
