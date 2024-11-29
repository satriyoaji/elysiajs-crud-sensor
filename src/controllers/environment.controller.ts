import { z } from 'zod';
import { EnvironmentService } from '../services/environment.service';
import { Handler } from 'elysia';

// Validation Schemas
const environmentSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name has maximum characters'),
  type: z.string().min(1, 'Type is required').max(50, 'Type has maximum characters'),
  value: z.number().min(0, 'Value must be a positive number'),
  // unit: z.string().min(1, 'Unit is required'),
  // location: z.string().optional(), // Optional field
});

export const EnvironmentController = {
  async findAll({ set }) {
    try {
      const data = await EnvironmentService.findAll();
      console.log("data: ", data)
      set.status = 200
      return { status: 'OK', data: data, message: 'data sensor successfully fetched' };
    } catch (error) {
      console.error(`[EnvironmentController.findAll] Error: ${error.message}`, {
        stack: error.stack,
        file: __filename,
      });
      set.status = 500
      return { status: 'ERROR', message: 'Failed to fetch environment sensor data' };
    }
  },

  async findById(handler: Handler) {
    try {
      const { id } = handler.params;
      const idParam = Number(id);
      const data = await EnvironmentService.findById(idParam);
      if (!data){
        handler.set.status = 404
        return { status: 'OK', data: data, message: 'Not Found data' };
      }
      handler.set.status = 200
      return { status: 'OK', data: data, message: 'data sensor successfully fetched' };
    } catch (error) {
      console.error(`[EnvironmentController.findById] Error: ${error.message}`, {
        stack: error.stack,
        file: __filename,
      });
      handler.set.status = 500
      return { status: 'ERROR', message: 'Failed to fetch environment sensor data' };
    }
  },

  async create(handler: Handler) {
    try {
      const body = await handler.body;
      const validatedData = environmentSchema.parse(body);
      const result = await EnvironmentService.create(validatedData);
      console.log("res: ", result)
      handler.set.status = 201;
      return { status: 'OK', message: 'data sensor successfully stored' };
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error(`[EnvironmentController.create] Validation Error: ${JSON.stringify(error.issues)}`);
        handler.set.status = 400;
        return { status: 'BAD_REQUEST', errors: error.issues };
      }
      console.error(`[EnvironmentController.create] Error: ${error.message}`, {
        stack: error.stack,
        file: __filename,
      });
      handler.set.status = 500
      return { status: 'ERROR', message: 'Failed to create environment sensor data' };
    }
  },

  async update(handler: Handler) {
    try {
      const { id } = handler.params;
      const idParam = Number(id);
      const data = await EnvironmentService.findById(idParam);
      if (!data){
        handler.set.status = 404
        return { status: 'OK', data: data, message: 'Not Found data' };
      }

      const body = await handler.body; // Parse the request body
      const validatedData = environmentSchema.parse(body); // Validate request body
      const result = await EnvironmentService.update(idParam, validatedData);
      handler.set.status = 200;
      return { status: 'OK', message: 'data sensor successfully updated' };
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error(`[EnvironmentController.create] Validation Error: ${JSON.stringify(error.issues)}`);
        handler.set.status = 400;
        return { status: 'BAD_REQUEST', errors: error.issues };
      }
      console.error(`[EnvironmentController.update] Error: ${error.message}`, {
        stack: error.stack,
        file: __filename,
      });
      handler.set.status = 500
      return { status: 'ERROR', message: 'Failed to create environment sensor data' };
    }
  },

  async delete(handler: Handler) {
    try {
      const { id } = handler.params;
      const idParam = Number(id);
      const result = await EnvironmentService.delete(idParam);
      if (!result) {
        handler.set.status = 404
        return { status: 'OK', message: 'Not Found data' };
      }
      handler.set.status = 200
      return { status: 'OK', message: 'data sensor successfully deleted' };
    } catch (error) {
      console.error(`[EnvironmentController.delete] Error: ${error.message}`, {
        stack: error.stack,
        file: __filename,
      });
      handler.set.status = 500
      return { status: 'ERROR', message: 'Failed to delete environment sensor data' };
    }
  },
};
