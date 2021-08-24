const Payments = require("../models/paymentModel");
const Users = require("../models/userModel");

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
    // TODO: ADDRESS
    const { cart, id, address } = req.body;
    const { _id, name, email } = user;

    const newPayment = new Payments({
      user_id: _id,
      name: name,
      email: email,
      cart: cart,
      paymentID: id,
      address: address,
    });

    await newPayment.save();
    res.json({ msg: "Narudzba uspjesno zavrsena." });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
// const sold

module.exports = {
  getPayments,
  createPayments,
};
