// Importation des modules nécessaires
const express = require(`express`);
const router = express.Router();

const auth = require(`../middleware/auth`);
const multerConfig = require(`../middleware/multer-config`);
const sauceController = require(`../controllers/sauceController`);

// Routes pour lire les données
router.get(`/`, auth, sauceController.getAllSauces);
router.get(`/:id`, auth, sauceController.getSauce);

// Route pour créer une nouvelle sauce
router.post(`/`, auth, multerConfig, sauceController.createSauce);

// Routes pour mettre à jour les données
router.put(`/:id`, auth, multerConfig, sauceController.updateSauce);
router.post(`/:id/like`, auth, sauceController.likeSauce);

// Route pour supprimer une sauce
router.delete(`/:id`, auth, sauceController.deleteSauce);

// Exportation
module.exports = router;
