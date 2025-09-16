import express from "express";
import "dotenv/config";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import  connectDB  from "./Lib/db.js";
import authRouter from "./Routes/authRoutes.js";
import userRouter from "./Routes/userRoutes.js";





const PORT = process.env.PORT || 5000;


const app = express();
connectDB();
const allowedOrigins=['http://localhost:5173'] 
app.use(cors({
  origin:allowedOrigins,
  credentials:true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/",function(req,res){
console.log("hello");
res.send("Api is working")
})

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter); 




app.listen(PORT, async () => {
  // await connectDB();
  console.log(`Server is running on port ${PORT}`);
});

