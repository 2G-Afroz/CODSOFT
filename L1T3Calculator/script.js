const history = document.querySelector("#history");
const input = document.querySelector("#input");
const result = document.querySelector("#result");

result.value = "0";

function addToInput(value) {
  input.value += value;
}

function clearInput() {
	input.value = "";
}

function deleteFromInput() {
	input.value = input.value.slice(0, -1);
}