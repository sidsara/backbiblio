const express = require("express");
const router = express.Router();
const authController = require("../Controllers/authController");

router
  .route("/sign_up")
  .post(authController.signUp)
  .get(authController.getSignup);

router.route("/login").post(authController.login).get(authController.getLogin);

router.route("/forgotPassword").post(authController.forgotPassword);

//
router.route("/resetPassword/:token").patch(authController.resetPassword);
router
  .route("/updateMyPassword")
  .patch(authController.protect, authController.updatePassword);

// router.patch(
//   "/updateMyPassword",
//   authController.protect,
//   authController.updatePassword
// );
module.exports = router;
