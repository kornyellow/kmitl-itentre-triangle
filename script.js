document.addEventListener("DOMContentLoaded", () => {
	const submitButton = document.getElementById("submitButton");
	submitButton.addEventListener("click", handleSubmit);
});

function handleSubmit(event) {
	event.preventDefault();

	const side1 = document.getElementById("side1");
	const side2 = document.getElementById("side2");
	const side3 = document.getElementById("side3");

	const side1Value = side1.value.trim();
	const side2Value = side2.value.trim();
	const side3Value = side3.value.trim();

	const side1Error = document.getElementById("side1Error");
	const side2Error = document.getElementById("side2Error");
	const side3Error = document.getElementById("side3Error");

	let output1 = validateInput(side1Value);
	let output2 = validateInput(side2Value);
	let output3 = validateInput(side3Value);

	if (output1 !== "Input valid." || output2 !== "Input valid." || output3 !== "Input valid.") {
		side1Error.textContent = output1 !== "Input valid." ? output1 : "";
		side2Error.textContent = output2 !== "Input valid." ? output2 : "";
		side3Error.textContent = output3 !== "Input valid." ? output3 : "";

		side1.style.borderColor = output1 !== "Input valid." ? "red" : "";
		side2.style.borderColor = output2 !== "Input valid." ? "red" : "";
		side3.style.borderColor = output3 !== "Input valid." ? "red" : "";

		displayResult("Invalid input.");
		return;
	}

	side1Error.textContent = "";
	side2Error.textContent = "";
	side3Error.textContent = "";

	side1.style.borderColor = "";
	side2.style.borderColor = "";
	side3.style.borderColor = "";

	let { x, y, z } = sortSides(Number(side1Value), Number(side2Value), Number(side3Value));
	const triangleType = classifyTriangle(x, y, z);
	displayResult(triangleType);
}

function displayResult(result) {
	const resultDiv = document.getElementById("result");
	if (result === "Invalid input.") {
		resultDiv.style.color = "red";
	} else if (result === "Not a Triangle !!!") {
		resultDiv.style.color = "red";
	} else {
		resultDiv.style.color = "black";
	}
	resultDiv.value = result;
}

function validateInput(value) {
	if(value.trim() === '0')
		return "Side of triangle can’t be 0";
	const regex = /^[0-9]+(\.[0-9]{1,2})?$/;
	if (typeof value !== 'string' || value.trim() === '')
		return "Field can’t be empty";
	if (!regex.test(value))
		return "Value can’t be special characters or arithmetic operators";
	return "Input valid.";
}

function sortSides(a, b, c) {
	let sides = [Number(a), Number(b), Number(c)];
	sides.sort((a, b) => a - b);
	let [x, y, z] = sides;
	return { x, y, z };
}

function classifyTriangle(x, y, z) {
	if (x + y <= z)
		return "Not a Triangle !!!";
	if (x === y && y === z)
		return "Equilateral Triangle";
	if (x === y || y === z || x === z)
		return "Isosceles Triangle";
	if (x * x + y * y === z * z)
		return "Right Triangle";
	return "Scalene Triangle";
}
