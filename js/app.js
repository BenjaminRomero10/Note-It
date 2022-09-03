// /*El simulador que tengo pensado hacer es una aplicacion de notas. En esta aplicacion, el usuario podrá anotar deberes, tareas u cosas importantes para recordar. En un futuro, me gustaria agregar la posibilidad de que el usuario ingrese una fecha limite para la conclusión de dicha tarea (ya lo hice xd) */

// // CLASES

// class Task{
//     constructor(name, date){
//         this.name = name;
//         this.date = date;
//     }
// }

// //FUNCIONES

// function askContinue (){
//     let question = prompt("¿Desea agregar una nueva tarea?\nPor favor, escriba 1 (si) o 2(no)") /*Falta validaciones*/
//     if(question == 1) return true
//     else return false
// }

// function requestTask(array){

//     let task;
//     const taskName = prompt("Por favor, escriba una tarea:");

//     if(prompt("Desea agregar una fecha limite? 1(si) - 2(no)") == 1){
//         taskDayLimit = parseInt(prompt("Ingrese el digito del dia limite:"))
//         taskMonthLimit = parseInt(prompt("Ingrese el digito del mes limite:"))
//         taskYearLimit = parseInt(prompt("Ingrese el digito del año limite:"))

//         task = new Task(
//             taskName, 
//             new Date(taskYearLimit, taskMonthLimit-1, taskDayLimit) 
//         )

//     }
//     else {task = new Task(taskName, null)}

//     array.push(task)
// }

// //DECLARACIÓN DE VARIABLES

// let cont = true
// let list = []

// //INICIO DEL PROGRAMA

// alert("Bievenido a Note-it!")

// while(cont){
//     requestTask(list)

//     if(askContinue()) continue
//     else cont = false
// }

// let seeList = prompt("¿Desea visualizar su listado de tareas?\nPor favor, escriba 1(si) o 2(no)"); /*Falta validaciones*/

// if(seeList == 1)
// {
//     let main = document.querySelector("main");
//     let contenedor = document.createElement("div");
//     contenedor.innerHTML = "<h2>To-Do List<h2/>";

//     list.forEach((element)=>{

//         if(element.date != null){
//             contenedor.innerHTML += `<p>${element.name}\t->\t${element.date.toDateString()}</p>`;
//         }
//         else{
//             contenedor.innerHTML += `<p>${element.name}\t->\tSin fecha limite</p>`;
//         }
        
//     });

//     main.appendChild(contenedor);

//     alert("Gracias por elegirnos!");
// }
// else{
//     alert("Gracias por elegirnos!");
// }

let container = document.querySelector(".to-do-list");
let button = document.querySelector("#notebutton");
let taskName = document.querySelector("#task");
let taskDate = document.querySelector("#date");

button.addEventListener('click', addTask);

function addTask(){
    if (taskName.value != "") {
        if (taskDate.valueAsDate == null) {
            let p = document.createElement("p");
            p.innerText = `${taskName.value} -> Fecha de limite: Sin fecha de limite`;
            container.appendChild(p);

        } else {
            let currentDate = new Date();
            if (taskDate.valueAsDate < currentDate) {
                alert("No puedes asignar una tarea para una fecha pasada, crack!")
            } else {
                let p = document.createElement("p");
                p.innerText = `${taskName.value} -> Fecha de limite: ${taskDate.value}`;
                container.appendChild(p);
            }
        }

    } else {
        alert("Le debes asignar un nombre a tu tarea antes de asignarla, genio!")
    }
}

