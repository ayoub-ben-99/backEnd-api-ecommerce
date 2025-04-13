const Cart = require('../model/cart');

/**
 * @route GET /cart
 * @desc Get the current user's cart
 */
exports.getCart = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');
  res.json(cart || { items: [] });
};

/**
 * @route POST /cart
 * @desc Add a product to the user's cart
 */
exports.addToCart = async (req, res) => {
  const { productId } = req.body;
  let cart = await Cart.findOne({ userId: req.user._id });

  if (!cart) {
    cart = await Cart.create({ userId: req.user._id, items: [{ productId }] });
  } else {
    const itemIndex = cart.items.findIndex(i => i.productId.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += 1;
    } else {
      cart.items.push({ productId });
    }
    await cart.save();
  }

  res.json(cart);
};

/**
 * @route DELETE /cart
 * @desc Remove a product from the user's cart
 */
exports.removeFromCart = async (req, res) => {
  const { productId } = req.body;
  const cart = await Cart.findOne({ userId: req.user._id });

  if (!cart) return res.status(404).json({ message: 'Cart not found' });

  cart.items = cart.items.filter(i => i.productId.toString() !== productId);
  await cart.save();

  res.json(cart);
};
