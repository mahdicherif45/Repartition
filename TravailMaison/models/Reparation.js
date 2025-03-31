const mongoose = require('mongoose');
const reparationSchema = mongoose.Schema({
dateRep: { type: Date, required: true },
description: { type: String, required: true },
tarifHMO: { type: Number, required: true },
tempsMO: { type: Number, required: true },
demandeReparation: { type: mongoose.Schema.Types.ObjectId, ref:
'DemandeReparation', required: true },
piecesRechange: [{ type: mongoose.Schema.Types.ObjectId, ref:
'PieceRecharge' }]
});
module.exports= mongoose.model('Reparation', reparationSchema);