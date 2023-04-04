const express = require(`express`);
const router = express.Router();

const auth = require(`../middleware/auth`);
const multerConfig = require(`../middleware/multer-config`);
const sauceController = require(`../controllers/sauceController`);

// Read 
router.get(`/`, auth, sauceController.getAllSauces);
router.get(`/:id`, auth, sauceController.getSauce);

// Create 
router.post(`/`, auth, multerConfig, sauceController.createSauce);

// Update 
router.put(`/:id`, auth, multerConfig, sauceController.updateSauce);
router.post(`/:id/like`, auth, sauceController.likeSauce);

// Delete 
router.delete(`/:id`, auth, sauceController.deleteSauce);

module.exports = router;
