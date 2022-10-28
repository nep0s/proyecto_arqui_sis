var estado = "Pending";

window.onload = codigo => {
    var button = document.getElementById("dificultad");
	button.addEventListener('click', funcion_dificultad);

	
}

async function funcion_dificultad(){
    const data = { username: 'example' };

    fetch('https://example.com/profile', {
    method: 'POST', // or 'PUT'
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('Success:', data);

        const tag = document.getElementById("estado");
        tag.value = `${estado}`
    })
    .catch((error) => {
        console.error('Error:', error);
    });
	
};
