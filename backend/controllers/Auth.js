const { User } = require("../models/User.model");
const { catchAsyncError } = require("../middlewares/catchasyncerror");
const ErrorHandler = require("../utils/errorhandler");
const sendResponse = ({
  res,
  statusCode,
  message,
  success,
  token = null,
  user,
}) => {
  return res
    .cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    })
    .status(statusCode)
    .json({
      success,
      message,
      user,
    });
};

exports.login = catchAsyncError(async (req, res, next) => {
  //   console.log(req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Enter all fields", 400));
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    return next(new ErrorHandler("Invalid credentials", 400));
  }

  const isCorrect = await user.checkPassword(password);
  if (!isCorrect) {
    return next(new ErrorHandler("Invalid credentials", 400));
  }
  const token = user.getToken();
  return sendResponse({
    message: `Welcome back ${user.username}`,
    success: true,
    res,
    statusCode: 200,
    token,
    user,
  });
});

exports.register = catchAsyncError(async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!email || !password || !username) {
    return next(new ErrorHandler("Enter all fields", 400));
  }
  let user = await User.findOne({ email: email });
  if (user) {
    return next(new ErrorHandler("Email already taken", 400));
  }
  user = await User.create({
    username,
    email,
    password,
  });
  const token = user.getToken();

  return sendResponse({
    message: `Successfully registered`,
    success: true,
    res,
    statusCode: 200,
    token,
    user,
  });
});

exports.logout = catchAsyncError(async (req, res, next)=>{
    res.cookie("token", null, {httpOnly:true, expires:new Date(Date.now())}).status(200).json({
        success:true,
        message:"Successfully logged out"
    });
})

exports.getMyDetails = catchAsyncError(async (req, res, next)=>{
    res.status(200).json({
        success:true, 
        user: req.user
    })
})
