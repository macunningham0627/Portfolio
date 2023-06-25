const Operations =
{
	NONE: "none",
	ADD: "add",
	SUBTRACT: "subtract",
	MULTIPLY: "multiply",
	DIVIDE: "divide",
	EXPONENT: "exponent"
};

var operation = Operations.NONE;
var decimalAdded = false;

function concatNum(num)
{
	let input = document.getElementById("calc-input");
	if (decimalAdded)
	{
		let temp = input.value;
		temp = temp.substring(0, temp.length-1) + "" + num;
		input.value = temp;
		decimalAdded = false;
		return;
	} 
	input.value += "" + num;
}

function addDecimal()
{
	let input = document.getElementById("calc-input");
	if (!input.value.includes("."))
	{
		input.value += ".0";
		decimalAdded = true;
	}
}

function valueCheck(input)
{
	return input.value != "";
}

function operate(oper)
{
	let input = document.getElementById("calc-input");
	let inputExists = valueCheck(input);
	let resultExists = document.getElementById("result").innerHTML != "";
	if (!inputExists)
	{
		if (!resultExists)
		{
			alert("Please input a value.");
			return;
		}
	}
	
	if (inputExists)
	{
		document.getElementById("result").innerHTML = input.value;
		document.getElementById("prev-input").innerHTML = "";
	}
	input.value = "";
	
	switch(oper)
	{
		case(Operations.ADD):
			document.getElementById("operand").innerHTML = "+";
			operation = Operations.ADD;
			break;
			
		case(Operations.SUBTRACT):
			document.getElementById("operand").innerHTML = "-";
			operation = Operations.SUBTRACT;
			break;
		
		case(Operations.MULTIPLY):
			document.getElementById("operand").innerHTML = "&times";
			operation = Operations.MULTIPLY;
			break;
			
		case(Operations.DIVIDE):
			document.getElementById("operand").innerHTML = "&divide";
			operation = Operations.DIVIDE;
			break;
		
		case(Operations.EXPONENT):
			document.getElementById("operand").innerHTML = "x<sup>y</sup>";
			operation = Operations.EXPONENT;
			break;
	}
}

function add()
{
	operate(Operations.ADD);
}

function subtract()
{
	operate(Operations.SUBTRACT);
}

function multiply()
{
	operate(Operations.MULTIPLY);
}

function divide()
{
	operate(Operations.DIVIDE)
}

function exp()
{
	operate(Operations.EXPONENT);
}

function calculate()
{
	if (operation == Operations.NONE)
	{
		return;
	}
	let input = document.getElementById("calc-input");
	if (!valueCheck(input))
	{
		alert("Please input a value.");
		return;
	}
	
	let num1 = document.getElementById("result").innerHTML;
	let num2 = input.value;
	input.value = "";
	switch(operation)
	{
		case(Operations.ADD):
			document.getElementById("prev-input").innerHTML =
					num1 + " + " + num2;
			document.getElementById("result").innerHTML = 
					Number(num1) + Number(num2);
			break;
			
		case(Operations.SUBTRACT):
			document.getElementById("prev-input").innerHTML =
					num1 + " - " + num2;
			document.getElementById("result").innerHTML = 
					Number(num1) - Number(num2);
			break;
		
		case(Operations.MULTIPLY):
			document.getElementById("prev-input").innerHTML =
					num1 + " &times " + num2;
			document.getElementById("result").innerHTML = 
					Number(num1) * Number(num2);
			break;
			
		case(Operations.DIVIDE):
			document.getElementById("prev-input").innerHTML =
					num1 + " &divide " + num2;
			document.getElementById("result").innerHTML = 
					Number(num1) / Number(num2);
			break;
			
		case(Operations.EXPONENT):
			document.getElementById("prev-input").innerHTML =
					num1 + "<sup>" + num2 + "</sup>";
			document.getElementById("result").innerHTML = 
					Math.pow(Number(num1), Number(num2));
			break;
	}
	
	document.getElementById("prev-input").innerHTML += " =";
	
	document.getElementById("operand").innerHTML = "";
	operation = Operations.NONE;
}

function clearInput()
{
	let input = document.getElementById("calc-input");
	if (!valueCheck(input))
	{
		document.getElementById("prev-input").innerHTML = "";
		document.getElementById("result").innerHTML = "";
		document.getElementById("operand").innerHTML = "";
		operation = Operations.NONE;
	}
	input.value = "";
}

document.addEventListener("keydown", (event) =>
{
	var name = event.key;
	if (["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].includes(name))
	{
		concatNum(name);
		return;
	}
	switch(name)
	{
		case("."):
			addDecimal();
			break;
		
		case("+"):
			add();
			break;
			
		case("-"):
			subtract();
			break;
			
		case("*"):
			multiply();
			break;
			
		case("/"):
			divide();
			break;
			
		case("Enter"):
			event.preventDefault();
			//preventDefault stops Enter key from activating buttons
			calculate();
			break;
			
		case("Backspace"):
		case("Delete"):
			clearInput();
			break;
	}
});