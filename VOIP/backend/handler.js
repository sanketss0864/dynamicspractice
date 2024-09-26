require('dotenv').config();
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const AccessToken = require('twilio').jwt.AccessToken;
const VoiceGrant = AccessToken.VoiceGrant;

var identity;

exports.tokenGenerator = function tokenGenerator() {
  identity = "sachin";
  const accountSid = process.env.TWILIO_ACCOUNT_SID;  

  const apiKey = process.env.TWILIO_API_KEY;         
  const apiSecret = process.env.TWILIO_API_SECRET;
  if (!accountSid || !apiKey || !apiSecret) {
    throw new Error('accountSid, apiKey, and apiSecret are required');
  }
  const accessToken = new AccessToken(
      accountSid,
      apiKey,
      apiSecret,
      { identity }
  );
  const grant = new VoiceGrant({
    outgoingApplicationSid: process.env.TWIML_APP_SID, 
    incomingAllow: true,
  });
  accessToken.addGrant(grant);

  return {
    identity: identity,
    token: accessToken.toJwt(),
  };
};
