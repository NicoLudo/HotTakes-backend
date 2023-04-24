// Importation des modules nécessaires
const jwt = require(`jsonwebtoken`);
require(`dotenv`).config()

// Middleware d'authentification
module.exports = (req, res, next) => {
    // return next() // Ligne à utiliser pour contourner l'authentification lors des tests (à commenter en production)
    try {
        const token = req.headers.authorization.split(` `)[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        next();
    } catch (error) {
        res.status(401).json({ error });
    }
};
