const express = require("express");
const router = express.Router();
const product = require("../controller/product");
const protect = require('../middleware/protect')
const isAdmin = require('../middleware/isAdmin')

router.get("/", product.getAllProducts);
router.get("/categories", product.getProductCategories);
router.get("/category/:category", product.getProductsInCategory);
router.get("/:id", product.getProduct);

router.post("/", protect, isAdmin, product.addProduct);
router.put("/:id", protect, isAdmin, product.editProduct);
router.patch("/:id", protect, isAdmin, product.editProduct);
router.delete("/:id", protect, isAdmin, product.deleteProduct);

module.exports = router;
