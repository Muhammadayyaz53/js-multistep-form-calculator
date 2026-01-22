let form1 = document.getElementById("form1");
let form2 = document.getElementById("form2");
let form3 = document.getElementById("form3");
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let email = document.getElementById("email");
let password = document.getElementById("password");
let companyName = document.getElementById("CompanyName");
let designation = document.getElementById("designation");
let fnameerror = document.getElementById("fnameerror");
let lnameerror = document.getElementById("lnameerror");
let emailerror = document.getElementById("emailerror");
let passworderror = document.getElementById("passworderror");
let companyerror = document.getElementById("companyerror");
let designationerror = document.getElementById("designationerror");
let next1 = document.getElementById("Next1");
let next2 = document.getElementById("Next2");
let back1 = document.getElementById("back1");
let back2 = document.getElementById("back2");
let submit = document.getElementById("submit");
let eyeSlash = document.querySelector(".span1");
let eye = document.querySelector(".span2");
let storeData = document.querySelector(".StoreData");
let nameRegex = /^[a-zA-Z\s]+$/;
let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-+=]).{8,}$/;
function showForm(form) {
  form1.style.display = "none";
  form2.style.display = "none";
  form3.style.display = "none";
  form.style.display = "block";
}
function validateText(input, error) {
  if (input.value.trim() === "") {
    error.innerText = "This field is required";
    return false;
  } else if (!nameRegex.test(input.value)) {
    error.innerText = "Only letters allowed";
    return false;
  } else if (input.value.length < 4) {
    error.innerText = "Minimum 4 characters";
    return false;
  } else {
    error.innerText = "";
    return true;
  }
}
showForm(form1);
next1.addEventListener("click", function () {
  let firstValid = validateText(firstName, fnameerror);
  let lastValid = validateText(lastName, lnameerror);
  if (firstValid && lastValid) {
    showForm(form2);
  }
});
next2.addEventListener("click", function () {
  let emailValid = false;
  let passwordValid = false;
  if (email.value.trim() === "") {
    emailerror.innerText = "Email is required";
  } else if (!emailRegex.test(email.value)) {
    emailerror.innerText = "Invalid email";
  } else {
    emailerror.innerText = "";
    emailValid = true;
  }
  if (password.value.trim() === "") {
    passworderror.innerText = "Password is required";
  } else if (!passwordRegex.test(password.value)) {
    passworderror.innerText = `Password must contain 
    1 uppercase
     1 lowercase
      1 number
      1 special character
      min 8 characters`;
  } else {
    passworderror.innerText = "";
    passwordValid = true;
  }
  if (emailValid && passwordValid) {
    showForm(form3);
  }
});
back1.addEventListener("click", () => showForm(form1));
back2.addEventListener("click", () => showForm(form2));
submit.addEventListener("click", function (e) {
  e.preventDefault();
  let companyValid = validateText(companyName, companyerror);
  let desigValid = validateText(designation, designationerror);
  if (companyValid && desigValid) {
    let li = document.createElement("li");
    li.innerHTML = `
      First Name: ${firstName.value}<br>
     Last Name: ${lastName.value}<br>
     Email: ${email.value}<br>
     Password: ${password.value}<br>
     Company: ${companyName.value}<br>
     Designation: ${designation.value} `;
    storeData.appendChild(li);
    firstName.value = "";
    lastName.value = "";
    email.value = "";
    password.value = "";
    companyName.value = "";
    designation.value = "";
    showForm(form1);
  }
});
eyeSlash.addEventListener("click", function () {
  password.type = "text";
  eyeSlash.style.display = "none";
  eye.style.display = "inline";
});
eye.addEventListener("click", function () {
  password.type = "password";
  eye.style.display = "none";
  eyeSlash.style.display = "inline";
});

//  Control Button for form and Calculator

let formSection = document.getElementById("formSection");
let calculatorSection = document.getElementById("calculatorSection");
let formbtn = document.getElementById("formbtn");
let Calculatorbtn = document.getElementById("Calculatorbtn");

formSection.style.display = "block";
calculatorSection.style.display = "none";
Calculatorbtn.addEventListener("click", () => {
  calculatorSection.style.display = "flex";
  calculatorSection.style.display = "justify-content:center";
  calculatorSection.style.display = "align-item :center";
  formSection.style.display = "none";
});
formbtn.addEventListener("click", () => {
  formSection.style.display = "block";
  calculatorSection.style.display = "none";
});

// ------------------ Calculator Section

let showInput = document.getElementById("showInput");
let btn = document.querySelectorAll(".btn");
let operators = document.querySelectorAll(".operator");
let equalbtn = document.querySelector(".equalbtn");
let meanBtn = document.getElementById("btn-3");
let percentBtn = document.getElementById("btn-4");
let outputScreen = document.getElementById("outputScreen");
let showOutput = document.getElementById("showOutput");
let output = document.getElementById("output");
let displayClear = document.getElementById("displayClear");

