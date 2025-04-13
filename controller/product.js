const Product = require("../model/product");

/**
 * @route GET /products
 * @desc Get all products with optional limit and sorting
 */
module.exports.getAllProducts = (req, res) => {
  const limit = Number(req.query.limit) || 0;
  const sort = req.query.sort === "desc" ? -1 : 1;

  Product.find()
    .select(["-_id"])
    .limit(limit)
    .sort({ id: sort })
    .then((products) => res.json(products))
    .catch((err) => {
      console.error("Error fetching products:", err);
      res.status(500).json({ message: "Failed to fetch products" });
    });
};

/**
 * @route GET /products/:id
 * @desc Get a specific product by ID
 */
module.exports.getProduct = (req, res) => {
  const id = req.params.id;

  Product.findOne({ id })
    .select(["-_id"])
    .then((product) => {
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    })
    .catch((err) => {
      console.error("Error fetching product:", err);
      res.status(500).json({ message: "Failed to fetch product" });
    });
};

/**
 * @route GET /products/categories
 * @desc Get all product categories
 */
module.exports.getProductCategories = (req, res) => {
  Product.distinct("category")
    .then((categories) => res.json(categories))
    .catch((err) => {
      console.error("Error fetching categories:", err);
      res.status(500).json({ message: "Failed to fetch categories" });
    });
};

/**
 * @route GET /products/category/:category
 * @desc Get products in a specific category
 */
module.exports.getProductsInCategory = (req, res) => {
  const category = req.params.category;
  const limit = Number(req.query.limit) || 0;
  const sort = req.query.sort === "desc" ? -1 : 1;

  Product.find({ category })
    .select(["-_id"])
    .limit(limit)
    .sort({ id: sort })
    .then((products) => res.json(products))
    .catch((err) => {
      console.error("Error fetching products by category:", err);
      res.status(500).json({ message: "Failed to fetch products in category" });
    });
};

/**
 * @route POST /products
 * @desc Add a new product
 */
module.exports.addProduct = (req, res) => {
  if (!req.body.title || !req.body.price || !req.body.category) {
    return res.status(400).json({
      status: "error",
      message: "Missing required fields (title, price, category)",
    });
  }

  const product = new Product({
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    image: req.body.image,
    category: req.body.category,
  });

  product
    .save()
    .then((newProduct) => res.status(201).json(newProduct))
    .catch((err) => {
      console.error("Error adding product:", err);
      res.status(500).json({ message: "Failed to add product" });
    });
};

/**
 * @route PUT /products/:id
 * @desc Edit an existing product
 */
module.exports.editProduct = (req, res) => {
  const productId = req.params.id;

  if (!req.body.title || !req.body.price || !req.body.category) {
    return res.status(400).json({
      status: "error",
      message: "Missing required fields (title, price, category)",
    });
  }

  Product.findOneAndUpdate(
    { id: productId },
    {
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      image: req.body.image,
      category: req.body.category,
    },
    { new: true }
  )
    .then((updatedProduct) => {
      if (updatedProduct) {
        res.json(updatedProduct);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    })
    .catch((err) => {
      console.error("Error editing product:", err);
      res.status(500).json({ message: "Failed to update product" });
    });
};

/**
 * @route DELETE /products/:id
 * @desc Delete a product by ID
 */
module.exports.deleteProduct = (req, res) => {
  const productId = req.params.id;

  Product.findOneAndDelete({ id: productId })
    .then((deletedProduct) => {
      if (deletedProduct) {
        res.json("Deleted successfully");
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    })
    .catch((err) => {
      console.error("Error deleting product:", err);
      res.status(500).json({ message: "Failed to delete product" });
    });
};
