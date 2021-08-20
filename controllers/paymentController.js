const Payments = require("../models/paymentModel");
const Users = require("../models/userModel");
const Products = require("../models/productModel");

const getPayments = async (req, res) => {
  try {
    const payments = await Payments.find();
    res.json(payments);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
const createPayments = async (req, res) => {
  try {
    const user = await Users.findById(req.user.id).select("name email");

    if (!user) {
      return res.status(400).json({ msg: "Korisnik ne postoji." });
    }

    const { cart, paymentID, address } = req.body;
    const { _id, name, email } = user;

    const newPayment = new Payments({
      user_id: _id,
      name,
      email,
      cart,
      paymentID,
      address,
    });
    await newPayment.save();
    res.json({ newPayment });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  getPayments,
  createPayments,
};
