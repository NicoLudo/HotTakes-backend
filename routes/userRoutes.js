const express = require(`express`);
const router = express.Router();
const userController = require(`../controllers/userController`);
const multerConfig = require('../middleware/multer-config');
const auth = require(`../middleware/auth`);

router.post(`/upload`, auth, multerConfig, (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: `Veuillez fournir un fichier image valide.` });
    }
    res.status(200).json({ message: `Image uploadée avec succès.`, file: req.file });
});

router.post(`/signup`, userController.signup);
router.post(`/login`, userController.login);

module.exports = router;
