import bcrypt from "bcrypt";
import userModel from '../Models/userModel.js';
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
      text: `Hi ${name},\n\nThank you for registering at Our My App. We're excited to have you on board!\n\nBest regards,\nThe My App Team${email}`,
    
    }
    await transporter.sendMail(mailOptions);

    return res.json({ success: true });


  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// login ke liye hai ye 
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

// logout ke liye hai ye
export const logout = async (req, res) => {
try {
    res.clearCookie("token",{
        httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  return res.json({ success: true , message:'Logout Successfully'  });
} catch (error) {
  res.json({ success: false, message: error.message });

  
}
};


export const sendVerifyOtp = async (req, res) => {
try {
  
const {userId} = req.body;
const user = await userModel.findById(userId);


} catch (error) {
  res.json({ success: false, message: error.message });
}


}
