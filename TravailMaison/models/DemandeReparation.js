const mongoose = require('mongoose');
const demandeReparationSchema = mongoose.Schema({
dateDepotAppareil: { type: Date, required: true },

datePrevueRep: { type: Date, required: true },
etat: { type: String, required: true },
symptomesPanne: { type: String, required: true },
client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required:
true },
appareil: { type: mongoose.Schema.Types.ObjectId, ref: 'Appareil',
required: true }
});
module.exports= mongoose.model('DemandeReparation', demandeReparationSchema);