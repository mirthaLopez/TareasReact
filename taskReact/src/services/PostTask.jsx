async function PostTarea(tarea2) {
    try {
        const response = await fetch("http://localhost:3001/tareas",{
            method: 'POST',
            headers: {
                'Content-Type':  'application/json'
            },
            body: JSON.stringify(tarea2)
        })
        const data = await response.json();
        return data

    } catch (error) {
         console.error(error) 
    }
}
export default PostTarea

