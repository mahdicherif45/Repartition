const express=require("express")
const Client=require("../models/Client")
const router=express.Router()
router.post("/",async(req,res)=>{
const client=new Client(req.body)
try {
await client.save()
res.status(200).json(client)
} catch (error) {
res.status(404).json({message:error.message})
}
})
router.put("/:id",async(req,res)=>{
try {
const client = await Client.findByIdAndUpdate(
req.params.id,
{ $set: req.body },
{ new: true }
);
res.status(200).json(client);
} catch (error) {
res.status(404).json({message:error.message})
}
})
router.get('/',async(req,res)=>{
try {
const clients= await Client.find({}, null, {sort: {'_id': -1}})
res.status(200).json(clients)
} catch (error) {
res.status(404).json({message:error.message})
}
})
router.get("/:id",async(req,res)=>{

try {
const client=await Client.findById(req.params.id)
res.status(200).json(client)
} catch (error) {
res.status(404).json({message:error.message})
}
})
router.delete("/:id",async(req,res)=>{
try {
await Client.findByIdAndDelete(req.params.id)
res.status(200).json({messge:"client supprimée"})
} catch (error) {
res.status(404).json({message:error.message})
}
})

module.exports=router