const { initGoogle } = require('./google');
const { Config } = require('../data/config');

const { google } = initGoogle();

const findBestComment = async () => {
  const { data } = await google.youtube('v3').commentThreads.list({
    videoId: Config.youtube.videoId,
    part: ['snippet'],
    order: 'relevance',
    maxResults: 100,
  });

  return data.items
    .map((comment) => comment.snippet.topLevelComment.snippet)
    .filter((comment) => comment.authorDisplayName && comment.authorProfileImageUrl)
    .sort((a, b) => b.likeCount - a.likeCount)[0];
};

const findNewestCommentersAvatars = async (maxResults) => {
  const { data } = await google.youtube('v3').commentThreads.list({
    videoId: Config.youtube.videoId,
    part: ['snippet'],
    order: 'time',
    maxResults,
  });

  return [...new Set(
    data.items
      .map((comment) => comment.snippet.topLevelComment.snippet)
      .filter((comment) => comment.authorProfileImageUrl)
      .map((comment) => comment.authorProfileImageUrl),
  )];
};

const updateVideoTitleAndDesc = async ({ title, description }) => {
  await google.youtube('v3').videos.update({
    part: ['snippet'],
    requestBody: {
      id: Config.youtube.videoId,
      snippet: {
        categoryId: '22',
        title,
        description,
      },
    },
  });
};

const uploadVideoThumbnail = async (buffer) => {
  const media = {
    mimeType: 'image/jpeg',
    body: buffer,
  };

  await google.youtube('v3').thumbnails.set({
    videoId: Config.youtube.videoId,
    media,
  });
};

module.exports = {
  findBestComment,
  findNewestCommentersAvatars,
  updateVideoTitleAndDesc,
  uploadVideoThumbnail,
};
