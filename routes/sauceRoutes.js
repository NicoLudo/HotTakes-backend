const express = require(`express`);
const router = express.Router();

const auth = require(`../middleware/auth`);
const multerConfig = require('../middleware/multer-config');
const sauceController = require(`../controllers/sauceController`);

// Read 
router.get(`/`, auth, sauceController.getAllSauces);
router.get(`/:id`, auth, sauceController.getSauce);

// Create 
router.put('/:id', auth, multerConfig, sauceController.updateSauce);

// Update 
router.post(`/`, auth, multerConfig, sauceController.createSauce);

// Delete 
router.delete(`/:id`, auth, sauceController.deleteSauce);

module.exports = router;
