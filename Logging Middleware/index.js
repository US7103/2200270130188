
const axios = require('axios');

const LOG_API_URL = 'https://your-log-api.com/loghttp://20.244.56.144/evaluation-service/logs';
const TOKEN_TYPE = 'Bearer';
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJ1dGthcnNoMjIxMzA4OUBha2dlYy5hYy5pbiIsImV4cCI6MTc1MjU1ODM4NiwiaWF0IjoxNzUyNTU3NDg2LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZDBkYmU0MWMtNWY4Zi00MjExLTlhOWQtYjYwMmIxNDhkNDA3IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoidXRrYXJzaCBzYXZhcm4iLCJzdWIiOiJlYWIxNWQ4Yy0zMGY0LTRmYzgtODk2Mi1mMjA0Njc4Y2U2MmMifSwiZW1haWwiOiJ1dGthcnNoMjIxMzA4OUBha2dlYy5hYy5pbiIsIm5hbWUiOiJ1dGthcnNoIHNhdmFybiIsInJvbGxObyI6IjIyMDAyNzAxMzAxODgiLCJhY2Nlc3NDb2RlIjoidXVNYnlZIiwiY2xpZW50SUQiOiJlYWIxNWQ4Yy0zMGY0LTRmYzgtODk2Mi1mMjA0Njc4Y2U2MmMiLCJjbGllbnRTZWNyZXQiOiJwRGFQbm5BcEVVZEhTRk13In0.3aPF2aod2kxIr-N6HUS5zfuusJNGp7MAceRkcpx26SE';
const EXPIRES_IN = 1752558386; 

function isTokenExpired() {
  return Math.floor(Date.now() / 1000) >= EXPIRES_IN;
}

async function log(stack, level, packet, message) {
  if (isTokenExpired()) {
    console.error('Logging token expired.');
    return;
  }

  try {
    await axios.post(
      LOG_API_URL,
      { stack, level, packet, message },
      { headers: { Authorization: `${TOKEN_TYPE} ${ACCESS_TOKEN}` } }
    );
    console.log(`Logged: [${level}] ${message}`);
  } catch (err) {
    console.error('Failed to send log:', err.message);
  }
}

module.exports = log;
