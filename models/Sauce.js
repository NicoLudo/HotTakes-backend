// Importation des modules nécessaires
const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

// Création du schéma sauce
const SauceSchema = new Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    mainPepper: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, required: true, default: 0 },
    dislikes: { type: Number, required: true, default: 0 },
    usersLiked: { type: [String], required: true, default: [] },
    usersDisliked: { type: [String], required: true, default: [] }
});

// Exportation du modèle sauce
module.exports = mongoose.model(`Sauce`, SauceSchema);
