import express from "express";
import {getTabletByUUID} from "../controllers/qrController.js";

const qrRoutes=express.Router()
qrRoutes.post("/",getTabletByUUID)

export {qrRoutes}