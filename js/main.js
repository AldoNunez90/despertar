
let infoDetallada = ''
const mostrarInfo = data => {
    data.forEach(item => {
        infoDetallada +=
        `
        <div class="terapias">    
        <h3>${item.tipo}</h3>
        <p>${item.descripcion}</p>
        <img src=${item.img} class="tratamientosDosImg"></img> 
        </div>
        `
        console.log(data)
    })
    $('.acaVaTodo').append(infoDetallada)
}

$('.acaVaTodo').append(`<p class="tituloDeSeccion">Tratamientos</p>
<div class="encabezadoSeccion">Todos nuestros tratamientos son de asistencia voluntaria y, en caso de ser necesario, tras un exhaustivo diagnóstico diferencial, implementando tratamientos. \n Contamos con un equipo terapéutico interdisciplinario altamente capacitado, conformado por psicólogos, psiquiatras, médicos, docentes, trabajadores sociales, operadores socio-terapéuticos, talleristas, entre otros.</div>`)


const cargarInfo = async() =>{
    try {
        const JSONData = await fetch("../js/detalles.json")
        const data = await JSONData.json()
        mostrarInfo(data);
    } catch {
        alert("Se produjo un error al cargar la información")
    }
};

cargarInfo()