// Importation des modules nécessaires
const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

// Création du schéma utilisateur
const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Exportation du modèle utilisateur
module.exports = mongoose.model(`User`, UserSchema);
