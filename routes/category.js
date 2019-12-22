const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const {
  create,
  categoryById,
  read,
  update,
  remove,
  list
} = require("../controllers/category");
const { userById } = require("../controllers/user");

//Category of product by userId
router.post("/category/create/:userId", requireSignin, isAuth, isAdmin, create);

//Find category by id and read the category
router.get("/category/:categoryId", read);

//Category Update
router.put(
  "/category/:categoryId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  update
);

//Category Delete
router.delete(
  "/category/:categoryId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  remove //Delete keyword we cant use because reserver keyword
);

//Listing the categories
router.get("/categories", list);

router.param("userId", userById);
router.param("categoryId", categoryById);

module.exports = router;
