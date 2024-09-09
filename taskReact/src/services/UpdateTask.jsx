async function UpdateTarea(edicion, id) {
    try {
        const response = await fetch(`http://localhost:3001/tareas/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(edicion)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating task:', error);
    }
}

export default UpdateTarea;