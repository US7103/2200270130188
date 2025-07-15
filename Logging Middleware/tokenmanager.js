

let accessToken = null;
let tokenType = 'Bearer'; 
let expiryTime = null;

function setToken({ token_type, access_token, expires }) {
  tokenType = token_type || 'Bearer';
  accessToken = access_token;
  expiryTime = Date.now() + (expires * 1000);
}

function getToken() {
  return { tokenType, accessToken, expiryTime };
}

module.exports = {
  setToken,
  getToken
};
