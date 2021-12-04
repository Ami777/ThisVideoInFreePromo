# Demo of YouTube API usage to generate dynamic video updates in JavaScript

## Demo, more information and explanation

Take a look at the original video: https://youtu.be/2ikLDQ-jNxM

## How tu use
Take a look into the code.

0. Install all required packages using `npm i`, `yarn` or similar command. 
1. Generate API keys for YouTube API from Google Console. Remember to add `http://localhost:3000/oauth2callback` as a valid callback URL and `localhost:3000` as valid backend domain. Upload credentials file into `data/credentials/json`.
2. Then you need to create `data/config.js` file which should look something like this:

```javascript
const Config = {
    googleOAuth2: {
        clientId: 'YOUR-GOOGLE-OAUTH2-CLIENT-ID.apps.googleusercontent.com',
        clientSecret: 'YOUR-GOOGLE-OAUTH2-CLIENT-SECRET',
    },
    youtube: {
        videoId: 'VIDEO-ID',
    },
};

module.exports = {
    Config,
};

```

3. Then, run `getTokens.js` - it will save all required information.

## License

MIT. Use it as you want. Just please include original author, video and repository in description.
