import express from 'express';
const router = express.Router();

import { authUser,regUser,logoutUser,getUserProfile ,UpdateUserProfile} from '../controllers/userControllers.js'
import { protect } from '../middleware/authMiddleware.js';



router.post('/' , regUser)
router.post('/auth' , authUser)
router.post('/logout' , logoutUser)
router.get('/profile' , protect ,  getUserProfile)
router.put('/profile' , protect , UpdateUserProfile)





export default router;