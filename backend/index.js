import express from "express";
import bodyParser from "body-parser";
import db from "./config/pgDB.js";
import cors from "cors";
import env from "dotenv";
import { qrRoutes } from "./src/routes/qrRoutes.js";
const app=express()
env.config()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
    origin:process.env.CORS_ORIGIN_URL
}));
db.connect().then(()=>{
  console.log("connected to database")
})
db.query("SET search_path TO public")
app.use("/qr",qrRoutes)
app.listen(5000,()=>{
    console.log("server listening on port 5000")
})