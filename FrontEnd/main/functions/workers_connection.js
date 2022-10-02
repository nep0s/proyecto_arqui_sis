window.onload = codigo => {
    var button = document.getElementById("dificultad")
	button.addEventListener('click', funcion_dificultad);

	
}

async function funcion_dificultad(){
    let response = await fetch(url);
    let data = await response.json();
    return data;
	
};
async function fetchAsync (url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
  }