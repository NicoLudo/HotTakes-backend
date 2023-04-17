const Sauce = require(`../models/Sauce`);
const fs = require(`fs`);

// Read 
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then((sauces) => res.status(200).json(sauces))
        .catch((error) => res.status(400).json({ error }));
};

exports.getSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => res.status(200).json(sauce))
        .catch((error) => res.status(404).json({ error }));
};

// Create 
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    sauceObject.userId = req.auth.userId;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get(`host`)}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({ message: `Sauce enregistrée !` }))
        .catch((error) => res.status(400).json({ error }));
};

// Update 
exports.updateSauce = (req, res, next) => {
    let sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get(`host`)}/images/${req.file.filename}`
        } : { ...req.body };

    Sauce.updateOne({ _id: req.params.id, userId: req.auth.userId }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: `Sauce mise à jour !` }))
        .catch((error) => res.status(400).json({ error }));
};

exports.likeSauce = (req, res, next) => {
    const userId = req.body.userId;
    const like = req.body.like;
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            switch (like) {
                case 1:
                    if (!sauce.usersLiked.includes(userId)) {
                        sauce.usersLiked.push(userId);
                        sauce.likes++;

                        if (sauce.usersDisliked.includes(userId)) {
                            sauce.usersDisliked.pull(userId);
                            sauce.dislikes--;
                        }
                    }
                    break;
                case 0:
                    if (sauce.usersLiked.includes(userId)) {
                        sauce.usersLiked.pull(userId);
                        sauce.likes--;
                    }
                    if (sauce.usersDisliked.includes(userId)) {
                        sauce.usersDisliked.pull(userId);
                        sauce.dislikes--;
                    }
                    break;
                case -1:
                    if (!sauce.usersDisliked.includes(userId)) {
                        sauce.usersDisliked.push(userId);
                        sauce.dislikes++;

                        if (sauce.usersLiked.includes(userId)) {
                            sauce.usersLiked.pull(userId);
                            sauce.likes--;
                        }
                    }
                    break;
                default:
                    return res.status(400).json({ message: `Valeur j'aime invalide` });
            }

            sauce.save()
                .then(() => res.status(200).json({ message: `Sauce aimée/détestée avec succès !` }))
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

// Delete 
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            const filename = sauce.imageUrl.split(`/images/`)[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: `Sauce supprimée !` }))
                    .catch((error) => res.status(400).json({ error }));
            });
        })
        .catch((error) => res.status(500).json({ error }));
};
