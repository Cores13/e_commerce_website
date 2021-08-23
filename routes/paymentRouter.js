const router = require("express").Router();
const paymentController = require("../controllers/paymentController");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.get("/payment", auth, authAdmin, paymentController.getPayments);
// router.post("/payment", paymentController.createPayments);
router.post("/payment", auth, paymentController.createPayments);

module.exports = router;
