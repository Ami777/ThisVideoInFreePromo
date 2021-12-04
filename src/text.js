const latinize = require('latinize');
const pipe = require('pipe-functions');

const textEllipsis = (maxLen) => (s) => {
  const str = s.trim();
  return str.length > maxLen ? `${str.substr(0, maxLen - 3)}...` : str;
};

const prepareNick = (nick) => pipe(
  nick,
  latinize,
  textEllipsis(15),
);

const getDescriptionPrefix = ({ authorDisplayName, authorChannelUrl, likeCount }) => `Take a look at channel of ${latinize(authorDisplayName.trim())}: ${authorChannelUrl}. (S)he has best comment under this video right now with ${likeCount} likes!`;

const getTitlePostfix = ({ authorDisplayName, likeCount }) => `for ${latinize(authorDisplayName.trim())} as his/her comments has ${likeCount} likes!`;

const prepareTitleAndDesc = (bestComment) => ({
  title: `This video is a free promo ${getTitlePostfix(bestComment)}`,
  description: `${getDescriptionPrefix(bestComment)}\n\nThis video updates itself every 15 minutes. The most popular comment's (which is relevance by YT algorithm and number of likes) author is then showed in the title, description and in the center of the thumbnail.\n\nCheck out thumbnail of this video here: http://i3.ytimg.com/vi/FS5nNIFuH_4/hqdefault.jpg\n\nIn the background of the thumbnail you can see 84 of newest comments authors' avatars!\n\nThe video itself is explanation of how it works.\n\nIF YOU ARE THE CODER DON'T DIRECTLY USE CODE IN THE VIDEO! You may find much better version here: https://github.com/Ami777/ThisVideoInFreePromo`,
});

module.exports = {
  prepareNick,
  prepareTitleAndDesc,
};
