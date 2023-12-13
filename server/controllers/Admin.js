const {
    BadRequestError,
    NotFoundError,
    UnauthenticatedError,
} = require("../errors");
const Admin = require("../model/Admin");
const sgMail = require("@sendgrid/mail");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    // console.log(req.body);
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        throw new BadRequestError("Please provide necessary informations");
    }
    const user = await Admin.create(req.body);
    const token = user.createJWT();
    res.status(200).json({
        msg: "user created",
        token,
        username: user.username,
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequestError("Please provide necessary informations");
    }
    const user = await Admin.findOne({ email: email });
    if (!user) {
        throw new UnauthenticatedError("Invalid email");
    }
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
        throw new UnauthenticatedError("Invalid password");
    }
    const token = user.createJWT();
    res.status(200).json({
        msg: "user found",
        token,
        username: user.username,
    });
};

const dashboard = async (req, res) => {
    res.status(200).json({ msg: "success" });
};

module.exports = {
    register,
    login,
    dashboard,
};
