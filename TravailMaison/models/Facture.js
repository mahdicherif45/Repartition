const mongoose = require('mongoose');
const factureSchema = mongoose.Schema({
date: { type: Date, required: true },
montantTotal: { type: Number, required: true },
numero: { type: String, required: true },
reparation: { type: mongoose.Schema.Types.ObjectId, ref: 'Reparation',
required: true }
});
module.exports= mongoose.model('Facture', factureSchema);