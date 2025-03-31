const mongoose = require('mongoose');
const appareilSchema = mongoose.Schema({
marque: { type: String, required: true },
modele: { type: String, required: true },
numSerie: { type: String, required: true }
});
module.exports= mongoose.model('Appareil', appareilSchema);
// https://www.npmjs.com/package/joi