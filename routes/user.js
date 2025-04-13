const express = require("express");
const user = require("../controller/user");
const protect = require("../middleware/protect");
const isAdmin = require("../middleware/isAdmin");
const router = express.Router();

router.get("/", protect, isAdmin, user.getAllUser);
router.get("/:id", protect, isAdmin, user.getUser);
router.put("/:id", protect, isAdmin, user.editUser);
router.delete("/:id", protect, isAdmin, user.deleteUser);

router.post("/", user.addUser);

module.exports = router;
