const barIcon = document.getElementById("bars-icon");
const links = document.querySelector(".links");
const date = document.querySelector(".date");
const time = document.querySelector(".time");

const AddInput = document.querySelector(".AdditionInput");
const DivInput = document.querySelector(".DivisionInput");
const QuaInput = document.querySelector(".QuadraticInput");

const addA = document.getElementById("addA");
const addB = document.getElementById("addB");
const divA = document.getElementById("divA");
const divB = document.getElementById("divB");
const quaA = document.getElementById("quaA");
const quaB = document.getElementById("quaB");
const quaC = document.getElementById("quaC");
const history = document.querySelector(".history");

const calculate = document.querySelector(".oblicz");
const clear = document.querySelector(".clear");

const loginForm = document.querySelector(".login-form");
const logoutSection = document.querySelector(".logout-section");
const logoutBtn = document.querySelector(".logoutBtn");
const LoginBtn = document.querySelector(".LoginBtn");
const errorMsg = document.querySelector(".message");

const welcomeLi = document.querySelector(".welcomeLi");
const welcomeSpan = document.querySelector(".welcome-span");

const themeDiv = document.querySelector(".theme-switcher");
const themeStandard = document.getElementById("theme-standard");
const themeBlack = document.getElementById("theme-black");
const applyThemeButton = document.getElementById("apply-theme");

const adminCred = { login: "admin", password: "admin" };
const userCred = { login: "user", password: "user" };

let num = 1;

const months = [
  "Styczeń",
  "Luty",
  "Marzec",
  "Kwiecień",
  "Maj",
  "Czerwiec",
  "Lipiec",
  "Sierpień",
  "Wrzesień",
  "Październik",
  "Listopad",
  "Grudzień",
];

const showMenu = () => {
  if (links.style.display === "none") {
    links.style.display = "block";
  } else {
    links.style.display = "none";
  }
};

function showTimeData() {
  let now = new Date();
  let secound = now.getSeconds();
  let minutes = now.getMinutes();
  let hours = now.getHours();
  if (secound < 10) {
    secound = `0${now.getSeconds()}`;
  } else {
    secound = now.getSeconds();
  }

  if (minutes < 10) {
    minutes = `0${now.getMinutes()}`;
  } else {
    minutes = now.getMinutes();
  }

  if (hours < 10) {
    hours = `0${now.getHours()}`;
  } else {
    hours = now.getHours();
  }

  time.innerHTML = `${hours}:${minutes}:${secound}`;

  date.innerHTML = `${now.getDate()} ${
    months[now.getMonth()]
  } ${now.getFullYear()}r.`;
}

setInterval(() => {
  showTimeData();
}, 1000);


// ---------------------------------------------------

function showInput() {
  if (document.getElementById("add").checked) {
    AddInput.style.display = "block";
    DivInput.style.display = "none";
    QuaInput.style.display = "none";
  } else if (document.getElementById("div").checked) {
    AddInput.style.display = "none";
    DivInput.style.display = "block";
    QuaInput.style.display = "none";
  } else if (document.getElementById("que").checked) {
    AddInput.style.display = "none";
    DivInput.style.display = "none";
    QuaInput.style.display = "block";
  }
}
const add = () => {
  let a = parseFloat(addA.value);
  let b = parseFloat(addB.value);
  let x = a + b;
  let operation = `${a} + ${b} = ${x}`;
  if (isNaN(a) || isNaN(b)) {
    showHistory("+ = x", "ERROR(empty input)");
  } else {
    showHistory(operation, x.toFixed(2));
  }
  clearInputs();
};

const divide = () => {
  let a = parseFloat(divA.value);
  let b = parseFloat(divB.value);
  let x = a / b;
  let operation = `${a} / ${b} = ${x}`;
  if (isNaN(a) || isNaN(b)) {
    showHistory("/ = x", "ERROR(empty input)");
  } else if (b == 0) {
    showHistory(`${a} / ${b} = x`, `ERROR(b=${b})`);
  } else {
    showHistory(operation, x.toFixed(2));
  }
  clearInputs();
};

