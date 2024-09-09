async function postUsuario(usuario) {
    try {
        const response = await fetch("http://localhost:3001/users",{
            method: 'POST',
            headers: {
                'Content-Type':  'aplication/json'
            },
            body: JSON.stringify(usuario)
        })
        const data = await response.json();

        return data

    } catch (error) {
        console.error(error)
        
    }
    
}
export default postUsuario
