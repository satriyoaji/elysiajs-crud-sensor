import { EnvironmentRepository } from '../repositories/environment.repo';

export const EnvironmentService = {
  async create(data: any) {
    try {
      return await EnvironmentRepository.create(data);
    } catch (error) {
      console.error(`[EnvironmentService.create] Error: ${error.message}`, {
        stack: error.stack,
        file: __filename,
      });
      throw error;
    }
  },

  async findById(id: number) {
    try {
      return await EnvironmentRepository.findById(id);
    } catch (error) {
      console.error(`[EnvironmentService.findById] Error: ${error.message}`, {
        stack: error.stack,
        file: __filename,
      });
      throw error;
    }
  },

  async findAll() {
    try {
      return await EnvironmentRepository.findAll();
    } catch (error) {
      console.error(`[EnvironmentService.findAll] Error: ${error.message}`, {
        stack: error.stack,
        file: __filename,
      });
      throw error;
    }
  },

  async update(id: number, data: any) {
    try {
      return await EnvironmentRepository.update(id, data);
    } catch (error) {
      console.error(`[EnvironmentService.update] Error: ${error.message}`, {
        stack: error.stack,
        file: __filename,
      });
      throw error;
    }
  },

  async delete(id: number) {
    try {
      return await EnvironmentRepository.delete(id);
    } catch (error) {
      console.error(`[EnvironmentService.delete] Error: ${error.message}`, {
        stack: error.stack,
        file: __filename,
      });
      throw error;
    }
  },
};
