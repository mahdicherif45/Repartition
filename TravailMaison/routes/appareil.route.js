const express=require("express")
const Appareil=require("../models/Appareil")
const router=express.Router()
router.post("/",async(req,res)=>{
const appareil=new Appareil(req.body)
try {
await appareil.save()
res.status(200).json(appareil)
} catch (error) {
res.status(404).json({message:error.message})
}
})
router.put("/:id",async(req,res)=>{
try {
const appareil = await Appareil.findByIdAndUpdate(
req.params.id,
{ $set: req.body },
{ new: true }
);
res.status(200).json(appareil);
} catch (error) {
res.status(404).json({message:error.message})
}
})
router.get('/',async(req,res)=>{
try {
const appareils= await Appareil.find({}, null, {sort: {'_id': -1}})
res.status(200).json(appareils)
} catch (error) {
res.status(404).json({message:error.message})
}
})
router.get("/:id",async(req,res)=>{
try {
const appareil=await Appareil.findById(req.params.id)
res.status(200).json(appareil)
} catch (error) {
res.status(404).json({message:error.message})
}
})
router.delete("/:id",async(req,res)=>{
try {
await Appareil.findByIdAndDelete(req.params.id)
res.status(200).json({messge:"appareil supprimée"})
} catch (error) {
res.status(404).json({message:error.message})
}
})

module.exports=router