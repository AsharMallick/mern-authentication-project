const jwt = require("jsonwebtoken");
const { User } = require("../models/User.model");
exports.isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(500).json({
      success: false,
      message: "Login first",
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next();
};
