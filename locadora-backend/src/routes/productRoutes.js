const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");


router.get("/", authMiddleware, productController.getAllProducts);

router.get('/search', authMiddleware, productController.search);

router.get('/:id', authMiddleware, productController.getProductDetails);

module.exports = router;
