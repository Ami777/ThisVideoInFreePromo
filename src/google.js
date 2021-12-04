const { google } = require('googleapis');
const { readFileSync } = require('fs');
const { join } = require('path');

let auth;

const initGoogle = () => {
  if (!auth) {
    auth = new google.auth.OAuth2({
      clientId: '735703190351-p03kobans2l6e2hup59rvvtu6e0e5keo.apps.googleusercontent.com',
      clientSecret: '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',
      scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    });

    auth.setCredentials(JSON.parse(readFileSync(join(__dirname, '../data/tokens.json'), 'utf8')));
    google.options({
      auth,
    });
  }

  return { auth, google };
};

module.exports = {
  initGoogle,
};