const quadratic = () => {
  let a = parseFloat(quaA.value);
  let b = parseFloat(quaB.value);
  let c = parseFloat(quaC.value);
  let delta = b * b - 4 * a * c;
  if (isNaN(a) || isNaN(b) || isNaN(c)) {
    showHistory(`x^2 + x + = x`, `ERROR(empty input)`);
  } else if (delta < 0) {
    showHistory(`${a} x^2 + ${b} x + ${c} = x`, `ERROR(Δ<0)`);
  } else if (delta === 0) {
    let x = -b / (2 * a);
    showHistory(`${a} x^2 + ${b} x + ${c} = x`, `x = ${x.toFixed(2)}`);
  } else {
    let x1 = (-b - Math.sqrt(delta)) / (2 * a);
    let x2 = (-b + Math.sqrt(delta)) / (2 * a);
    showHistory(
      `${a} x^2 + ${b} x + ${c} = x`,
      `<div><p id="pl">x1 = ${x1.toFixed(2)}</p> <p id="pr">  x2 = ${x2.toFixed(
        2
      )} </p></div>`
    );
  }

  clearInputs();
};

const clearInputs = () => {
  addA.value = "";
  addB.value = "";
  divA.value = "";
  divB.value = "";
  quaA.value = "";
  quaB.value = "";
  quaC.value = "";
};

const showHistory = (oper, x) => {
  const id = document.createElement("li");
  const operations = document.createElement("li");
  const wynik = document.createElement("li");
  id.innerHTML = `${num}.`;
  wynik.innerHTML = x;
  operations.innerHTML = oper;

  history.appendChild(id);
  history.appendChild(operations);
  history.appendChild(wynik);
  num++;
};

function checkLoginStatus() {
  let userType = localStorage.getItem("userType");
  if (userType) {
    loginForm.style.display = "none";
    logoutSection.style.display = "block";
    welcomeLi.style.display = "block";
    welcomeSpan.textContent = `${userType
      .charAt(0)
      .toUpperCase()}${userType.slice(1)}!`;
    if (userType === "admin") {
      themeDiv.style.display = "block";
    } else {
      themeDiv.style.display = "none";
    }
  } else {
    loginForm.style.display = "block";
    logoutSection.style.display = "none";
    themeDiv.style.display = "none";
  }
}

function clearInput() {
  document.getElementById("login").value = "";
  document.getElementById("password").value = "";
}

//--------------------------------------------------------------


window.addEventListener("resize", function () {
  if (window.innerWidth > 600) {
    document.querySelector(".links").style.display = "block";
  } else {
    document.querySelector(".links").style.display = "none";
  }
});

barIcon.addEventListener("click", showMenu);

if (calculate) {
  calculate.addEventListener("click", () => {
    if (document.getElementById("add").checked) {
      add();
    } else if (document.getElementById("div").checked) {
      divide();
    } else if (document.getElementById("que").checked) {
      quadratic();
    } else {
      showHistory("---", "ERROR");
    }
  });
}

if (clear) {
  clear.addEventListener("click", () => {
    history.textContent = "";
    num = 1;
  });
}

LoginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let login = document.getElementById("login").value;
  let password = document.getElementById("password").value;

  if (login === adminCred.login && password === adminCred.password) {
    localStorage.setItem("userType", "admin");
    checkLoginStatus();
    errorMsg.textContent = "";
    window.location.href = "welcome.html";

    console.log("ADMIN");
  } else if (login === userCred.login && password === userCred.password) {
    localStorage.setItem("userType", "user");
    checkLoginStatus();
    errorMsg.textContent = "";
    window.location.href = "welcome.html";

    console.log("USER");
  } else {
    errorMsg.textContent = "Login FAILED";
    errorMsg.style.color = "red";
    errorMsg.style.fontWeight = "bold";
  }
  clearInput();
});

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("userType");
  window.location.href = "index.html";

  checkLoginStatus();
});

if (applyThemeButton) {
  applyThemeButton.addEventListener("click", () => {
    let selectedTheme = themeStandard.checked ? "standard" : "black";
    localStorage.setItem("theme", selectedTheme);
    document.body.className = selectedTheme; // assuming the theme names are the same as the class names
  });
}

document.body.className = localStorage.getItem("theme") || "standard";

checkLoginStatus();
