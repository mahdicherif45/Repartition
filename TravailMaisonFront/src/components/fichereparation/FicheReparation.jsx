import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
const FicheReparation = () => {
    const navigate = useNavigate();
    const [reparation, setReparation] = useState({
    dateDepotAppareil: '',
    datePrevueRep: '',
    etat: '',
    symptomesPanne: '',
    appareil: '',
    client: '',
    });
    const [appareilsList, setappareilsList] = useState([]);
    const [clients, setClients] = useState([]);
    
    const fetchClient = async () => {
    try {
    const res = await axios.get('http://localhost:3001/api/clients/');
    setClients(res.data);
    } catch (error) {
    console.error('Erreur lors de la récupération des clients:', error);
    }
    };
    const fetchAppareil = async () => {
    try {
    const res = await axios.get('http://localhost:3001/api/appareils/');
    setappareilsList(res.data);
    } catch (error) {
    console.error('Erreur lors de la récupération des appareils:', error);
    }
    };
    useEffect(() => {
    fetchClient();
    fetchAppareil();
    }, []);
    
    // Méthode pour Enregistrer un article dans la base de données
    const handleSave = async (e) => {
    e.preventDefault();
    try {
    await axios.post('http://localhost:3001/api/demandeReparations/',
    reparation)
    .then((res)=>{
        console.log(res.data)
// Naviguer vers la page avec les noms comme état
navigate('/ficheReparationImprimer', {
state: {
demande: res.data,
},
});
})
.catch ((error)=>{
console.error('Erreur lors de l\'enregistrement:', error);
})
} catch (error) {
console.error('Erreur lors de l\'enregistrement:', error);
}
};

return (
<div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
<center>
<h2>Insertion Demande</h2>
</center>
<Form>
<Row className="mb-2">
<Form.Group as={Col} md="6">
<Form.Label>Date dépôt appareil</Form.Label>
<Form.Control
type="date"
value={reparation.dateDepotAppareil}
onChange={(e) =>
setReparation({ ...reparation, dateDepotAppareil:
e.target.value })
}
/>
</Form.Group>
<Form.Group as={Col} md="6">
<Form.Label>Date prévue réparation</Form.Label>
<Form.Control
type="date"
value={reparation.datePrevueRep}
onChange={(e) =>
setReparation({ ...reparation, datePrevueRep: e.target.value
})
}
/>
</Form.Group>
</Row>
<Row className="mb-2">
<Form.Group as={Col} md="6">
<Form.Label>État</Form.Label>
<Form.Control
as="select"
value={reparation.etat}
onChange={(e) => setReparation({ ...reparation, etat: e.target.value })}
>
<option></option>
<option value="arrivé">Arrivé</option>
<option value="en cours">En cours</option>
<option value="réparé">Réparé</option>
</Form.Control>
</Form.Group>
<Form.Group as={Col} md="6">
<Form.Label>Symptômes Panne</Form.Label>
<Form.Control
type="text"
value={reparation.symptomesPanne}
onChange={(e) =>
setReparation({ ...reparation, symptomesPanne: e.target.value
})
}
/>
</Form.Group>
</Row>
<Row className="mb-2">
<Form.Group as={Col} md="6">
<Form.Label>Appareil</Form.Label>
<Form.Control
as="select"
value={reparation.appareil}
onChange={(e) => {setReparation({ ...reparation, appareil:
e.target.value })}}
>
<option>Choisir un appareil</option>
{appareilsList.map((ap, index) => (
<option value={ap._id} key={index}>
{ap.marque}
</option>
))}
</Form.Control>
</Form.Group>
<Form.Group as={Col} md="6">
<Form.Label>Client</Form.Label>
<Form.Control
as="select"
value={reparation.client}
onChange={(e) => {setReparation({ ...reparation,client:
e.target.value })}}
>
<option>Choisir un client</option>
{clients.map((cl, index) => (
<option value={cl._id} key={index}>
{cl.nom}
</option>
))}
</Form.Control>
</Form.Group>
</Row>
<button
type="button"
className="btn btn-success btn-sm"
onClick={(e) => handleSave(e)}
>
<i className="fa-solid fa-print"></i> Imprimer
</button>
&nbsp;
<Link to="/client">
<button type="button" className="btn btn-danger btn-sm">
<i className="fa-solid fa-circle-xmark"></i> Annuler
</button>
</Link>

</Form>

<div>
</div>
</div>
);
};
export default FicheReparation;