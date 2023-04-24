// Importation des modules nécessaires
const express = require(`express`);
const router = express.Router();
const userController = require(`../controllers/userController`);
const multerConfig = require(`../middleware/multer-config`);
const auth = require(`../middleware/auth`);

// Route pour télécharger une image
router.post(`/upload`, auth, multerConfig, (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: `Veuillez fournir un fichier image valide.` });
    }
    res.status(200).json({ message: `Image uploadée avec succès.`, file: req.file });
});

// Routes pour l'inscription des utilisateurs et pour la connexion des utilisateurs
router.post(`/signup`, userController.signup);
router.post(`/login`, userController.login);

// Exportation
module.exports = router;
