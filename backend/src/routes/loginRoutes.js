import express from "express";
import {loginStaff} from "../controllers/loginController.js";

const loginRoutes=express.Router()
loginRoutes.post("/",loginStaff)

export {loginRoutes};