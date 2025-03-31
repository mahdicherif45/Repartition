const express=require("express")
const dotenv=require("dotenv")
const mongoose=require("mongoose")
const cors=require("cors")
const app = express();
app.use(cors({

origin:'*'
}))
//middleware
app.use(express.json())
dotenv.config()
// Connexion à la base données
mongoose.connect(process.env.DATABASE)
.then(() => {console.log("Connexion à la base de données réussie");
}).catch(err => {
console.log('Impossible de se connecter à la base de données', err);
process.exit();
});

//serveur
app.listen(process.env.PORT)
console.log("application executée sur le port " + process.env.PORT)
module.exports = app;
//routes
const clientRouter=require("./routes/client.route")
const appareilRouter=require("./routes/appareil.route")
const demandeReparationRouter=require("./routes/demandeReparation.route")
//appel routes
app.use("/api/clients",clientRouter)
app.use("/api/appareils",appareilRouter)
app.use("/api/demandeReparations",demandeReparationRouter)