// middlewares/loggerMiddleware.js
import axios from "axios";

let accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJ1dGthcnNoMjIxMzA4OUBha2dlYy5hYy5pbiIsImV4cCI6MTc1MjU1ODM4NiwiaWF0IjoxNzUyNTU3NDg2LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZDBkYmU0MWMtNWY4Zi00MjExLTlhOWQtYjYwMmIxNDhkNDA3IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoidXRrYXJzaCBzYXZhcm4iLCJzdWIiOiJlYWIxNWQ4Yy0zMGY0LTRmYzgtODk2Mi1mMjA0Njc4Y2U2MmMifSwiZW1haWwiOiJ1dGthcnNoMjIxMzA4OUBha2dlYy5hYy5pbiIsIm5hbWUiOiJ1dGthcnNoIHNhdmFybiIsInJvbGxObyI6IjIyMDAyNzAxMzAxODgiLCJhY2Nlc3NDb2RlIjoidXVNYnlZIiwiY2xpZW50SUQiOiJlYWIxNWQ4Yy0zMGY0LTRmYzgtODk2Mi1mMjA0Njc4Y2U2MmMiLCJjbGllbnRTZWNyZXQiOiJwRGFQbm5BcEVVZEhTRk13In0.3aPF2aod2kxIr-N6HUS5zfuusJNGp7MAceRkcpx26SE"; // Set this securely (e.g., from env)
let tokenExpiry = Date.now() + 3600 * 1000;    // example expiry timestamp in ms

const LOG_API_URL = "https://example.com/log"; // replace with your log API

export const loggerMiddleware = async (req, res, next) => {
  try {
    // Refresh token logic (simplified, normally you'd call auth API)
    if (Date.now() >= tokenExpiry) {
      // TODO: get new token from auth API
      accessToken = "NEW_ACCESS_TOKEN";
      tokenExpiry = Date.now() + 3600 * 1000; // new expiry
    }

    const logPayload = {
      method: req.method,
      url: req.originalUrl,
      timestamp: new Date().toISOString(),
    };

    // Send log to remote logging API
    await axios.post(LOG_API_URL, logPayload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Logging error:", error.message);
    // Don't block the request even if logging fails
  }

  next();
};
