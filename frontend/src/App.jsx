import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [expiryHours, setExpiryHours] = useState(24); // default expiry
  const [shortLink, setShortLink] = useState("");
  const [expiry, setExpiry] = useState("");
  const [error, setError] = useState("");

  const handleShorten = async () => {
    if (!originalUrl) {
      setError("Please enter a URL.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/shorten", {
        originalUrl,
        expiryHours: parseInt(expiryHours, 10)
      });

      setShortLink(res.data.shortLink);
      setExpiry(res.data.expiry);
      setError("");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error || "Failed to shorten URL."
      );
      setShortLink("");
      setExpiry("");
    }
  };

  return (
    <div className="container">
      <h1>🩺 Medical URL Shortener</h1>

      <input
        type="text"
        placeholder="Enter your long URL"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
      />

      <input
        type="number"
        min="1"
        placeholder="Expiry in hours"
        value={expiryHours}
        onChange={(e) => setExpiryHours(e.target.value)}
      />

      <button onClick={handleShorten}>Shorten URL</button>

      {shortLink && (
        <div className="result">
          <p>
            Shortened Link:{" "}
            <a href={shortLink} target="_blank" rel="noopener noreferrer">
              {shortLink}
            </a>
          </p>
          <p>Expires at: {new Date(expiry).toLocaleString()}</p>
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default App;
