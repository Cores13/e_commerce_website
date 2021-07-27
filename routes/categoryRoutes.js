const router = require('express').Router();
const categoryController = require('../controllers/categoryController');
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.get('/category', categoryController.getCategories);
router.post('/category', auth, authAdmin, categoryController.createCategory);

router.delete('/category/:id', auth, authAdmin, categoryController.deleteCategory);
router.put('/category/:id', auth, authAdmin, categoryController.updateCategory);


module.exports = router;