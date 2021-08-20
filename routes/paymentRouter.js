const router = require("express").Router();
const paymentController = require("../controllers/paymentController");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.get("/payment", paymentController.getPayments);
router.post("/payment", auth, authAdmin, paymentController.createPayments);

// router.delete(
//   "/payment/:id",
//   auth,
//   authAdmin,
//   paymentController.deletePayments
// );
// router.put("/payment/:id", auth, authAdmin, paymentController.updatePayments);

module.exports = router;
