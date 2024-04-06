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
      if (getLastChar() === "÷" || input.value === "") return;
      if (
        getLastChar() === "×" ||
        getLastChar() === "+" ||
        getLastChar() === "−"
      )
        input.value = input.value.slice(0, -1);
      break;
    case "×":
      if (getLastChar() === "×" || input.value === "") return;
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
  if (!isNaN(value)) setPartialResult();
}

function clearInput() {
  input.value = "";
  result.value = "";
}

function setResult() {
  input.value = eval(parseInput());
  result.value = "";
}

function deleteFromInput() {
  input.value = input.value.slice(0, -1);
  setPartialResult();
}

function getLastChar() {
  return input.value[input.value.length - 1];
}

function parseInput() {
	let parsed = input.value;
  while (isNaN(parsed[parsed.length - 1])) parsed = parsed.slice(0, -1);

  parsed = parsed.replace(/÷/g, "/");
  parsed = parsed.replace(/×/g, "*");
  parsed = parsed.replace(/−/g, "-");
  return parsed;
}
function setPartialResult() {
  let r = eval(parseInput());
  console.log(r);
  if (r === Infinity || isNaN(r)) result.value = "";
  else result.value = r;
}
