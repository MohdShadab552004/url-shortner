// src/components/UrlShortener.jsx
import React, { useState } from "react";
import CustomButton from "./CustomButton";
import ShortLinkResult from "./ShortLinkResult";
import PortalToast from "./PortalToast";

const UrlShortener = () => {
    const [longUrl, setLongUrl] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [shortUrl, setShortUrl] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/shorten`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ longUrl })
            });
            const data = await response.json();
            if (response.ok) {
                setShortUrl(data.shortUrl);
                setShowToast(true);
                setTimeout(() => {
                    setShowToast(false);
                }, 2000);
            } else {
                throw new Error(data.error);
            }
        }catch(err){
            console.error(err);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-blue-500 px-4">
            <section className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-xl w-full shadow-lg">
                <header className="mb-6">
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Shorten URLs beautifully
                    </h1>
                    <p className="text-slate-300">
                        Create short links that you can share. This is a frontend-only demo storing data in your browser.
                    </p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="longUrl" className="text-white font-semibold block mb-1">
                            Paste your long URL
                        </label>
                        <p className="text-slate-400 text-sm mb-2">
                            We generate a short link instantly.
                        </p>
                        <div className="flex gap-2 max-md:flex-col max-md:gap-4">
                            <input
                                type="url"
                                id="longUrl"
                                name="longUrl"
                                placeholder="https://example.com/very/long/path?with=params"
                                value={longUrl}
                                onChange={(e) => setLongUrl(e.target.value)}
                                required
                                className="flex-1 p-3 rounded-md outline-none text-gray-800 border-blue-500 border-[1px] bg-zinc-200"
                            />
                            <CustomButton onClick={handleSubmit}>
                                Shorten URL
                            </CustomButton>
                        </div>
                    </div>
                </form>
                {shortUrl && <ShortLinkResult shortUrl={shortUrl} />}
            </section>
            
            <PortalToast show={showToast} message={`Shortened URL created`} />

        </main>
    );  
};

export default UrlShortener;
