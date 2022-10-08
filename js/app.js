import hamburgerMenu from "./hamburger.js";

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
let panel = document.querySelector(".panel");
let hamburger = document.querySelector(".hamburger");
let inSession = false;
let sessionKey;

button.addEventListener("click", addTask);
signUpButton.addEventListener("click", signUp);
signInButton.addEventListener("click", signIn);

document.addEventListener("DOMContentLoaded", (e) => {
  hamburgerMenu(".panel-btn", ".panel", "#signInButton");
});
class userInfo {
  constructor(userName, userPass, userTasks) {
    this.userName = userName;
    this.userPass = userPass;
    this.userTasks = userTasks;
  }
}

function signUp() {
  if (signUpUser.value == "" || signUpPass.value == "") {
    Swal.fire({
      icon: "error",
      title: "Hey!",
      text: "Necesitas completar todos los campos para poder registrarte",
      confirmButtonColor: "var(--secondaryColor)",
      timer: 3000,
      timerProgressBar: true,
    });
  } else {
    let userExists = false;

    for (let i = 0; i < localStorage.length; i++)
      signUpUser.value == localStorage.key(i) && (userExists = true); //AND
    if (userExists) {
      Swal.fire({
        icon: "error",
        title: "Lo sentimos:(",
        text: "Este nombre de usuario ya se encuentra registrado",
        confirmButtonColor: "var(--secondaryColor)",
        timer: 3000,
        timerProgressBar: true,
      });
    } else {
      let usuario = new userInfo(signUpUser.value, signUpPass.value, []);
      localStorage.setItem(signUpUser.value, JSON.stringify(usuario));
      Swal.fire({
        icon: "success",
        title: "Cuenta registrada!",
        text: "Ahora inicia sesion y empieza a anotar <3",
        confirmButtonColor: "var(--secondaryColor)",
        timer: 3000,
        timerProgressBar: true,
      });
    }
  }
}

function signIn() {
  if (signInUser.value == "" || signInPass.value == "") {
    Swal.fire({
      icon: "error",
      title: "Hey!",
      text: "Necesitas completar todos los campos para poder iniciar sesion",
      confirmButtonColor: "var(--secondaryColor)",
      timer: 3000,
      timerProgressBar: true,
    });
  } else {
    let userExists = false;
    for (let i = 0; i < localStorage.length; i++)
      if (signInUser.value == localStorage.key(i)) {
        userExists = true;
        sessionKey = i;
      }

    if (!userExists) {
      Swal.fire({
        icon: "error",
        title: "Lo sentimos:(",
        text: "Parece que este usuario no existe",
        confirmButtonColor: "var(--secondaryColor)",
        timer: 3000,
        timerProgressBar: true,
      });
    } else {
      let user = JSON.parse(localStorage.getItem(signInUser.value));
      if (signInPass.value == user.userPass) {
        inSession = true;
        panel.className += " hidden";
        hamburger.className += " hidden";
        LoadToDoList();
        Swal.fire({
          icon: "success",
          title: `¡Bienvenido, ${signInUser.value}!`,
          text: "Puedes empezar a anotar tus tareas!",
          confirmButtonColor: "var(--secondaryColor)",
          timer: 3000,
          timerProgressBar: true,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Hey!",
          text: "Constraseña incorrecta",
          confirmButtonColor: "var(--secondaryColor)",
          timer: 3000,
          timerProgressBar: true,
        });
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
      <div><input type="checkbox" id="${i + 1}"><b>${
      userInfo.userTasks[i][0]
    }</b></div>
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
                  <div><input type="checkbox" id="${
                    userInfo.userTasks.length + 1
                  }"><b>${taskName.value}</b></div>
                  <div>Fecha limite: Sin fecha limite :D</div>
                  `;
        container.appendChild(div);
        userInfo.userTasks.push([taskName.value, null]);
        localStorage.setItem(userInfo.userName, JSON.stringify(userInfo));
        Toastify({
          text: "Tarea agregada",
          duration: 3000,
          style: { background: "var(--toastColor)" },
        }).showToast();
      } else {
        let currentDate = new Date();
        if (taskDate.valueAsDate < currentDate) {
          Toastify({
            text: "Debes asignar una fecha valida, crack!",
            duration: 3000,
            style: { background: "var(--toastError)" },
          }).showToast();
        } else {
          let userInfo = JSON.parse(
            localStorage.getItem(localStorage.key(sessionKey))
          );
          let div = document.createElement("div");
          div.className = "taskDiv";
          div.innerHTML = `
                      <div><input type="checkbox" id="${
                        userInfo.userTasks.length + 1
                      }"><b>${taskName.value}</b></div>
                      <div>Fecha limite: ${taskDate.value}</div>
                      `;
          container.appendChild(div);
          userInfo.userTasks.push([taskName.value, taskDate.value]);
          localStorage.setItem(userInfo.userName, JSON.stringify(userInfo));
          Toastify({
            text: "Tarea agregada",
            duration: 3000,
            style: { background: "var(--toastColor)" },
          }).showToast();
        }
      }
    } else {
      Toastify({
        text: "Debes asignar un nombre a la tarea, crack!",
        duration: 3000,
        style: { background: "var(--toastError)" },
      }).showToast();
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
        Toastify({
          text: "Tarea agregada",
          duration: 3000,
          style: { background: "var(--toastColor)" },
        }).showToast();
      } else {
        let currentDate = new Date();
        if (taskDate.valueAsDate < currentDate) {
          Toastify({
            text: "Debes asignar una fecha valida, crack!",
            duration: 3000,
            style: { background: "var(--toastError)" },
          }).showToast();
        } else {
          let div = document.createElement("div");
          div.className = "taskDiv";
          div.innerHTML = `
                      <div><b>${taskName.value}</b></div>
                      <div>Fecha limite: ${taskDate.value}</div>
                      `;
          container.appendChild(div);
          Toastify({
            text: "Tarea agregada",
            duration: 3000,
            style: { background: "var(--toastColor)" },
          }).showToast();
        }
      }
    } else {
      Toastify({
        text: "Debes asignar un nombre a la tarea, crack!",
        duration: 3000,
        style: { background: "var(--toastError)" },
      }).showToast();
    }
  }
}
