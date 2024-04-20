const barIcon = document.getElementById("bars-icon");
const links = document.querySelector(".links");
const date = document.querySelector(".date");
const time = document.querySelector(".time");

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
  time.innerHTML = `${now.getHours()}:${minutes}:${secound}`;

  date.innerHTML = `${now.getDate()} ${
    months[now.getMonth()]
  } ${now.getFullYear()}r.`;
}

setInterval(() => {
  showTimeData();
}, 1000);

window.addEventListener("resize", function () {
  if (window.innerWidth > 600) {
    document.querySelector(".links").style.display = "block";
  } else {
    document.querySelector(".links").style.display = "none";
  }
});

barIcon.addEventListener("click", showMenu);
// ----------

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

let num = 1;

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

clear.addEventListener("click", () => {
  history.textContent = "";
  num = 1;
});
