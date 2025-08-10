import Url from "../schema/urlSchema.js";

export const getStats = async (req, res) => {
    try{
        const urls = await Url.find().sort({ createdAt: -1 });
        res.json(urls);
    }catch(err){
      res.status(500).json({ error: err.message });
    }
};
