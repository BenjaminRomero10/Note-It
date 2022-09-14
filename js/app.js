// /*El simulador que tengo pensado hacer es una aplicacion de notas. En esta aplicacion, el usuario podrá anotar deberes, tareas u cosas importantes para recordar. En un futuro, me gustaria agregar la posibilidad de que el usuario ingrese una fecha limite para la conclusión de dicha tarea (ya lo hice xd) */

let container = document.querySelector(".to-do-list");
let button = document.querySelector("#notebutton");
let taskName = document.querySelector("#task");
let taskDate = document.querySelector("#date");
let signInButton = document.querySelector("#signInButton");
let signUpButton = document.querySelector("#signUpButton");
let signUpUser = document.querySelector("#signUpUser");
let signUpPass = document.querySelector("#signUpPass");
let signInUser = document.querySelector("#signInUser");
let signInPass = document.querySelector("#signInPass");
let inSession = false;
let sessionKey;

button.addEventListener("click", addTask);
signUpButton.addEventListener("click", signUp);
signInButton.addEventListener("click", signIn);

class userInfo {
  constructor(userName, userPass, userTasks) {
    this.userName = userName;
    this.userPass = userPass;
    this.userTasks = userTasks;
  }
}

function signUp() {
  if (signUpUser.value == "" || signUpPass.value == "") {
    alert("Necesitas completar todos los campos para poder registrarse");
  } else {
    let userExists = false;

    for (let i = 0; i < localStorage.length; i++)
      signUpUser.value == localStorage.key(i) && (userExists = true); //AND
    if (userExists) {
      alert("Este nombre de usuario ya se encuentra registrado:(");
    } else {
      let usuario = new userInfo(signUpUser.value, signUpPass.value, []);
      localStorage.setItem(signUpUser.value, JSON.stringify(usuario));
      alert("Cuenta registrada! Ahora inicia sesion y empieza a anotar <3");
    }
  }
}

function signIn() {
  if (signInUser.value == "" || signInPass.value == "") {
    alert("Necesitas completar todos los campos para poder iniciar sesion");
  } else {
    let userExists = false;
    for (let i = 0; i < localStorage.length; i++)
      if (signInUser.value == localStorage.key(i)) {
        userExists = true;
        sessionKey = i;
      }

    if (!userExists) {
      alert("Parece que este usuario no existe:(");
    } else {
      let user = JSON.parse(localStorage.getItem(signInUser.value));
      if (signInPass.value == user.userPass) {
        inSession = true;
        LoadToDoList();
        alert(`¡Bienvenido, ${signInUser.value}!`);
      } else {
        alert("Contraseña incorrecta!");
      }
    }
  }
}

function LoadToDoList() {
  let userInfo = JSON.parse(localStorage.getItem(localStorage.key(sessionKey)));
  container.innerHTML = "<h2>To-Do List</h2>";
  for (let i = 0; i < userInfo.userTasks.length; i++) {
    let div = document.createElement("div");
    div.className = "taskDiv";
    div.innerHTML = `
      <div><b>${userInfo.userTasks[i][0]}</b></div>
      <div>Fecha limite: ${
        userInfo.userTasks[i][1] != null
          ? userInfo.userTasks[i][1]
          : "Sin fecha limite :D"
      }</div>
      `;
    container.appendChild(div);
  }
}

function addTask() {
  if (inSession) {
    if (taskName.value != "") {
      if (taskDate.valueAsDate == null) {
        let userInfo = JSON.parse(
          localStorage.getItem(localStorage.key(sessionKey))
        );
        let div = document.createElement("div");
        div.className = "taskDiv";
        div.innerHTML = `
                  <div><b>${taskName.value}</b></div>
                  <div>Fecha limite: Sin fecha limite :D</div>
                  `;
        container.appendChild(div);
        userInfo.userTasks.push([taskName.value, null]);
        localStorage.setItem(userInfo.userName, JSON.stringify(userInfo));
      } else {
        let currentDate = new Date();
        if (taskDate.valueAsDate < currentDate) {
          alert("No puedes asignar una tarea para una fecha pasada, crack!");
        } else {
          let userInfo = JSON.parse(
            localStorage.getItem(localStorage.key(sessionKey))
          );
          let div = document.createElement("div");
          div.className = "taskDiv";
          div.innerHTML = `
                      <div><b>${taskName.value}</b></div>
                      <div>Fecha limite: ${taskDate.value}</div>
                      `;
          container.appendChild(div);
          userInfo.userTasks.push([taskName.value, taskDate.value]);
          localStorage.setItem(userInfo.userName, JSON.stringify(userInfo));
        }
      }
    } else {
      alert("Le debes asignar un nombre a tu tarea antes de asignarla, genio!");
    }
  } else {
    if (taskName.value != "") {
      if (taskDate.valueAsDate == null) {
        let div = document.createElement("div");
        div.className = "taskDiv";
        div.innerHTML = `
                  <div><b>${taskName.value}</b></div>
                  <div>Fecha limite: Sin fecha limite :D</div>
                  `;
        container.appendChild(div);
      } else {
        let currentDate = new Date();
        if (taskDate.valueAsDate < currentDate) {
          alert("No puedes asignar una tarea para una fecha pasada, crack!");
        } else {
          let div = document.createElement("div");
          div.className = "taskDiv";
          div.innerHTML = `
                      <div><b>${taskName.value}</b></div>
                      <div>Fecha limite: ${taskDate.value}</div>
                      `;
          container.appendChild(div);
        }
      }
    } else {
      alert("Le debes asignar un nombre a tu tarea antes de asignarla, genio!");
    }
  }
}
