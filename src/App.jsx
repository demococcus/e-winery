import {  BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import './i18n/i18n';

import BasicNavbar from './pages/Navbar/BasicNavbar'; 
import GrapeList from './pages/GrapeList/GrapeList';
import Grape from './pages/Grape/Grape';
import GrapeAdd from './pages/Grape/GrapeAdd';
import WineList from './pages/WineList/WineList';
import Wine from './pages/Wine/Wine';
import WineAdd from './pages/Wine/WineAdd';
import Tank from './pages/Tank/Tank';
import TankForm from './pages/Tank/TankForm';
import Barrel from './pages/Barrel/Barrel';
import BarrelForm from './pages/Barrel/BarrelForm';
import WorksheetList from './pages/WorksheetList/WorksheetList';
import WorksheetAdd from './pages/Worksheet/WorksheetAdd';
import LabList from './pages/Lab/LabList';
import LabForm from './pages/Lab/LabForm';
import Additive from './pages/Additive/Additive';
import AdditiveForm from './pages/Additive/AdditiveForm';
import About from './pages/About/About';
import User from './pages/User/User';
import ProtectedRoute from './pages/Auth/ProtectedRoute';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import LogOut from './pages/Auth/LogOut';
import NotFound from './pages/_shared/NotFound';
import GrapeLabForm from './pages/Lab/GrapeLabForm';


function App() {
  return (

    <Router>
      <BasicNavbar />
      
      <Container>
        <Routes>
          <Route element={<ProtectedRoute />}>            
            <Route path="/grapes" element={<GrapeList />} />
            <Route path="/grape/add" element={<GrapeAdd />} />
            <Route path="/grape/:id" element={<Grape />} />

            <Route path="/wines" element={<WineList />} />
            <Route path="/wine/add" element={<WineAdd />} />
            <Route path="/wine/edit/:id" element={<Wine editMode/>} />
            <Route path="/wine/:id" element={<Wine />} />

            <Route path="/lab" element={<LabList />} />
            <Route path="/lab/add/:id" element={<LabForm />} />
            <Route path="/lab/grape/add/:id" element={<GrapeLabForm />} />
            <Route path="/worksheets" element={<WorksheetList />} />
            <Route path="/worksheet/add" element={<WorksheetAdd />} />
            
            <Route path="/tank/add" element={<TankForm />} />
            <Route path="/tanks" element={<Tank />} />
            
            <Route path="/barrel/add" element={<BarrelForm />} />
            <Route path="/barrels" element={<Barrel />} />         

            <Route path="/additives" element={<Additive />} />         
            <Route path="/additive/add" element={<AdditiveForm />} />
                        
            <Route path="/me" element={<User />} />
          </Route>           

          <Route path="/login" element={<Login />} />            
          <Route path="/logout" element={<LogOut />} />
          <Route path="/register" element={<Register />} />

          <Route path="/about" element={<About />} />            

          <Route path="/" exact element={<Login />} />
          <Route path="*" element={<NotFound />} />
          

        </Routes>          
      </Container>
    </Router>



  );
}

export default App;
