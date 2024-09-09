import React from 'react'
import { useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import GetUsers from '../services/GetUsuers';
import Swal from 'sweetalert2';
import UpdateAutentication from '../services/UpdateAutentication';
function FormLogIn() {
  ////// Carga de los datos///////////////
  const [correo, setUsername]= useState('');
  const [password, setPassword]= useState('');
  const [mensaje, setMensaje]= useState('');
 

  const navigate = useNavigate();
  const cargaContraseña = (event) => {
    setPassword(event.target.value);
  };
  const cargaUsuario = (event) => {
    setUsername(event.target.value);
  };
  //// Carga Datos Server hook///////////////
  const [dataUser, setDataUser]= useState([]);
  ////// LLamado al server, get fecth//////////
  useEffect(() => {
    const fetchUsers = async () => {
      const data = await GetUsers();
     setDataUser(data) /// obtengo dato del server mediante el hook
    };
    fetchUsers();
  }, []);

//////ESTA FUNCION PUEDE CARGAR ,HACER POST O BIEN REALIZAR VALIDACIONES
const cargar = async () => {  
  ///////////Buscar Usuario////////////////////////////
  const validUser = dataUser.filter(usuario=> usuario.correo === correo && usuario.contrasena === password )  
   if (validUser.length>0) {
    const token = {
      key:"true"
    }
    const id="9316";
    UpdateAutentication(token,id);
    Swal.fire({
      title: 'Has iniciado sesion con exito!',
      text: 'Te redigiremos a la pagina principal',
      icon: 'success',
      confirmButtonText: 'Ok',
      timer:1500
       });
    setTimeout(() => {
      navigate('/Principal');
    }, 2000);

  }else if (validUser.length===0){
    setMensaje("Usuario No encontrado")
    setTimeout(() => {
      setMensaje("")
    }, 1500);
 } }


 function validacionEspacios(event) {
  event.preventDefault();
}
  ///////////Renderizado////////////
  return (
    <div className='MainContainer'>
        <div className='ContainerForm'>
        <form className='formInicio' onSubmit={validacionEspacios}>
        <h1>Ingresa a tu Cuenta</h1>
        <label htmlFor="">Correo</label>
        <input type="text" 
        id='correo'
        name='correo'
        placeholder='Ingrese su correo'
        value={correo}
        onChange={cargaUsuario}
        required/>


        <label htmlFor="">Contraseña</label>
        <input type="text"
        id='password'
        name='password'
        placeholder='Ingrese su contraseña'
        value={password}
        onChange={cargaContraseña}
        required />
        

        <button onClick={cargar}>Ingresar</button>
        </form>
      <p>{mensaje}</p>
       </div>
    </div>
  )
}


export default FormLogIn