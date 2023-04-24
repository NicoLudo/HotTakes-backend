// Importation des modules nécessaires
const http = require(`http`);
const app = require(`./app`);

// Fonction pour normaliser le numéro de port
const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

// Définition du port d'écoute
const port = normalizePort(process.env.PORT || `3000`);
app.set(`port`, port);

// Gestionnaire d'erreurs pour le serveur
const errorHandler = error => {
    if (error.syscall !== `listen`) {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === `string` ? `pipe ` + address : `port: ` + port;
    switch (error.code) {
        case `EACCES`:
            console.error(bind + ` nécessite des privilèges élevés.`);
            process.exit(1);
            break;
        case `EADDRINUSE`:
            console.error(bind + ` est déjà en cours d'utilisation.`);
            process.exit(1);
            break;
        default:
            throw error;
    }
};

// Création du serveur
const server = http.createServer(app);

// Gestion des événements du serveur
server.on(`error`, errorHandler);
server.on(`listening`, () => {
    const address = server.address();
    const bind = typeof address === `string` ? `pipe ` + address : `port: ` + port;
    console.log(`Écoute sur ` + bind);
});

// Lancement du serveur
server.listen(port);
