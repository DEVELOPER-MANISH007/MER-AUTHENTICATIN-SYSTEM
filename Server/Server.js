import express from "express";
import "dotenv/config";
import http from "http";
import cors from "cors";
import  connectDB  from "./Lib/db.js";
import authRouter from "./Routes/AuthRoutes.js";



const PORT = process.env.PORT || 5000;


const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/",function(req,res){
console.log("hello");
res.send("hello")
})

app.use("/api/auth", authRouter);



app.listen(PORT, async () => {
  // await connectDB();
  console.log(`Server is running on port ${PORT}`);
});

