const tarea = document.getElementById("tarea");
const listatareas = document.getElementById("lista-tareas");
const total = document.getElementById("total");

const arrayTareas = [
  {
    id: 1657477620278,
    tarea: "Un lugar ideal para descansar de la ciudad",
    estado: false,
  },
  {
    id: 1657477695821,
    tarea: "Despierta tus días oyendo el oceano",
    estado: false,
  },
  {
    id: 1657477754095,
    tarea: "Ten cerca de ti todo lo que necesitas",
    estado: false,
  },
];

//VISUALIZACIOn INICIAL DE LAS TAREAS ALMACENADAS EN EL ARREGLO
renderTareas();

//AGREGAR NUEVA TAREA
function Agregar() {
  if (tarea.value === "") {
    alert("Debe agregar una tarea!");
  } else {
    arrayTareas.push({
      id: Date.now(),
      tarea: tarea.value,
      estado: false,
    });
    renderTareas();

    tarea.value = "";
    tarea.focus();
  }
}
// ELIMNAR TAREAS de la LISTA
function borrar(id) {
  const index = arrayTareas.findIndex((ele) => ele.id == id); //Se localiza el índice a ser elimnado recibido en la variable id
  arrayTareas.splice(index, 1);
  renderTareas();
}

// MOSTRAR el ESTADO DE LAS TAREAS
function renderTareas() {
  let html = "";
  let completadas = arrayTareas.filter((completa) => completa.estado !== false); // Filtrado de tareas completadas
  for (const t of arrayTareas) {
    //recorrido del arreglo de tareas para validar si la tarea stá completada o no y de acuerdo a eso marcarla visualmente;
    if (t.estado == false)
      html += `<li id="${t.id}">${t.id} - ${t.tarea}<span class="close" onclick=borrar(${t.id})><i class="fa-solid fa-trash-can"></i></span></li>`;
    else
      html += `<li id="${t.id}" class="checked" >${t.id} - ${t.tarea}<span class="close" onclick=borrar(${t.id})><i class="fa-solid fa-trash-can"></i></span></li>`; // cuando el estado de la tarea es completado se asigana  la clase "checked" para mostrarla visualmenete marcada en el HTML
  }
 
  listatareas.innerHTML = html;
  total.innerHTML = `Total tareas: ${arrayTareas.length} Realizadas: ${completadas.length}`; //Mostrar el contador de traeas  Completadas y totales
}

// Se agrega el símbolo "checked" cuando se clickea sobre un el elemento de la lista de tareas
var list = document.querySelector("ul");
list.addEventListener(
  "click",
  function (ev) {
    if (ev.target.tagName === "LI") {
      ev.target.classList.toggle("checked"); //Marcar checked a través de un cambio de clase

      for (let i = 0; i < arrayTareas.length; i++) {
        //REcorrido del arreglo de tareas
        if (arrayTareas[i].id === parseInt(ev.target.id)) {
          //se compara el indice del arreglo con el clickeado
          arrayTareas[i].estado = !arrayTareas[i].estado; //Una vez localizado se cambia el estado según se clickee sobre el elemento
        }
      }
    }
    renderTareas();
  },
  false
);
