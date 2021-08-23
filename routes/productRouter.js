const router = require("express").Router();
const productController = require("../controllers/productController");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.get("/products", productController.getProducts);
router.post("/products", auth, authAdmin, productController.createProduct);

router.delete(
  "/products/:id",
  auth,
  authAdmin,
  productController.deleteProduct
);
router.put("/products/:id", auth, authAdmin, productController.updateProduct);

module.exports = router;
