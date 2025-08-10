import express from "express";
import { createShortUrl, getShortUrl } from "../controllers/urlController.js";

const urlRouter = express.Router();

// POST /api/shorten - Create short URL
urlRouter.post("/shorten", createShortUrl);

// GET /redirect/:shortCode - Redirect to original URL
urlRouter.get("/:shortCode", getShortUrl);

export default urlRouter;