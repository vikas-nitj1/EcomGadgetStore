import express from 'express';
const router=express.Router();
import { getProducts,getProductById, createProduct,updateProduct,deleteProduct,createProductReview,getTopProducts} from '../controllers/productController.mjs';
import {protect,admin} from '../middleware/authMiddleware.mjs'
router.route('/').get(getProducts).post(protect,admin,createProduct);

router.get('/top',getTopProducts);

router.route('/:id').get(getProductById).put(protect,admin,updateProduct).delete(protect,admin,deleteProduct);
router.route('/:id/reviews').post(protect,createProductReview);
export default router;
