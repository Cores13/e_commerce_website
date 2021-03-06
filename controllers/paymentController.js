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
    const user = await Users.findById(req.user.id).select(
      "name email address city zip"
    );

    if (!user) {
      return res.status(400).json({ msg: "Korisnik ne postoji." });
    }

    const { cart, id } = req.body;
    const { _id, name, email, address, city, zip } = user;

    cart.filter((item) => {
      return sold(item._id, item.quantity, item.sold);
    });

    const newPayment = new Payments({
      user_id: _id,
      name: name,
      email: email,
      cart: cart,
      paymentID: id,
      address: address,
      city: city,
      zip: zip,
    });

    await newPayment.save();
    res.json({ msg: "Narudzba uspjesno zavrsena." });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const sold = async (id, quantity, oldSold) => {
  await Products.findOneAndUpdate(
    { _id: id },
    {
      sold: quantity + oldSold,
    }
  );
};

module.exports = {
  getPayments,
  createPayments,
};
