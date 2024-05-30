const barIcon = document.getElementById("bars-icon");
const links = document.querySelector(".links");
const date = document.querySelector(".date");
const time = document.querySelector(".time");

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

const newLogin = document.getElementById("new-login");
const newPassword = document.getElementById("new-password");
const ChangeSetBtn = document.querySelector(".changeBtn");
const changeMessage = document.querySelector(".change-message");

const adminCred = JSON.parse(localStorage.getItem("adminCred")) || {
  login: "admin",
  password: "admin",
};
const userCred = JSON.parse(localStorage.getItem("userCred")) || {
  login: "user",
  password: "user",
};

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

//--------------------------------------------------------------
// Functions
//--------------------------------------------------------------

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

function checkLoginStatus() {
  let userType = localStorage.getItem("userType");
  if (userType) {
    loginForm.style.display = "none";
    logoutSection.style.display = "block";
    welcomeLi.style.display = "block";
    if (welcomeSpan) {
      welcomeSpan.textContent = `${userType
        .charAt(0)
        .toUpperCase()}${userType.slice(1)}!`;
    }
    if (userType === "admin" && themeDiv) {
      themeDiv.style.display = "block";
    } else if (themeDiv) {
      themeDiv.style.display = "none";
    }
  } else {
    loginForm.style.display = "block";
    logoutSection.style.display = "none";
  }
}

function clearInput() {
  document.getElementById("login").value = "";
  document.getElementById("password").value = "";
}

function changeSettings(e) {
  e.preventDefault();
  let newLoginValue = newLogin.value;
  let newPasswordValue = newPassword.value;

  if (newLoginValue === "" || newPasswordValue === "") {
    changeMessage.textContent = "Please fill all fields";
    changeMessage.style.color = "red";
  } else if (
    (newLoginValue === adminCred.login &&
      newPasswordValue === adminCred.password) ||
    (newLoginValue === userCred.login && newPasswordValue === userCred.password)
  ) {
    changeMessage.textContent = "You can't use the same data";
    changeMessage.style.color = "red";
  } else {
    if (localStorage.getItem("userType") === "admin") {
      adminCred.login = newLoginValue;
      adminCred.password = newPasswordValue;
      localStorage.setItem("adminCred", JSON.stringify(adminCred));
    } else {
      userCred.login = newLoginValue;
      userCred.password = newPasswordValue;
      localStorage.setItem("userCred", JSON.stringify(userCred));
    }
    changeMessage.textContent = "Data changed successfully!";
    changeMessage.style.color = "green";
  }
}

//--------------------------------------------------------------
// Event Listeners
//--------------------------------------------------------------

window.addEventListener("resize", function () {
  if (window.innerWidth > 600) {
    document.querySelector(".links").style.display = "block";
  } else {
    document.querySelector(".links").style.display = "none";
  }
});

barIcon.addEventListener("click", showMenu);

LoginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let login = document.getElementById("login").value;
  let password = document.getElementById("password").value;

  if (login === adminCred.login && password === adminCred.password) {
    localStorage.setItem("userType", adminCred.role);
    checkLoginStatus();
    errorMsg.textContent = "";
    window.location.href = "welcome.html";
  } else if (login === userCred.login && password === userCred.password) {
    localStorage.setItem("userType", userCred.role);
    checkLoginStatus();
    errorMsg.textContent = "";
    window.location.href = "welcome.html";
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
    document.body.className = selectedTheme;
  });
}

document.body.className = localStorage.getItem("theme") || "standard";

checkLoginStatus();

function saveLastVisitedPage(url) {
  let path = new URL(url).pathname;
  let page = path.split("/").pop().split(".")[0];
  document.cookie = "last_page=" + page + "; path=/";
  console.log(document.cookie);
}

window.addEventListener("beforeunload", (event) => {
  saveLastVisitedPage(window.location.href);
});

if (ChangeSetBtn) {
  ChangeSetBtn.addEventListener("click", (e) => {
    changeSettings(e);
  });
}

// acces change

const acc1 = document.getElementById("acc1");
const acc2 = document.getElementById("acc2");
const ChangeAccessBtn = document.querySelector(".ChangeAccessBtn");
if (acc1 && acc2) {
  acc1.textContent = adminCred.login;
  acc2.textContent = userCred.login;
}

let users = [
  { id: "acc1", role: "admin", credentials: adminCred },
  { id: "acc2", role: "user", credentials: userCred },
];
function changeUserRole(id, newRole) {
  users = users.map((user) => {
    if (user.id === id) {
      return { ...user, role: newRole };
    } else {
      return user;
    }
  });

  if (id === "acc1") {
    localStorage.setItem(
      "adminCred",
      JSON.stringify({ ...adminCred, role: newRole })
    );

    if (localStorage.getItem("loggedInUser") === "acc1") {
      localStorage.setItem("userType", newRole);
      checkLoginStatus();
    }
  } else if (id === "acc2") {
    localStorage.setItem(
      "userCred",
      JSON.stringify({ ...userCred, role: newRole })
    );
    if (localStorage.getItem("loggedInUser") === "acc2") {
      localStorage.setItem("userType", newRole);
    }
  }
  localStorage.removeItem("userType");
  window.location.href = "index.html";
  checkLoginStatus();
}

if (ChangeAccessBtn) {
  ChangeAccessBtn.addEventListener("click", function () {
    let acc1UserButton = document.getElementById("acc1User");
    let acc2UserButton = document.getElementById("acc2User");
    if (acc1UserButton.checked && acc2UserButton.checked) {
      alert("There must be at least one admin.");
      return;
    } else {
      users.forEach((user) => {
        let adminButton = document.querySelector(
          `input[name="${user.id}"][value="admin"]`
        );
        let userButton = document.querySelector(
          `input[name="${user.id}"][value="user"]`
        );
        if (adminButton.checked) {
          changeUserRole(user.id, "admin");
        } else if (userButton.checked) {
          changeUserRole(user.id, "user");
        }
      });
    }
  });
}

console.log(users);
