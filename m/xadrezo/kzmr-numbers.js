function nextBiggest82n(x) {
		var pw = 0;
		while (x >= (8 ** (3 * (2 ** pw)))) {
			pw += 1
		}
		return Math.max(512, (8 ** (3 * (2 ** pw))))
	}
	
	function nameCleanupSmall(name) {
		if (name.slice(0, 4) == "one ") {name = name.slice(4)}
		if (name.slice(-5) == " zero") {name = name.slice(0, -5)}
		
		return name
	}
	
	function nameCleanup(name) {
		for (let i = 0; i < name.length; i++) {
			if (name[i] == ["one"] || name[i] == "one") {
				if (i != name.length - 1) {
					name[i] = ""
				}
			} else if (name[i] == ["zero"] || name[i] == "zero") {
				if (i != name.length - 1) {
					name[i] = ""
					name[i+1] = ""
				} else if (name.filter((str) => str !== '').length != 1) {
					name[i] = ""
				}
			}
		}
		
		if (typeof(name) === 'string') {return name}
		
		return name.filter((str) => str !== '')
	}
	
	function shortIterativeConvert(x, system) {
		if (x.length <= 1) {
			
			var dict;
			
			dict = {
				"0": "zero",
				"1": "one",
				"2": "2",
				"3": "3",
				"4": "4",
				"5": "5",
				"6": "6",
				"7": "7",
			};
			
			return dict[x]
		} else {
			var dict = {
				2: "8",
				4: "9",
			};
			
			var split1 = x.slice(0, x.length / 2)
			var split2 = x.slice(-1 * (x.length / 2))
			
			return nameCleanup([nameCleanup(shortIterativeConvert(split1, system)), dict[x.length], nameCleanup(shortIterativeConvert(split2, system))])
		}
	}
	
	function iterativeConvert(x, system) {
		if (x.length <= 3) {
			return shortIterativeConvert("0".repeat(4 - x.length) + String(x), system)
		} else {
			var dict = {
				6: "",
				12: "",
				24: "KG",
				48: "LHVI",
				96: "KRN",
				192: "KHH",
			};
			
			var split1 = x.slice(0, x.length / 2)
			var split2 = x.slice(-1 * (x.length / 2))
			
			return nameCleanup([nameCleanup(iterativeConvert(split1, system)), dict[x.length], nameCleanup(iterativeConvert(split2, system))])
		}
	}
	
	function log8(number) {
		return Math.log(number) / Math.log(8)
	}
	
	function parseNumber(numero) {
		var biggerBase = nextBiggest82n(BigInt("0o" + String(numero)))
		var biggerBase2 = biggerBase
		
		// console.log(biggerBase)
		
		var paddedString = "0".repeat(log8(biggerBase) - String(numero).length) + String(numero)

		// console.log(paddedString)
		var systemSel = NaN
		
		var rawString = [(iterativeConvert(paddedString, systemSel))]
		// console.log(rawString)
		return nameCleanupSmall(rawString.flat(Infinity).join(''))
	}
	
	function getNegative(numero) {
		
		var inputNumber = ("0" + numero).split('')
		
		for (let i = inputNumber.length - 1; i > -1; i--) {
			inputNumber[i] = parseInt(inputNumber[i])
			
			// console.log(i, inputNumber[i])
			if (inputNumber[i] > 5) {
				inputNumber[i] -= 8;
				inputNumber[i-1] = parseInt(inputNumber[i-1]) + 1
			}
		}
		
		var beforeNum = BigInt(inputNumber.map((x) => (x >= 0 ? 0 : x * -1)).join(''))
		var afterNum = BigInt(inputNumber.map((x) => (x <= 0 ? 0 : x)).join(''))
		
		// console.log(beforeNum, afterNum)
		
		// console.log((beforeNum > 0 ? parseNumber(beforeNum) + " before " : "") + parseNumber(afterNum))
		return ((beforeNum > 0 ? parseNumber(beforeNum) + "" : "") + parseNumber(afterNum))
	}
	
	function numeralKZM(x) {
		var numero = BigInt(x).toString(8)
		
		if (numero == "NaN") {return "Error";}
		
		
		rawString = getNegative(numero).replaceAll("one", "1").replaceAll("zero", "0") //parseNumber(numero)

		return (rawString).replaceAll("-", " ")
	}