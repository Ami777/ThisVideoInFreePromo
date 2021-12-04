const { google } = require('googleapis');
const express = require('express');
const { writeFileSync } = require('fs');
const { Config } = require('./data/config');

const oauth2Client = new google.auth.OAuth2(
  Config.googleOAuth2.clientId,
  Config.googleOAuth2.clientSecret,
  'http://localhost:3000/oauth2callback',
);

const scopes = [
  'https://www.googleapis.com/auth/youtube',
  'https://www.googleapis.com/auth/youtube.force-ssl',
  'https://www.googleapis.com/auth/youtube.readonly',
  'https://www.googleapis.com/auth/youtube.upload',
  'https://www.googleapis.com/auth/youtubepartner-channel-audit',
];

const app = express();

app.get('/', (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',

    // If you only need one scope you can pass it as a string
    scope: scopes,
  });

  res.redirect(url);
});

app.get('/oauth2callback', async (req, res) => {
  try {
    const { tokens } = await oauth2Client.getToken(req.query.code);
    writeFileSync('data/tokens.json', JSON.stringify(tokens));
    res.send('Tokens saved.');
  } catch (e) {
    res.send('Fatal error fetching tokens.');
    throw e;
  }
});

app.listen(3000, () => {
  console.log('Listening on http://localhost:3000');
});
