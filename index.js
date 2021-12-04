const pipe = require('pipe-functions');
const { initGoogle } = require('./src/google');
const {
  findBestComment, findNewestCommentersAvatars, updateVideoTitleAndDesc, uploadVideoThumbnail,
} = require('./src/yt');
const { prepareTitleAndDesc } = require('./src/text');
const {
  prepareImg, addAvatarToBg, addBestCommenterAvatarOnTop, exportImg,
} = require('./src/image');

initGoogle();

const getInfoAndUpdateVideo = async () => {
  console.log('Fetching data...');
  const bestComment = await findBestComment();
  const newestCommentsImages = await findNewestCommentersAvatars(84);

  console.log('Updating data...');

  // Title and description
  await pipe(
    bestComment,
    prepareTitleAndDesc,
    updateVideoTitleAndDesc,
  );

  // Thumbnail
  await pipe(
    prepareImg(),
    addAvatarToBg(newestCommentsImages),
    addBestCommenterAvatarOnTop(bestComment),
    exportImg,
    uploadVideoThumbnail,
  );

  console.log('Done.');
};

setInterval(getInfoAndUpdateVideo, 1000 * 60 * 15);
getInfoAndUpdateVideo();
