import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Insertclient from './components/clients/Insertclient';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Menu from './components/Menu'
import Listclients from './components/clients/Listclients';
import Updateclient from './components/clients/Updateclient';
import Listdemandesrep from './components/demandesreparation/Listdemandesrep';
import FicheReparation from './components/fichereparation/FicheReparation';
import FicheReparationImprimer from './components/fichereparation/FicheReparationImprimer';
import ModifReparation from './components/demandesreparation/ModifReparation';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
    <Menu/>
    <Routes>
    <Route path="/client" element={<Listclients/>}/>
    <Route path="/client/add" element={<Insertclient/>}/>
    <Route path="/client/edit" element={<Updateclient/>}/>
    <Route path='/fichedemrep' element={<Listdemandesrep/>}/>
<Route path="/ficheReparationImprimer" element={<FicheReparationImprimer />} />
<Route path="/reparation" element={<FicheReparation/>} />
<Route path="/modifRep" element={<ModifReparation />} />
    </Routes>
    </Router>
    </>
    )
}

export default App
