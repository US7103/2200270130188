import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [expiryHours, setExpiryHours] = useState(24);
  const [shortLink, setShortLink] = useState("");
  const [expiry, setExpiry] = useState("");
  const [error, setError] = useState("");

  const handleShorten = async () => {
    if (!originalUrl) {
      setError("Please enter a URL.");
      return;
    }

    try {
      const res = await axios.post("/shorten", {
        originalUrl,
        expiryHours: parseInt(expiryHours, 10)
      });

      setShortLink(res.data.shortLink);
      setExpiry(res.data.expiry);
      setError("");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Failed to shorten URL.");
      setShortLink("");
      setExpiry("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center p-6">
      <div className="bg-white/20 backdrop-blur-xl shadow-2xl rounded-2xl p-8 w-full max-w-xl border border-white/30">
        <h1 className="text-4xl font-extrabold text-white text-center mb-6 drop-shadow-lg">URL Shortener</h1>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter your long URL"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            className="p-3 rounded-xl bg-white/40 border border-white/30 placeholder-white/70 text-white focus:ring-2 focus:ring-purple-300 focus:outline-none"
          />

          <input
            type="number"
            min="1"
            placeholder="Expiry in hours"
            value={expiryHours}
            onChange={(e) => setExpiryHours(e.target.value)}
            className="p-3 rounded-xl bg-white/40 border border-white/30 placeholder-white/70 text-white focus:ring-2 focus:ring-pink-300 focus:outline-none"
          />

          <button
            onClick={handleShorten}
            className="w-full bg-gradient-to-r from-yellow-400 to-red-500 text-white font-semibold py-3 rounded-xl shadow-lg hover:opacity-90 transition"
          >
            Shorten URL
          </button>
        </div>

        {shortLink && (
          <div className="mt-6 bg-white/30 p-4 rounded-xl text-white shadow-inner">
            <p className="font-semibold">Shortened Link:</p>
            <a
              href={shortLink}
              target="_blank"
              rel="noopener noreferrer"
              className="underline break-all text-yellow-200 hover:text-yellow-300"
            >
              {shortLink}
            </a>
            <p className="mt-2">Expires at: {new Date(expiry).toLocaleString()}</p>
          </div>
        )}

        {error && (
          <p className="mt-4 text-red-200 font-semibold bg-red-500/30 p-3 rounded-xl text-center">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default App;
