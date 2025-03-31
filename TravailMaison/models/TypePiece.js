const mongoose = require('mongoose');
const typePieceSchema = mongoose.Schema({
tarifH: { type: Number, required: true },
type: { type: String, required: true }
});
module.exports= mongoose.model('TypePiece', typePieceSchema);