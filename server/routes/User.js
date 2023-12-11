const express = require("express");
const router = express.Router();
const {
    register,
    login,
    dashboard,
    getUsers,
    checkUser,
    sendEmail,
    forgotPassword,
    resetPassword,
    updateUser,
    changePassword,
    confirmOrder,
    deleteUser,
} = require("../controllers/User");
const authenticateUser = require("../middlewares/auth");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/allusers").get(getUsers);
router.route("/dashboard").get(authenticateUser, dashboard);
router.route("/check-user").post(forgotPassword);
router.route("/reset-password").put(authenticateUser, resetPassword);
router.route("/update-user").post(authenticateUser, updateUser);
router.route("/change-password").put(authenticateUser, changePassword);
router.route("/send-email").post(sendEmail);
router.route("/confirm-order").post(confirmOrder);
router.route("/delete-user/:id").delete(deleteUser);

module.exports = router;
