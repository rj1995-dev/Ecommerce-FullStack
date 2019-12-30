const express = require("express");
const router = express.Router();

const { requireSignin, isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { genarateToken, processPayment } = require("../controllers/braintree");

router.get("/braintree/getToken/:userId", requireSignin, isAuth, genarateToken);
router.post(
  "/braintree/payment/:userId",
  requireSignin,
  isAuth,
  processPayment
);

router.param("userId", userById);
module.exports = router;