let resultShown = false;
btn.forEach(function (button) {
  button.addEventListener("click", () => {
    if (resultShown) {
      showInput.value = "";
      resultShown = false;
    }
    showInput.value = showInput.value.concat(button.innerText);
  });
});

operators.forEach(function (oper) {
  oper.addEventListener("click", function () {
    let op = oper.innerText;
    let val = showInput.value;
    let last = val.slice(-1);
    if (op === "C") {
      showInput.value = "";
    } else if (op === "AC") {
      showInput.value = val.slice(0, -1);
    } else if (op === "(" || op === ")" || op === ".") {
      showInput.value += op;
    } else if ("+-*/".includes(op)) {
      if (val === "" && op === "-") {
        showInput.value = "-";
        return;
      }
      if ("+*/".includes(last) && op !== "-") return;
      showInput.value += op;
    }
  });
});

function normalizeOperators(str) {
  let res = "";
  let count = 0;
  for (let currcha of str) {
    if (currcha === "-") {
      count++;
    } else {
      if (count > 0) {
        res += count % 2 === 0 ? "+" : "-";
        count = 0;
      }
      res += currcha;
    }
  }
  if (count > 0) res += count % 2 === 0 ? "+" : "-";
  return res;
}

function solve(str) {
  let list = [];
  let num = "";

  for (let i = 0; i < str.length; i++) {
    let currcha = str[i];

    if (currcha === "-" && (i === 0 || "+-*/(".includes(str[i - 1]))) {
      num += currcha;
      continue;
    }
    if ("0123456789.".includes(currcha)) {
      num += currcha;
    } else if ("+-*/".includes(currcha)) {
      if (num !== "") list.push(Number(num));
      list.push(currcha);
      num = "";
    }
  }
  if (num !== "") list.push(Number(num));
  if (list.length < 1) return 0;
  for (let i = 0; i < list.length; i++) {
    if (list[i] === "*" || list[i] === "/") {
      let left = list[i - 1];
      let right = list[i + 1];
      if (left === undefined || right === undefined) return "Error";
      let res = list[i] === "*" ? left * right : left / right;
      list.splice(i - 1, 3, res);
      i--;
    }
  }

  let total = list[0];
  for (let i = 1; i < list.length; i += 2) {
    let operator = list[i];
    let nextNum = list[i + 1];
    if (nextNum === undefined) return "Error";
    if (operator === "+") total += nextNum;
    else if (operator === "-") total -= nextNum;
  }
  return total;
}
function addToHistory(text) {
  let li = document.createElement("li");
  li.innerText = text;
  output.appendChild(li);
}

equalbtn.addEventListener("click", () => {
  let exp = showInput.value;
  if (exp === "") return;
  let originalExp = exp;
  while ("+-*/(".includes(exp.slice(-1))) {
    exp = exp.slice(0, -1);
  }

  exp = normalizeOperators(exp);
  let fixed = "";
  for (let i = 0; i < exp.length; i++) {
    fixed += exp[i];
    if ("0123456789)".includes(exp[i]) && exp[i + 1] === "(") {
      fixed += "*";
    }
  }
  exp = fixed;
  let safetyCounter = 0;
  while (exp.includes("(") && safetyCounter < 10) {
    let close = exp.indexOf(")");
    let open = exp.lastIndexOf("(", close);
    if (open === -1 || close === -1) break;
    let inside = exp.substring(open + 1, close);
    let res = solve(inside);
    exp = exp.substring(0, open) + res + exp.substring(close + 1);
    safetyCounter++;
  }
  let finalRes = solve(exp);
  if (finalRes === "Error" || isNaN(finalRes)) {
    showInput.value = "Error";
  } else {
    showInput.value = finalRes;
    addToHistory(`${originalExp} = ${finalRes}`);
  }
  resultShown = true;
});

meanBtn.addEventListener("click", () => {
  let text = showInput.value;
  if (!text.includes(",")) {
    showInput.value = "Error";
    resultShown = true;
    return;
  }

  let nums = text.split(",").map(Number);
  let sum = nums.reduce((a, b) => a + b, 0);
  let mean = sum / nums.length;
  showInput.value = mean;
  addToHistory(`Mean(${text}) = ${mean}`);
  resultShown = true;
});

percentBtn.addEventListener("click", () => {
  if (showInput.value !== "" && !isNaN(showInput.value)) {
    let val = Number(showInput.value);
    let res = val / 100;
    showInput.value = res;
    addToHistory(`${val}% = ${res}`);
    resultShown = true;
  }
});

displayClear.addEventListener("click", () => {
  output.innerHTML = "";
});
