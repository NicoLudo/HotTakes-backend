const express = require(`express`);
const mongoose = require(`mongoose`);
const cors = require(`cors`);
const app = express();
const userRoutes = require(`./routes/userRoutes`);
const sauceRoutes = require(`./routes/sauceRoutes`);
const path = require(`path`);

app.use(cors());

mongoose.connect(`mongodb+srv://alexv3rtmtool:9yQaUvbOTqzpnmWA@cluster0.zstmuw6.mongodb.net/?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log(`Connexion à MongoDB réussie !`))
    .catch(() => console.log(`Connexion à MongoDB échouée !`));

app.use(express.json());
app.use(`/api/auth`, userRoutes);
app.use(`/api/sauces`, sauceRoutes);
app.use(`/images`, express.static(path.join(__dirname, `images`)));

module.exports = app;
