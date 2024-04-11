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
const divC = document.getElementById("divC");
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
  let x = parseFloat(addA.value) + parseFloat(addB.value);
  let y = `${parseFloat(addA.value)} + ${parseFloat(addB.value)} = ${x}`;

  showHistory(x, y);
  clearInputs();
};

const divide = () => {
  let x = parseFloat(divA.value) / parseFloat(divB.value);
  let y = `${parseFloat(divA.value)} / ${parseFloat(divB.value)} = ${x}`;
  showHistory(x, y);
  clearInputs();
};

const delta = () => {
  let x = 


}

const clearInputs = () => {
  addA.value = "";
  addB.value = "";
  divA.value = "";
  divB.value = "";
};

calculate.addEventListener("click", () => {
  if (document.getElementById("add").checked) {
    add();
  } else if (document.getElementById("div").checked) {
    divide();
  } else if (document.getElementById("que").checked) {
  } else {
    alert("Wybierz operacje!!");
  }
});

clear.addEventListener("click", () => {
  history.textContent = "";
  num = 1;
});

const showHistory = (x, y) => {
  const id = document.createElement("li");
  const operations = document.createElement("li");
  const wynik = document.createElement("li");
  id.innerHTML = `${num}.`;
  operations.innerHTML = y;
  wynik.innerHTML = x;
  history.appendChild(id);
  history.appendChild(operations);

  history.appendChild(wynik);

  num++;
};
