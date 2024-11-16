import express from 'express';
const router=express.Router();
import{
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUsers,
    getUserByID,
    updateUser

} from '../controllers/userController.mjs'
import { protect, admin } from '../middleware/authMiddleware.mjs';
router.post('/auth', authUser);
router.route('/').post(registerUser).get(protect,admin,getUsers);
router.post('/logout', logoutUser);
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile);
router.route('/:id').delete(protect,admin,deleteUsers).get(protect,admin,getUserByID).put(protect,admin,updateUser);
export default router;
