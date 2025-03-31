import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Affichedemanderep from './Affichedemanderep'
const Listdemandesrep = () => {
    const[demandesrep,setDemandesrep]=useState([])
    const fetchdemanderep=async()=>{
    const res=await axios.get("http://localhost:3001/api/demandeReparations/")
    setDemandesrep(res.data)
    }
    useEffect(()=>{
    fetchdemanderep()
    },[])
    const handleDelete=async(num_demande)=>{
    if(window.confirm("Supprimer Demande Reparation O/N")){
    await
    axios.delete(`http://localhost:3001/api/demandeReparations/${num_demande}`)
    .then(res=>{
    console.log("Demande supprimé avec success",res)
    setDemandesrep(prevDRs => prevDRs.filter((dr) => dr._id !==
    num_demande));
    })
    .catch((error) => {
    console.log(error)
    })
    }
    }
    return (
    <div>
    <Link to="/reparation"> <button className='btn btn-success btn-sm'><i
    className="fa-solid fa-square-plus"></i> Ajout Demande</button></Link>
    <Link to="/modifRep"> <button className='btn btn-info btn-sm'><i
    className="fa-solid fa-pen-to-square"></i> Modification Etat
    Demande</button></Link>
    <Affichedemanderep demandesrep={demandesrep} handleDelete={handleDelete}
    />
    </div>
    )
    }
    export default Listdemandesrep