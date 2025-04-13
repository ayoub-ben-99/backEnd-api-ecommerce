const bcrypt = require('bcrypt');
const User = require("../model/user");

/**
 * @route GET /users
 * @desc Get all users
 */
module.exports.getAllUser = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 0;
    const sort = req.query.sort === "desc" ? -1 : 1;
    const users = await User.find()
      .select("-_id")
      .limit(limit)
      .sort({ id: sort });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @route GET /users/:id
 * @desc Get single user by ID
 */
module.exports.getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @route POST /users
 * @desc Add new user
 */
module.exports.addUser = async (req, res) => {
  try {
    const { email, name, password, googleId } = req.body;
    if (!email || !name || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const userCount = await User.countDocuments();
    const user = new User({
      id: userCount + 1,
      email,
      password,
      name,
      googleId,
    });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @route PUT /users/:id
 * @desc Edit existing user
 */
module.exports.editUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { email, name, password, googleId } = req.body;

    if (!id) return res.status(400).json({ message: "User ID is required" });

    let updateData = { email, name, googleId };

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @route DELETE /users/:id
 * @desc Delete user by ID
 */
module.exports.deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (!id) return res.status(400).json({ message: "User ID is required" });

    const deletedUser = await User.findOneAndDelete(id);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
