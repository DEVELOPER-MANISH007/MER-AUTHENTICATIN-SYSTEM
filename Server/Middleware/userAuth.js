import jwt from "jsonwebtoken";
import userModel from "../Models/userModel.js"; 


const userAuth = async (req, res, next) => {
  try {
    const {token} = req.cookies
    if (!token) {
      return res.json({
        success: false,
        message: "Unauthorized. Please login again.",
      });
    }

    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!tokenDecoded?.id) {
      return res.json({ success: false, message: "Invalid token." });
    }

    // Attach user id to request (not to body; body can be undefined for GET)
    req.userId = tokenDecoded.id;
    return next();
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};



export default userAuth;