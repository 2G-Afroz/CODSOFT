const history = document.querySelector("#history");
const input = document.querySelector("#input");
const result = document.querySelector("#result");

function addToInput(value) {
  switch (value) {
    case ".":
      if (!canEnterDecimal()) {
        return;
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
      break;
    case "×":
      if (getLastChar() === "×" || input.value === "" || getLastChar() === "−" || getLastChar() === "+") return;
      if (getLastChar() === "÷") input.value = input.value.slice(0, -1);
      break;
    case "+":
      if (getLastChar() === "+") return;
      if (getLastChar() === "−") input.value = input.value.slice(0, -1);
      break;
    case "−":
      if (getLastChar() === "−") return;
      if (getLastChar() === "+") input.value = input.value.slice(0, -1);
      break;
  }
  input.value += value;
  input.scrollLeft = input.scrollWidth;
  if (!isNaN(value)) setPartialResult(input.value);
}

function clearInput() {
  input.value = "";
  result.value = "";
  decimal = true;
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

function canEnterDecimal() {
  if(input.value.length === 0) return true;

  for (let i = input.value.length - 1; i >= 0; i--) {
    if (isNaN(input.value[i])) {
      if (input.value[i] === ".") return false;
      else return true;
    }
    else if (i === 0) return true;
  }
}