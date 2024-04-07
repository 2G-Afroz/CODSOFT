const history = document.querySelector("#history");
const input = document.querySelector("#input");
const result = document.querySelector("#result");
let decimal = true;

function addToInput(value) {
  switch (value) {
    case ".":
      if (!decimal) {
        return;
      } else {
        decimal = false;
      }
      break;
    case "÷":
      if (getLastChar() === "÷" || input.value === "" || getLastChar() === "−" || getLastChar() === "+") return;
      if (
        getLastChar() === "×" ||
        getLastChar() === "+" ||
        getLastChar() === "−"
      )
      input.value = input.value.slice(0, -1);
      decimal = true;
      break;
    case "×":
      if (getLastChar() === "×" || input.value === "" || getLastChar() === "−" || getLastChar() === "+") return;
      if (getLastChar() === "÷") input.value = input.value.slice(0, -1);
      decimal = true;
      break;
    case "+":
      if (getLastChar() === "+") return;
      if (getLastChar() === "−") input.value = input.value.slice(0, -1);
      decimal = true;
      break;
    case "−":
      if (getLastChar() === "−") return;
      if (getLastChar() === "+") input.value = input.value.slice(0, -1);
      decimal = true;
      break;
  }
  input.value += value;
  input.scrollLeft = input.scrollWidth;
  if (!isNaN(value)) setPartialResult(input.value);
}

function clearInput() {
  input.value = "";
  result.value = "";
}

function setResult() {
  let expression = input.value;
  input.value = "";

  result.classList.add("result-animation");

  setTimeout(() => {
    let r = eval(parseInput(expression));
    console.log(r);
    if (r === Infinity || isNaN(r) || undefined) input.value = "";
    else {
      input.value = r;
      input.scrollLeft = input.scrollWidth;
    }
    result.value = "";
    result.classList.remove("result-animation");
  }, 250);
}

function deleteFromInput() {
  input.value = input.value.slice(0, -1);
  setPartialResult();
}

function getLastChar() {
  return input.value[input.value.length - 1];
}

function parseInput(exp) {
  if(exp === "") return "";
  while (isNaN(exp[exp.length - 1])) exp = exp.slice(0, -1);

  exp = exp.replace(/÷/g, "/");
  exp = exp.replace(/×/g, "*");
  exp = exp.replace(/−/g, "-");
  return exp;
}

function setPartialResult(value) {
  let r = eval(parseInput(value));
  if (r === Infinity || isNaN(r)) result.value = "";
  else result.value = r;
}