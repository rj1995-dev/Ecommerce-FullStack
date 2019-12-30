const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const {
  productById,
  read,
  create,
  remove,
  update,
  list,
  listRelated,
  listCategories,
  listBySearch,
  photo,
  listSearch
} = require("../controllers/product");

//Read th product
router.get("/product/:productId", read);

//Create product by userId
router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create);

//Remove the product by Admin by id
router.delete(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  remove
);

//Update product by Admin id
router.put(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  update
);
//Get the All Product List
router.get("/products", list);

//Get Related Products
router.get("/products/related/:productId", listRelated);

// Get list categories
router.get("/products/categories", listCategories);

//List by Search
router.post("/products/by/search", listBySearch);
//list search
router.get("/products/search", listSearch);
//get product photo
router.get("/product/photo/:productId", photo);

router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
