import React from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Register from "../pages/Register";
import LoginPage from "../pages/LoginPage";
import Principal from "../pages/Principal";
import ProtectedRoutes from "./ProtectedRoutes";
const Routing = () => {
    return (
        <Router>
        <Routes>
          <Route path="/Register" element={<Register />} /> 
          <Route path="/LoginPage" element={<LoginPage />} /> 
          <Route path="/Principal" element={<ProtectedRoutes><Principal /></ProtectedRoutes>} />
        </Routes>
       </Router>
    )
}

export default Routing;  