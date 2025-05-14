import express from "express";
import { getAllMedicines } from "../controllers/medicineController.js";

const medicineRoutes = express.Router();

medicineRoutes.get("/", getAllMedicines);

export { medicineRoutes };