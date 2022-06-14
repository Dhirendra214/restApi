import express from 'express';
const router = express.Router();
import { registerController, loginController, userController, refreshController } from '../controllers';
import auth from '../middlewares/auth';
import bodyParser from 'body-parser';

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/register', registerController.register);
router.post('/login', loginController.login);
router.get('/allUsers', auth, userController.findAll);
router.post('/refresh', refreshController.refresh);
router.post('/logout', auth, loginController.logout);
router.post('/createTask', auth,  loginController.createTask)




export default router;