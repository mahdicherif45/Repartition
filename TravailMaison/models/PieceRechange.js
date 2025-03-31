const mongoose = require('mongoose');
const pieceRechangeSchema = mongoose.Schema({
code: { type: String, required: true },
nom: { type: String, required: true },
prixAchat: { type: Number, required: true },
prixHT: { type: Number, required: true },
prixTTC: { type: Number, required: true },
typePiece: { type: mongoose.Schema.Types.ObjectId, ref: 'TypePiece' },
qte: { type: Number, required: true }
});
module.exports= mongoose.model('PieceRecharge', pieceRechangeSchema);