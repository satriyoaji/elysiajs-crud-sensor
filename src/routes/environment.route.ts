import { EnvironmentController } from '../controllers/environment.controller';

export const EnvironmentRoutes = (app) => {
  return app
    .post('', EnvironmentController.create)
    .get('', EnvironmentController.findAll)
    .get('/:id', EnvironmentController.findById)
    .put('/:id', EnvironmentController.update)
    .delete('/:id', EnvironmentController.delete);
};
