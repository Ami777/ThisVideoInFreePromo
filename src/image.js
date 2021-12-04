const Jimp = require('jimp');
const { join } = require('path');
const { prepareNick } = require('./text');

const prepareImg = async () => Jimp.read(join(__dirname, '../assets/bg.png'));

const addAvatarToBg = (newestImgs) => async (img) => {
  /*
  Btw, for(;;) is mostly outdated and for...of is better,
  I use it only because it is convenient to calculate row and col this way
   */
  for (let i = 0; i < newestImgs.length; i++) {
    try {
      console.log(`Preparing sub image ${i + 1} of ${newestImgs.length}...`);
      const subImg = await Jimp.read(newestImgs[i]);
      await subImg.resize(100, 100);
      const row = ~~(i / 12);
      const col = i % 12;
      await img.composite(subImg, col * 100, row * 100);
    } catch (e) {
      console.error(e);
    }
  }
  return img;
};

const addBestCommenterAvatarOnTop = ({ authorProfileImageUrl, authorDisplayName }) => (
  async (img) => {
    const font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
    const square = await Jimp.read(join(__dirname, '../assets/square.png'));

    img.composite(square, 1200 / 2 - 500 / 2, 700 / 2 - 500 / 2);

    await img.print(
      font,
      0,
      0,
      {
        text: 'The Best Commenter',
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
      },
      1200,
      370,
    );

    const subBestImg = await Jimp.read(authorProfileImageUrl);
    subBestImg.resize(250, 250);

    img.composite(subBestImg, 1200 / 2 - 250 / 2, 700 / 2 - 250 / 2);

    await img.print(
      font,
      0,
      700 - 370,
      {
        text: prepareNick(authorDisplayName), // ` ${likeCount} likes`,
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
      },
      1200,
      370,
    );

    return img;
  }
);

const exportImg = async (img) => img.getBufferAsync(Jimp.MIME_JPEG);

module.exports = {
  prepareImg,
  addAvatarToBg,
  addBestCommenterAvatarOnTop,
  exportImg,
};
