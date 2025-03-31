import React, { useState, useEffect } from "react";
import './StyleModifRep.css';
import axios from 'axios';
const TaskList = () => {
const [tasks, setTasks] = useState([]);
const fetchdemanderep=async()=>{
const res=await axios.get("http://localhost:3001/api/demandeReparations/")
setTasks(res.data)
}
useEffect(() => {
fetchdemanderep();
}, []);
const formatDate = (dateString) => {
const date = new Date(dateString);
return new Intl.DateTimeFormat('fr-FR', {
year: 'numeric',
month: 'long',
day: 'numeric',
}).format(date);
};
const onDragStart = (evt) => {
    let element = evt.currentTarget;
element.classList.add("dragged");
const taskId = element.getAttribute("id");
evt.dataTransfer.setData("text/plain", taskId);
evt.dataTransfer.effectAllowed = "move";
};

const onDragEnd = (evt) => {
evt.currentTarget.classList.remove("dragged");
};
const onDragEnter = (evt) => {
evt.preventDefault();
let element = evt.currentTarget;
element.classList.add("dragged-over");
evt.dataTransfer.dropEffect = "move";
};
const onDragLeave = (evt) => {
let currentTarget = evt.currentTarget;
let newTarget = evt.relatedTarget;
if (newTarget?.parentNode === currentTarget || newTarget ===
currentTarget) return;
evt.preventDefault();
let element = evt.currentTarget;
element.classList.remove("dragged-over");
};
const onDragOver = (evt) => {
evt.preventDefault();
evt.dataTransfer.dropEffect = "move";
};
const onDrop = async (evt, value, status) => {
evt.preventDefault();
evt.currentTarget.classList.remove("dragged-over");
// Récupérer l'ID de la tâche déplacée
let data = evt.dataTransfer.getData("text/plain");
// Trouver la tâche correspondante
let taskToUpdate = tasks.find((task) => task._id.toString() ===
data.toString());
if (!taskToUpdate) return; // Si aucune tâche n'est trouvée, quitter la
//fonction
// Mettre à jour son état
let updatedTask = { ...taskToUpdate, etat: status };
try {
// Envoyer la mise à jour au serveur
await
axios.put(`http://localhost:3001/api/demandeReparations/${taskToUpdate._id}`,
updatedTask);
console.log(updatedTask)
// Mettre à jour l'état local après la mise à jour réussie
let updatedTasks = tasks.map((task) =>
task._id.toString() === data.toString() ? updatedTask : task
);
setTasks(updatedTasks);
} catch (error) {
console.error("Erreur lors de la mise à jour :", error);
alert("Impossible de mettre à jour la tâche. Veuillez réessayer.");
}
};
const pending = tasks.filter((data) => data.etat === "en cours");
const done = tasks.filter((data) => data.etat === "réparé");
const newOrder = tasks.filter((data) => data.etat === "arrivé");
return (
<div className="container">
<div
className="order small-box"
onDragLeave={onDragLeave}
onDragEnter={onDragEnter}
onDragEnd={onDragEnd}
onDragOver={onDragOver}
onDrop={(e) => onDrop(e, false, "arrivé")}
>
<section className="drag_container">
<div className="container">
<div className="drag_column">
<div className="drag_row">
<h4>Arrivé</h4>
<button style={{ width: "100%" }}>----------</button>
{newOrder.map((task) => (
<div
className="card"
key={task._id}
id={task._id}
draggable
onDragStart={onDragStart}
onDragEnd={onDragEnd}
>
<div className="card_right">
<div className="status">{task.etat}</div>
<div className="days">{task.client.nom}</div>
<div className="days">{task.appareil.marque}</div>
<div
className="time">{formatDate(task.dateDepotAppareil)}</div>
<div
className="time">{formatDate(task.datePrevueRep)}</div>
</div>
</div>
))}
</div>
</div>
</div>
</section>
</div>
<div
className="pending small-box"
onDragLeave={onDragLeave}
onDragEnter={onDragEnter}
onDragEnd={onDragEnd}
onDragOver={onDragOver}
onDrop={(e) => onDrop(e, false, "en cours")}
>
<section className="drag_container">
<div className="container">
<div className="drag_column">
<div className="drag_row">
<h4>En cours</h4>
<button style={{ width: "100%" }}>----------</button>
{pending.map((task) => (
<div
className="card"
key={task._id}
id={task._id}
draggable
onDragStart={onDragStart}
onDragEnd={onDragEnd}
>
<div className="card_right">
<div className="status">{task.etat}</div>
<div className="days">{task.client.nom}</div>
<div className="days">{task.appareil.marque}</div>
<div
className="time">{formatDate(task.dateDepotAppareil)}</div>
<div
className="time">{formatDate(task.datePrevueRep)}</div>
</div>
</div>
))}
</div>
</div>
</div>
</section>
</div>
<div
className="done small-box"
onDragLeave={onDragLeave}
onDragEnter={onDragEnter}
onDragEnd={onDragEnd}
onDragOver={onDragOver}
onDrop={(e) => onDrop(e, true, "réparé")}
>
<section className="drag_container">
<div className="container">
<div className="drag_column">
<div className="drag_row">
<h4>Réparé</h4>
<button style={{ width: "100%" }}>----------</button>
{done.map((task) => (
<div
className="card"
key={task._id}
id={task._id}
draggable
onDragStart={onDragStart}
onDragEnd={onDragEnd}
>
<div className="card_right">
<div className="status">{task.etat}</div>
<div className="days">{task.client.nom}</div>
<div className="days">{task.appareil.marque}</div>
<div
className="time">{formatDate(task.dateDepotAppareil)}</div>
<div
className="time">{formatDate(task.datePrevueRep)}</div>
</div>
</div>
))}
</div>
</div>
</div>
</section>
</div>
</div>
);
};
export default TaskList;