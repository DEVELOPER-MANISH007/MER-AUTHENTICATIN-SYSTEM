import bcrypt from "bcrypt";
import userModel from "../Models/userModel.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import transporter from "../config/nodemailer.js";

// ye user yaha pr register hoga bole to signup krega
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.json({ success: false, message: "missing Details" });
  }

  try {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    const exestingUser = await userModel.findOne({ email });
    if (exestingUser) {
      return res.json({ success: false, message: "user already exists" });
    }
    const user = await userModel.create({
      name: name,
      email: email,
      password: hashPassword,
    });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    //sending Welcome Email to the user
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to Our My App!",
      text: `Hi ${name},\n\nThank you for registering at Our My App. We're excited to have you on board!\n\nBest regards,\nThe My App Team: ${email}`,
    };
    await transporter.sendMail(mailOptions);

    return res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//* login ke liye hai ye
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email and Password are required!",
    });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Invalid Email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//* logout ke liye hai ye
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.json({ success: true, message: "Logout Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//* otp send krne ke liye hai bhai ye okay
export const sendVerifyOtp = async (req, res) => {
  try {
    const { userId: userIdFromBody } = req.body;
    const targetUserId = userIdFromBody || req.userId;

    if (!targetUserId) {
      return res.json({ success: false, message: "Missing userId" });
    }

    const user = await userModel.findById(targetUserId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.isAccountVerified) {
      return res.json({ success: false, message: "Account already verified" });
    }
    const otp = String(Math.floor(10000 + Math.random() * 900000));
    user.verifyOtp = otp;
    user.verifyOtpExpiredAt = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Verify Your Account",
      text: `Your OTP is ${otp} verify your account usig this otp`,
    };
    await transporter.sendMail(mailOptions);
    return res.json({ success: true, message: "OTP sent to your email" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// *email verify krne ke liye hai bhai ye oka otp daalne pr check krega ki otp sahi ha ya na
export const verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;
  if (!userId || !otp) {
    return res.json({ success: false, message: "Missing Details" });
  }
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    if (user.verifyOtp !== otp || user.verifyOtp === "") {
      return res.json({ success: false, message: "Invalid OTP" });
    }
    if (user.verifyOtpExpiredAt < Date.now()) {
      return res.json({ success: false, message: "OTP expired" });
    }
    user.isAccountVerified = true;
    user.verifyOtp = ""; //otp ki value dobra empty ho jayega verifiedke baad
    user.verifyOtpExpiredAt = 0; //otp ka time  dobra 0 ho jayega verifiedkebaad
    await user.save();
    return res.json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//* check if user is authenticated
export const isAuthenticated = async (req, res) => {
  try {
    return res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// TODO Send Password Reset Otp

export const sendResetOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.json({
      success: false,
      message: "Missing Email! Email is required",
    });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const otp = String(Math.floor(10000 + Math.random() * 900000));
    user.resetOtp = otp;
    user.resetOtpExpiredAt = Date.now() + 15 * 60 * 1000;
    await user.save();
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: `Your OTP for resetting your password is  ${otp} . Use ths OTP to proceed with resetting your password. `,
    };
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "OTP sent to your email" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// TODO  Reset User Password
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    return res.json({
      success: false,
      message: "Email,OTP, and new Password are required"});
  }
try {
  const user = await userModel.findOne({ email });
  if(!user){
    return res.json({ success: false, message: "User not found" });
  }
  if(user.resetOtp !== otp || user.resetOtp === ""){
    return res.json({ success: false, message: "Invalid OTP" });

  }
  if(user.resetOtpExpiredAt < Date.now()){
    return res.json({ success: false, message: "OTP expired" });
  }
 const hashPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashPassword;
  user.resetOtp = "";
  user.resetOtpExpiredAt = 0;
  await user.save();
  res.json({ success: true, message: "Password reset successfully" });  

  

  
} catch (error) {
  res.json({ success: false, message: error.message }); 
  
}

};
