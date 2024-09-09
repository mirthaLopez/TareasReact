import React, { useState, useEffect } from 'react';
import '../styles/Tareas.css';
import Swal from 'sweetalert2';
import PostTarea from '../services/postTask';
import GetTarea from '../services/GetTask';
import UpdateTarea from '../services/UpdateTask';
import EliminarTask from '../services/DeleteTask';
function Tareas() {
  const [task, setTask] = useState('');
  const [date, setDate] = useState('');
  const [dataTarea, setDataTarea] = useState([]); ////Guarda los datos de la lista
  const [estadoEdicion, setEstadoEdit] = useState({}); //// controla el estado del input
  const [tareaEditada, setTareaEditada] = useState({}); /////Guarda el nuevo valor del input 

  ///////Seteo de datos////////////////////////////////////
  const cargaTarea = (event) => {
    setTask(event.target.value);
  };
  const cargaFecha = (event) => {
    setDate(event.target.value); 
  };
  
  ///////Envia datos al server///////////////////
  const cargar = async () => {
  ///////////////Valida espacios vacios////////////////
    const validadorTarea = task.trim();
    const validadorFecha = date.trim();
    if (validadorTarea.length !== 0 && validadorFecha.length !== 0) {
      const tarea2 = { 
        descripcion: task,
        fecha: date };
      /////Post al server////////
      PostTarea(tarea2);
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Debes llenar todos los datos',
        icon: 'error',
        confirmButtonText: 'Intenta Nuevamente',
        timer: 2000,
      });
    }
  };


  //////Traigo las tareas del server y asigno a una variable//// 
  useEffect(() => {
    const fetchData = async () => {
      const data = await GetTarea();
      setDataTarea(data); //// seteo variable data tarea
    };
    fetchData();
  }, []);

  //////////////Edicion////////////////
  const startEdit = (id) => {
    const tarea = dataTarea.find(item => item.id === id);
    setEstadoEdit({ ...estadoEdicion, [id]: true });
    setTareaEditada({ ...tareaEditada, [id]: tarea.descripcion }); /////Asigno el valor del input a la propiedad descripcion del objeto
};

const handleEditChange = (event, id) => {
    setTareaEditada({
        ...tareaEditada,
        [id]: event.target.value 
    });
};

const save = (id) => {
    const tareaOriginal = dataTarea.find(item => item.id === id); ////// busco la tarea por su id para poder 
    ////capturar los valores que no cambian (fecha)
    console.log(tareaOriginal);
    const edicion = {
        id: id,
        descripcion: tareaEditada[id],
        fecha: tareaOriginal.fecha
    };
    setEstadoEdit({ ...estadoEdicion, [id]: false });
    UpdateTarea(edicion, id);
};

///////////Funcion elimina tarea////////////////
const deleteTask = (id) => { 
  EliminarTask (id);
};

////// Recorro la lista con un map y muestro su contenido en etiquetas//// 
const ListaTareas = dataTarea.map((item) => {
    const id = item.id;
    const descripcion = item.descripcion;
    const fecha = item.fecha;
    return (
        <div key={id}>
            <h3>{descripcion}</h3>
            <p>{fecha}</p>
            <button onClick={() => deleteTask (id)}>Eliminar</button> <br /> <br />
            <button onClick={() => startEdit(id)}>Editar</button>
            <input
                type="text"
                id={`edicion-${id}`}
                name="edicion"
                value={tareaEditada[id] || ''}
                onChange={(event) => handleEditChange(event, id)}
                required
                disabled={!estadoEdicion[id]}
            />
            <button onClick={() => save(id)}>Guardar</button>
        </div>
    );
});

  return (
    <div className='ContenedorTareas'>
      <div>
        <h1>Agenda del mes</h1>
        <label htmlFor="tarea">Tarea o evento</label>
        <input
          type="text"
          id='tarea'
          name='tarea'
          placeholder='Ingrese tarea o evento'
          value={task}
          onChange={cargaTarea}
          required
        />
        <label htmlFor="fecha">Fecha</label>
        <input
          type="date"
          id='fecha'
          name='fecha'
          placeholder='Ingrese fecha'
          value={date}
          onChange={cargaFecha}
          required
        />
        <button onClick={cargar}>Añadir</button>
      </div>
      <div className='contenedorPrimario'>
        <div>{ListaTareas}</div>
      </div>
    </div>
  );
}

export default Tareas;


