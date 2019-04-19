import { Router } from 'express';
import { UserController } from '../controllers';

const userController = new UserController();
const router = new Router();

router.get('/me', userController.me);
router.get('/places', userController.places);
router.get('/place-filter', userController.placeFilter);
router.delete('/place/:id', userController.deletePlace);
router.patch('/place/:id', userController.markToggleVisit);
router.get('/place', userController.getPlaceById);
router.post('/mark-place', userController.markPlace);

export default router;