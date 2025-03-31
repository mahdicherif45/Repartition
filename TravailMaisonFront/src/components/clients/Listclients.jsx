import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Afficheclient from './Afficheclient'
const Listclients = () => {
const[clients,setClients]=useState([])
const fetchClient=async()=>{
const res=await axios.get("http://localhost:3001/api/clients/")
setClients(res.data)
console.log(res.data)
}
useEffect(()=>{
fetchClient()
},[])
const handleDelete=async(id_client,nom)=>{
if(window.confirm("Supprimer client O/N "+nom)){
await axios.delete(`http://localhost:3001/api/clients/${id_client}`)
.then(res=>{
console.log("client ",nom," supprimé avec succès ",res);
setClients(prevClients => prevClients.filter((client) => client._id !==
id_client));
})
.catch((error) => {
console.log(error)
})
}
}
return (
<div>
<Link to="/client/add"> <button className='btn btn-success btn-sm'><i
className="fa-solid fa-square-plus"></i> Ajout</button></Link>
<Afficheclient clients={clients} handleDelete={handleDelete} />
</div>
)
}
export default Listclients