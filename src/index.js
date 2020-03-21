function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
	expr = expr.replace(/\s/g, '');
	expr = expr.split('');
	let newExpr = [];
	let element = [];

	for (let i = 0; i < expr.length; i++) {
        
		if (expr[i].match(/[0-9]/)) {
				element = element + expr[i];
				continue;
		} 	

		if (element.length > 0) {
			newExpr.push(parseInt(element))
				element = [];
		} 
	if (expr[i].match(/\W/)) {
			newExpr.push(expr[i]); 
		}
	}

	if (element.length > 0) {
		newExpr.push(parseInt(element))
			element = [];
		}
	
	expr = newExpr;
	let res = 0;
	let arr = [];
	let arr2 = [];
	let a = 0; // открывающаяся скобка
	let b = 1; // символов после первой скобки и до закрывающейся
	let bracket1 = []; // счётчик скобок
	let bracketOpen = 0; // счётчик скобок (
	let bracketClose = 0; // счётчик скобок )

	for (let i = 0; i < expr.length; i++) {

		if (expr[i] === "(" ) {
			bracketOpen++;
		} 
		if (expr[i] === ")" ) {
		
			if (bracketOpen === 0) {
				throw new Error("ExpressionError: Brackets must be paired");
			} else {
				bracketClose++;
			}
		}
	}

	if (bracketOpen != bracketClose) {
		throw new Error("ExpressionError: Brackets must be paired");
	}
	
	var length = -1;
	while(expr.length > 1 && expr.length != length)
	{
	length = expr.length;
	
	expr.includes( "(" ) ? expr = bracket(expr) : expr = matOp(expr);
	
	}
	let result = Number(expr.join(""));
	return result;
	
	
	
	
	
	function bracket(expr) {
	let j = 0;
			for ( let i = 0; i < expr.length; i++){ // ищем скобки и применяем функцию к тому что в скобках
				if (expr[i] === "(" ) {
					arr = [];       
					a = j;
				 
					b = 1; // обнуляем число элеметов в скобках
				} 
				else if (expr[i] === ")" ) {
					break;  
				}
				if (expr[i] != "(" ) {
					arr.push(expr[i]); 
					b++; // считаем количество элементов в скобках
				}
				j++
			 } 
			
			 arr2 = Number(matOp(arr));     
			expr.splice(a,b+1,arr2); // заменяем скобки и содержимое на результат операций няд элементами в скобках
		 
			return expr;
			 
	 }
	 
	 
	function matOp(expr) { // функция арифметических операций
	//alert("res" + res);
	 
	for (let i = 0; i < expr.length; i++) { 
		if (expr[i] === "*") {
			res = Number(expr[i-1]) * Number(expr[i+1]);
			expr.splice(i-1,3,res)
			i=i-2;
		}
		if (expr[i] === "/") {
			if (Number(expr[i+1]) === 0 ) {
				throw new Error("TypeError: Division by zero.");
				}
			res = Number(expr[i-1]) / Number(expr[i+1]);
			expr.splice(i-1,3,res)
			i=i-2;
		}
	}
	for (let i = 0; i < expr.length; i++) {
		if (expr[i] === "+") {
			res = Number(expr[i-1]) + Number(expr[i+1]);
			expr.splice(i-1,3,res)
			i=i-2;
		}
		 if (expr[i] === "-") {
			res = Number(expr[i-1]) - Number(expr[i+1]);
			expr.splice(i-1,3,res)
			i=i-2;
		}		
	}
	return expr;
	} 
    
  
}

module.exports = {
    expressionCalculator
}