const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById, read, update } = require("../controllers/user");

//get request by Id
router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
  res.json({
    user: req.profile
  });
});

//Read the user information
router.get("/user/:userId", requireSignin, isAuth, read);

//Update the user information
router.put("/user/:userId", requireSignin, isAuth, update);

router.param("userId", userById);

module.exports = router;
