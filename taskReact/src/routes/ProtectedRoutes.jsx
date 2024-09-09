import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import GetAutentication from '../services/GetAutentication';

const ProtectedRoutes=({children}) => {
  const navigate = useNavigate();
    useEffect(() => {
    const fetchKey = async () => {
    const data = await GetAutentication();    
     if (data[0].key === 'true') {      
     }else{
      return navigate ("/LoginPage")
     }
    };
    fetchKey();
  }, [])
  return children; /// si se cumple la condicional return to principal
}

export default ProtectedRoutes