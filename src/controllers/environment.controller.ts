import { EnvironmentService } from '../services/environment.service';

export const EnvironmentController = {
  async create(req, res) {
    try {
      const data = await EnvironmentService.create(req.body);
      return res.status(201).json(data);
    } catch (error) {
      console.error(`[EnvironmentController.create] Error: ${error.message}`, {
        stack: error.stack,
        file: __filename,
      });
      return res.status(500).json({ error: 'Failed to create environment sensor data' });
    }
  },

  async findById(req, res) {
    try {
      const data = await EnvironmentService.findById(Number(req.params.id));
      return data ? res.json(data) : res.status(404).json({ error: 'Not Found' });
    } catch (error) {
      console.error(`[EnvironmentController.findById] Error: ${error.message}`, {
        stack: error.stack,
        file: __filename,
      });
      return res.status(500).json({ error: 'Failed to fetch environment sensor by ID' });
    }
  },

  async findAll(req, res) {
    try {
      const data = await EnvironmentService.findAll();
      console.log("data: ", data)
      return res.json(data);
    } catch (error) {
      console.error(`[EnvironmentController.findAll] Error: ${error.message}`, {
        stack: error.stack,
        file: __filename,
      });
      return res.status(500).json({ error: 'Failed to fetch environment sensors' });
    }
  },

  async update(req, res) {
    try {
      const data = await EnvironmentService.update(Number(req.params.id), req.body);
      return data ? res.json(data) : res.status(404).json({ error: 'Not Found' });
    } catch (error) {
      console.error(`[EnvironmentController.update] Error: ${error.message}`, {
        stack: error.stack,
        file: __filename,
      });
      return res.status(500).json({ error: 'Failed to update environment sensor data' });
    }
  },

  async delete(req, res) {
    try {
      const data = await EnvironmentService.delete(Number(req.params.id));
      return data ? res.json(data) : res.status(404).json({ error: 'Not Found' });
    } catch (error) {
      console.error(`[EnvironmentController.delete] Error: ${error.message}`, {
        stack: error.stack,
        file: __filename,
      });
      return res.status(500).json({ error: 'Failed to delete environment sensor data' });
    }
  },
};
