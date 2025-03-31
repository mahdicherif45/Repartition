import React, { useState, useEffect } from 'react';
import './styleimpression.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
const FicheReparationImprimer = () => {
const location = useLocation();
const { demande } = location.state || {};
if (!demande) {
return <div>Aucune demande disponible</div>;
}
const [appareil, setAppareil] = useState([]);
const [client, setClient] = useState({});
const fetchClient = async () => {
try {
const res = await
axios.get(`http://localhost:3001/api/clients/${demande.client}`);
setClient(res.data);
} catch (error) {
console.error('Erreur lors de la récupération des clients:',
error);
}
};
const fetchAppareil = async () => {
try {
const res = await
axios.get(`http://localhost:3001/api/appareils/${demande.appareil}`);
setAppareil(res.data);
} catch (error) {
console.error('Erreur lors de la récupération des appareils:',
error);
}
};
useEffect(() => {
fetchClient();
fetchAppareil();
}, [demande]);
const formatDate = (dateString) => {
const date = new Date(dateString);
return new Intl.DateTimeFormat('fr-FR', {
year: 'numeric',
month: 'long',
day: 'numeric',
}).format(date);
};
return (
<div>
<div id="partieImprimable">
<h1>Ticket de Réparation</h1>
<div>
<p><strong>Date de Dépôt de l'Appareil:</strong>
{formatDate(demande.dateDepotAppareil)}</p>
<p><strong>Date Prévue pour la Réparation:</strong>
{formatDate(demande.datePrevueRep)}</p>
<p><strong>État:</strong> {demande.etat}</p>
<p><strong>Symptômes de la Panne:</strong>
{demande.symptomesPanne}</p>
<h3>Appareil:</h3>
<p><strong>Marque:</strong> {appareil.marque}</p>
<p><strong>Modèle:</strong> {appareil.modele}</p>
<p><strong>Numéro de Série:</strong>
{appareil.numSerie}</p>
<h3>Client:</h3>
<p><strong>Nom:</strong> {client.nom}</p>
<p><strong>Email:</strong> {client.numTel}</p>
<p><strong>Adresse:</strong> {client.adresse}</p>
</div>
</div>
<div id="a-exclure">
<button

className="bg-emerald-50 hover:bg-emerald-500 hover:text-
white transition-colors duration-500 text-emerald-500 py-3 px-5 rounded-md w-
100"

onClick={() => window.print()}
>
Imprimer
</button>
</div>
</div>
);
};
export default FicheReparationImprimer;