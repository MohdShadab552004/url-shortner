import express from "express";
import { getStats } from "../controllers/adminController.js";
import { adminAuth } from "../middleware/adminAuth.js";

const adminRouter = express.Router();

adminRouter.get("/stats", adminAuth, getStats);

export default adminRouter;