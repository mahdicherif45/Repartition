const express=require("express")
const DemandeReparation=require("../models/DemandeReparation")
const router=express.Router()
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
host: 'smtp.ethereal.email',
port: 587,
secure: false,
auth: {
user: 'sid.zboncak76@ethereal.email',
pass: 'BTP4eR3V37mpjhGZwa'
}
});
router.post("/",async(req,res)=>{
const demandeReparation=new DemandeReparation(req.body)
try {
await demandeReparation.save()
res.status(200).json(demandeReparation)
} catch (error) {
res.status(404).json({message:error.message})
}
})
router.put("/:id",async(req,res)=>{
try {
const demandeReparation = await DemandeReparation.findByIdAndUpdate(
req.params.id,
{ $set: req.body },
{ new: true }
);
if(req.body.etat="réparé") {
    // Send notification email
    const mailOption = {
    from: 'abcCorporation@gmail.com',
    to: req.body.client.email,
    subject: 'Notification',
    html: `<h2> ${req.body.client.nom} </h2>
    <h4>Votre appareil a été réparé. Vous pouvez passer le
    récupérer.</h4>`
    };
    try {
    await transporter.sendMail(mailOption);
    console.log('Verification email sent to your account');
    } catch (error) {
    console.log(error);
    }
    }
res.status(200).json(demandeReparation);
} catch (error) {
res.status(404).json({message:error.message})
}
})
router.get('/',async(req,res)=>{
try {
const demandeReparations= await DemandeReparation.find({}, null,
{sort: {'_id': -1}}).populate("appareil").populate("client")
res.status(200).json(demandeReparations)
} catch (error) {
res.status(404).json({message:error.message})
}
})
router.get("/:id",async(req,res)=>{
try {
const demandeReparation=await
DemandeReparation.findById(req.params.id).populate("appareil").populate("client")
res.status(200).json(demandeReparation)
} catch (error) {
res.status(404).json({message:error.message})
}
})
router.delete("/:id",async(req,res)=>{
try {
await DemandeReparation.findByIdAndDelete(req.params.id)
res.status(200).json({messge:"DemandeReparation supprimée avecsuccées"})
} catch (error) {
res.status(404).json({message:error.message})
}
})
router.get('/dr/pagination', async(req, res) => {
const filtre = req.query.filtre || "";
const page = parseInt(req.query.page);
const pageSize = parseInt(req.query.pageSize);

// Calculate the start and end indexes for the requested page
const startIndex = (page - 1) * pageSize;
const endIndex = page * pageSize;
const demandeReparations = await DemandeReparation.find({ symptomesPanne:
{ $regex: filtre, $options: "i"}}, null, {sort: {'_id': -
1}}).populate("appareil").populate("client").exec()
// Slice the dr array based on the indexes
const paginatedProducts = demandeReparations.slice(startIndex, endIndex);
// Calculate the total number of pages
const totalPages = Math.ceil(demandeReparations.length / pageSize);
// Send the paginated dr and total pages as the API response
res.json({ dr: paginatedProducts, totalPages });
});

module.exports=router