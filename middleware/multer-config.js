// Importation des modules nécessaires
const multer = require(`multer`);
const path = require(`path`);
const fs = require(`fs`);
const Sauce = require(`../models/Sauce`);

// Configuration des types MIME
const MIME_TYPES = {
    'image/jpg': `jpg`,
    'image/jpeg': `jpg`,
    'image/png': `png`
};

// Définition du dossier des images
const imagesFolder = path.dirname(require.main.filename);

// Configuration du stockage des fichiers
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
            callback(new Error(`Type MIME non pris en charge`), null);
        }
    }
});

// Fonction pour supprimer un fichier
function deleteFile(filePath) {
    fs.unlink(path.join(imagesFolder, `images`, filePath), (err) => {
        if (err) {
            console.error(`Échec de la suppression de l'ancienne image : ${err}`);
        } else {
            console.log(`Ancienne image supprimée avec succès`);
        }
    });
}

// Exportation de la configuration Multer
module.exports = multer({ storage: storage }).single(`image`);
