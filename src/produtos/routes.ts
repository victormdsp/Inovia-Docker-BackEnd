import { Router } from 'express';
import { 
    getProductById, 
    getProducts, 
    deleteProduct, 
    createNewProduct,
    updateProduct 
} from './functions';

 const router: Router = Router();

//Get methods
router.get('/getOneProduct/:id', getProductById);

router.get('/getAllProducts', getProducts);

//Post methods
router.post('/newProduct', createNewProduct);

//Put methods
router.put('/updateOne', updateProduct)

//Delete methods
router.delete('/:id', deleteProduct)

module.exports = router;