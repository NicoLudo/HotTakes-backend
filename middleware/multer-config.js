const multer = require(`multer`);
const path = require(`path`);
const fs = require(`fs`);
const Sauce = require(`../models/Sauce`);

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
    filename: async (req, file, callback) => {
        const name = file.originalname.split(` `).join(`_`).split(`.`)[0];
        const extension = MIME_TYPES[file.mimetype];
        if (extension) {
            const sauce = await Sauce.findById(req.params.id);
            if (sauce && sauce.imageUrl) {
                const oldImageName = sauce.imageUrl.split(`/`).pop();
                deleteFile(oldImageName);
            }

            const newImage = `${name}-${Date.now()}.${extension}`;
            const imageUrl = `images/${newImage}`;
            await Sauce.findByIdAndUpdate(req.params.id, { imageUrl: imageUrl });
            callback(null, newImage);
        } else {
            callback(new Error(`MIME type not supported`), null);
        }
    }
});

function deleteFile(filePath) {
    fs.unlink(path.join(imagesFolder, `images`, filePath), (err) => {
        if (err) {
            console.error(`Failed to delete old image: ${err}`);
        } else {
            console.log(`Old image deleted successfully`);
        }
    });
}

module.exports = multer({ storage: storage }).single(`image`);
