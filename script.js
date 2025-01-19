// Initialize the GUI when the page loads
window.onload = initializeGUI;

function validateInput(value) {
	const regex = /^[0-9]+(\.[0-9]{1,2})?$/;
	if (typeof value !== 'string' || value.trim() === '')
		return "Input cannot be empty.";
	if (!regex.test(value))
		return "Invalid input. Please enter a positive number with up to 2 decimal places.";
	return "Input valid.";
}

function sortSides(side1, side2, side3) {
	let sides = [Number(side1), Number(side2), Number(side3)];
	sides.sort((a, b) => a - b);
	let [x, y, z] = sides;
	return { x, y, z };
}

function classifyTriangle(x, y, z) {
	if (x + y <= z)
		return "Not a Triangle";
	if (x === y && y === z)
		return "Equilateral Triangle";
	if (x === y || y === z || x === z)
		return "Isosceles Triangle";
	if (x * x + y * y === z * z)
		return "Right Triangle";
	return "Scalene Triangle";
}

function initializeGUI() {
	const programDiv = document.getElementById("program");
	const form = document.createElement("form");

	function createInputField(labelText, inputId) {
		const div = document.createElement("div");
		const label = document.createElement("label");
		label.setAttribute("for", inputId);
		label.textContent = labelText;

		const input = document.createElement("input");
		input.setAttribute("id", inputId);
		input.setAttribute("name", inputId);
		input.setAttribute("type", "text");

		const error = document.createElement("span");
		error.setAttribute("id", inputId + "Error");

		div.appendChild(label);
		div.appendChild(input);
		div.appendChild(error);
		return div;
	}

	// Add input fields
	form.appendChild(createInputField("Side 1: ", "side1"));
	form.appendChild(createInputField("Side 2: ", "side2"));
	form.appendChild(createInputField("Side 3: ", "side3"));

	// Submit button
	const buttonDiv = document.createElement("div");
	const submitButton = document.createElement("button");
	submitButton.setAttribute("type", "submit");
	submitButton.textContent = "Submit";

	const result = document.createElement("span");
	result.setAttribute("id", "result");

	buttonDiv.appendChild(submitButton);
	buttonDiv.appendChild(result);
	form.appendChild(buttonDiv);
	programDiv.appendChild(form);

	// Add event listeners for form submission and enter key
	form.addEventListener("submit", handleSubmit);
	form.addEventListener("keypress", function (event) {
		if (event.key === "Enter") {
			event.preventDefault();
			handleSubmit(event);
		}
	});
}

function handleSubmit(event) {
	event.preventDefault();
	const side1 = document.getElementById("side1").value;
	const side2 = document.getElementById("side2").value;
	const side3 = document.getElementById("side3").value;

	const side1Error = document.getElementById("side1Error");
	const side2Error = document.getElementById("side2Error");
	const side3Error = document.getElementById("side3Error");

	let output1 = validateInput(side1);
	let output2 = validateInput(side2);
	let output3 = validateInput(side3);

	if (output1 !== "Input valid." || output2 !== "Input valid." || output3 !== "Input valid.") {
		side1Error.innerHTML = " " + output1;
		side2Error.innerHTML = " " + output2;
		side3Error.innerHTML = " " + output3;
		displayResult(" Invalid input.");
		return;
	}

	side1Error.innerHTML = "";
	side2Error.innerHTML = "";
	side3Error.innerHTML = "";

	let { x, y, z } = sortSides(side1, side2, side3);
	const triangleType = classifyTriangle(x, y, z);
	displayResult(" " + triangleType);
	drawTriangle(triangleType);
}

function displayResult(result) {
	const resultDiv = document.getElementById("result");
	resultDiv.innerHTML = result;
}

function drawTriangle(triangleType) {
	const canvas = document.getElementById("triangleCanvas");
	const ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.beginPath();

	if (triangleType === "Equilateral Triangle") {
		ctx.moveTo(150, 50);
		ctx.lineTo(50, 250);
		ctx.lineTo(250, 250);
	} else if (triangleType === "Isosceles Triangle") {
		ctx.moveTo(150, 50);
		ctx.lineTo(100, 250);
		ctx.lineTo(200, 250);
	} else if (triangleType === "Right Triangle") {
		ctx.moveTo(50, 250);
		ctx.lineTo(50, 50);
		ctx.lineTo(250, 250);
	} else if (triangleType === "Scalene Triangle") {
		ctx.moveTo(50, 250);
		ctx.lineTo(150, 100);
		ctx.lineTo(250, 250);
	} else {
		ctx.font = "20px Arial";
		ctx.fillText("Cannot draw this type", 50, 150);
	}

	ctx.closePath();
	ctx.stroke();
}

