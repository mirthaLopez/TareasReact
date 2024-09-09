async function UpdateAutentication(key, id) {
    try {
        const response = await fetch(`http://localhost:3001/autenticacion/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(key)
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

export default UpdateAutentication;
