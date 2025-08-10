import Url from "../schema/urlSchema.js";
import {nanoid} from "nanoid";

export const createShortUrl = async (req, res) => {
  const { longUrl } = req.body;
  if (!longUrl) return res.status(400).json({ error: "URL required" });

  try {
    const shortCode = nanoid(7);
    const newUrl = new Url({ originalUrl: longUrl, shortCode });
    await newUrl.save();
    res.json({ shortUrl: `${process.env.BASE_URL}/redirect/${shortCode}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getShortUrl = async (req, res) => {
  const { shortCode } = req.params;
  if (!shortCode) return res.status(400).json({ error: "Short code required" });

  try {
    const url = await Url.findOne({ shortCode });
    if (!url) return res.status(404).json({ error: "Not found" });

    url.visitCount += 1;
    await url.save();

    res.json({ originalUrl: url.originalUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};