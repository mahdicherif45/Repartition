const mongoose = require('mongoose');
const clientSchema = mongoose.Schema({
adresse: { type: String, required: true },
nom: { type: String, required: true },
numTel: { type: String, required: true },
email: { type: String, required: true }
});
module.exports=mongoose.model('Client', clientSchema);