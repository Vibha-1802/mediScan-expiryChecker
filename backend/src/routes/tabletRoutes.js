import express from "express";
import { createTabletWithQR } from "../controllers/tabletController.js";

const tabletRoutes = express.Router();

tabletRoutes.post("/tablet/generate", createTabletWithQR);

export { tabletRoutes };