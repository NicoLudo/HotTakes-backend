const multer = require(`multer`);
const path = require(`path`);

const MIME_TYPES = {
    'image/jpg': `jpg`,
    'image/jpeg': `jpg`,
    'image/png': `png`
};

const imagesFolder = path.dirname(require.main.filename);

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(imagesFolder, `images`));
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(` `).join(`_`).split(`.`)[0];
        const extension = MIME_TYPES[file.mimetype];
        if (extension) {
            callback(null, `${name}-${Date.now()}.${extension}`);
        } else {
            callback(new Error(`MIME type not supported`), null);
        }
    }
});

module.exports = multer({ storage: storage }).single(`image`);
