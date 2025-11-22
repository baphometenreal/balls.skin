function bijectiveString(m, k) {
		  if (m == 0) {
			  return "0";
		  }
		  let string = [];
		  function f(x) {
			return Math.ceil(x) - 1;
		  }
		  let qn = f(m / k); // q0
		  string.push(m - qn * k); // a0
		  while (qn != 0) {
			let qnInc = f(qn / k);
			let anInc = qn - qnInc*k;
			string.push(anInc);
			qn = qnInc;
		  }
		  return string.reverse().join('');
		}
		
		function numberSUN(x, iter = 0) {
			var number = x
			var numberString = ""
			
			if (iter == 0 && x == 0) {return "0"}
			if (iter > 0 && x == 0) {return 0}
			
			var parseNum = [numberSUN(Math.floor(x / 1000), iter + 1), Math.floor(x / 100) % 10, Math.floor(x / 10) % 10, x % 10]
			
			var digits = [0, "_a", "_e", "_o", "_i", "_u", "_p", "_b", "_m", "_t"]
			
			numberString = (parseNum[0] != 0 ? parseNum[0] + "_r" : "") + (parseNum[1] != 0 ? digits[parseNum[1]] + "_s" : "") + (parseNum[2] != 0 ? digits[parseNum[2]] + "_d" : "") + (parseNum[3] != 0 ? digits[parseNum[3]] : "")
			if (iter > 0) {return numberString}
			
			if (numberString.slice(0, 2) == "_a" && numberString.length > 2) {numberString = numberString.slice(2)}
			
			return numberString
		}
		
		function translateSyllable(syl, mode, getDict = false) {
			var translate
			
			if (syl.slice(0,3) == "u+e" && (parseInt(syl.slice(2), 16) >= 57344) && (parseInt(syl.slice(2), 16) < 61439)) {
				return String.fromCodePoint(parseInt(syl.slice(2), 16))
			}
			
			switch (mode) {
				case "bap":
					translate = {
						"ahdyevyu": "",
						"ahdi": "",
						"ahkam":"",
						"ahlyede":"",
						"ahlyi":"",
						"ahvake":"",
						"ahve":"",
						"ahyunah":"",
						"alke":"",
						"alke2":"",
						"ame":"",
						"ata":"",
						"azye":"",
						"bahruk":"",
						"bah":"",
						"baltye":"",
						"bal":"",
						"bastah":"",
						"bë":"",
						"bedeng":"",
						
						
						":": ":",
						"\"": "«",
						"(": "(",
						")": ")",
						"'": "'",
						",": ",",
						".": ".",
						"!": "!",
						"?": "?",
						"“": "«",
						"”": "»",
						"": "",
					}
					
					if (syl.slice(0, 1) == "\\" && syl.length > 1) {
						// syl = syl.replaceAll("nga", "ngga");
						// syl = syl.replaceAll("nge", "ngge");
						// syl = syl.replaceAll("ngë", "nggë");
						// syl = syl.replaceAll("ngi", "nggi");
						// syl = syl.replaceAll("ngo", "nggo");
						// syl = syl.replaceAll("ngu", "nggu");
						// syl = syl.replaceAll("ngy", "nggy");
						// syl = syl.replaceAll("nh", "ngh");
						syl = syl.replaceAll("ng", "Ñ");
						syl = syl.replaceAll("sh", "Ś");
						syl = syl.replaceAll("zh", "Ž");
						// syl = syl.replaceAll("dh", "Ð");
						syl = syl.replaceAll("jh", "Ź");
						syl = syl.replaceAll("j", "Ź");
						// syl = syl.replaceAll("ph", "F");
						// syl = syl.replaceAll("kh", "X");
						// syl = syl.replaceAll("ah", "Á");
						syl = syl.replaceAll("è", "Ë");
						syl = syl.replaceAll("y", "j");
						
						syl = syl.replaceAll(";", "");
						syl = syl.replaceAll("'", ";");
						syl = syl.replaceAll("“", "«");
						syl = syl.replaceAll("”", "»");
						syl = syl.toUpperCase()
						
						syl = syl.replaceAll("\\", "");
						return syl
					}
					
					syl = syl.replaceAll("è", "ë");
					
					if (/^\d+$/ig.test(syl)) {return bijectiveString(parseInt(syl), 6)}
					break;
				case "noe":
					translate = {
						"ape": "",
						"hax": "",
						"ave": "",
						"oseu": "",
						"fil": "",
						"falas": "",
						"kontur": "",
						"oil": "",
						"kol": "",
						"flus": "",
						"devlem": "",
						"krois": "",
						"mansi": "",
						"loker": "",
						"pid": "",
						"jabe": "",
						"boxe": "",
						"kre": "",
						"phors": "",
						"puver": "",
						"toit": "",
						"rein": "",
						"au": "",
						"ver": "",
						"bre": "",
						"rut": "",
						"mon": "",
						"rous": "",
						"heb": "",
						"pat": "",
						"fu": "",
						"mache": "",
						"salet": "",
						"ter": "",
						"kim": "",
						"vet": "",
						"kour": "",
						"servu": "",
						"kor": "",
						"epri": "",
						"dese": "",
						"bute": "",
						"klak": "",
						"aret": "",
						"lun": "",
						"sul": "",
						"rol": "",
						"par": "",
						"je": "",
						"nu": "",
						"na": "",
						"phutur": "",
						"shura": "",
						"mi": "",
						"douk": "",
						"nekor": "",
						"rodo": "",
						"tavier": "",
						"hurits": "",
						"jirodo": "",
						"jirodots": "",
						"poi": "",
						"tsuru": "",
						"angru": "",
						"privis": "",
						"saki": "",
						"rang": "",
						"bul": "",
						"ene": "",
						"gunu": "",
						"meso": "",
						"dide": "",
						"muryo": "",
						"bangbob": "",
						"nai": "",
						"toud": "",
						"suka": "",
						"sel": "",
						"chos": "",
						"kes": "",
						"pu": "",
						"aut": "",
						"glos": "",
						"lon": "",
						"lud": "",
						"pite": "",
						"min": "",
						"yunko": "",
						"teni": "",
						"jwoda": "",
						"sala": "",
						"sala2": "",
						"kanit": "",
						"kanit2": "",
						"kali": "",
						"kali2": "",
						"kali3": "",
						"hawi": "",
						"ma": "",
						
						":": ":",
						"\"": "«",
						"(": "(",
						")": ")",
						"'": "'",
						",": ",",
						".": ".",
						"!": "!",
						"?": "?",
						"“": "«",
						"”": "»",
						"": "",
					}
					
					if (syl.slice(0, 1) == "\\" && syl.length > 1) {
						syl = syl.replaceAll("y", "j");
						syl = syl.replaceAll("è", "ë");
						syl = syl.replaceAll("'", ";");
						syl = syl.replaceAll("“", "«");
						syl = syl.replaceAll("”", "»");
						syl = syl.toUpperCase()
						
						syl = syl.replaceAll("\\", "");
						return syl
					}
					
					if (/^\d+$/ig.test(syl)) {return bijectiveString(parseInt(syl), 6)}
					break;
				case "kzm":
					translate = {
						
						":": "'",
						"::": "\"",
						":::": "`",
						
						"he1": "🜚",
						"he2": "🜛",
						"he3": "🜠",
						"he4": "🜩",
						"he5": "🜜",
						"he6": "🜐",
						"he7": "🜪",
						"he8": "🝍",
						"he9": "🜫",
						"he10": "🜀",
						
						/*
						":": ":",
						"\"": "“",
						"(": "(",
						")": ")",
						"'": "'",
						",": ",",
						".": ".",
						"!": "!",
						"?": "?",
						"“": "“",
						"”": "”",
						"": "",
						*/
					}
					
					if (syl.slice(0, 1) == "\\" && syl.length > 1) {
						syl = syl.replaceAll("e", "i");
						syl = syl.replaceAll("'", "q");
						syl = syl.replaceAll("š", "e");
						syl = syl.replaceAll("ž", "j");
						syl = syl.replaceAll("þ", "l");
						
						syl = syl.replaceAll(":::", "`");
						syl = syl.replaceAll("::", "\"");
						syl = syl.replaceAll(":", "'");
						syl = syl.toUpperCase()
						
						syl = syl.replaceAll("\\", "");
						return syl
					}
					
					if (/^\d+$/ig.test(syl)) {return numeralKZM(parseInt(syl))}
					break;
				case "azk":
					translate = {
						"eren": "",
						"chikassi": "",
						"eche": "",
						"ikatsia": "",
						"tsi": "",
						"kurra": "",
						"go": "",
						"tu": "",
						"hakel": "",
						"kalichei": "",
						"tawiri": "",
						"etaneu": "",
						"kiron": "",
						"ku": "",
						"ma": "",
						"ha": "",
						"ekoiten": "",
						"sukuro": "",
						"amuko": "",
						"kralowo": "",
						"herensumatu": "",
						"shame": "",
						"shamekut": "",
						"kanite": "",
						"kali": "",
						"kali2": "",
						"kali3": "",
						"kawi": "",
						"herri": "",
						"keu": "",
						"muiz": "",
						"aztei": "",
						"orrek": "",
						"tekaz": "",
						"poihe": "",
						"sasut": "",
						"kena": "",
						"perri": "",
						"jar": "",
						"perijar": "",
						"horus": "",
						"meu": "",
						"ari": "",
						"waihe": "",
						"suhais": "",
						"isan": "",
						"ethan": "",
						"esan": "",
						"oizza": "",
						"jauko": "",
						
						":": ":",
						"\"": "“",
						"(": "{",
						")": "}",
						"'": "'",
						",": "ʻ",
						".": "·",
						"!": "¡",
						"?": "¿",
						"“": "“",
						"”": "”",
						"": "",
					}
					
					if (syl.slice(0, 1) == "\\" && syl.length > 1) {
						syl = syl.replaceAll("gn", "њ");
						syl = syl.replaceAll("ng", "ң");
						syl = syl.replaceAll("ch", "ч");
						syl = syl.replaceAll("sh", "ш");
						syl = syl.replaceAll("tz", "щ");
						syl = syl.replaceAll("ts", "ц");
						syl = syl.replaceAll("dl", "љљ");
						syl = syl.replaceAll("th", "ҫ");
						syl = syl.replaceAll("dh", "ҙ");
						syl = syl.replaceAll("rr", "Р");
						syl = syl.replaceAll("lr", "Л");
						
						syl = syl.replaceAll("m", "м");
						syl = syl.replaceAll("n", "н");
						syl = syl.replaceAll("p", "п");
						syl = syl.replaceAll("t", "т");
						syl = syl.replaceAll("k", "к");
						syl = syl.replaceAll("g", "г");
						syl = syl.replaceAll("f", "ф");
						syl = syl.replaceAll("z", "з");
						syl = syl.replaceAll("s", "с");
						syl = syl.replaceAll("þ", "ҫ");
						syl = syl.replaceAll("h", "х");
						syl = syl.replaceAll("v", "в");
						syl = syl.replaceAll("ð", "ҙ");
						syl = syl.replaceAll("d", "д");
						syl = syl.replaceAll("w", "ў");
						syl = syl.replaceAll("l", "л");
						syl = syl.replaceAll("j", "й");
						syl = syl.replaceAll("r", "р");
						
						syl = syl.replaceAll("i", "и");
						syl = syl.replaceAll("u", "у");
						syl = syl.replaceAll("e", "е");
						syl = syl.replaceAll("o", "о");
						syl = syl.replaceAll("é", "э");
						syl = syl.replaceAll("ó", "ъ");
						syl = syl.replaceAll("a", "а");
						
						syl = syl.replaceAll("0", "А");
						syl = syl.replaceAll("1", "Б");
						syl = syl.replaceAll("2", "В");
						syl = syl.replaceAll("3", "Г");
						syl = syl.replaceAll("4", "Д");
						syl = syl.replaceAll("5", "Е");
						syl = syl.replaceAll("6", "Ж");
						syl = syl.replaceAll("7", "З");
						syl = syl.replaceAll("8", "И");
						syl = syl.replaceAll("9", "Й");
						
						syl = syl.replaceAll("!", "¡");
						syl = syl.replaceAll("?", "¿");
						syl = syl.replaceAll("(", "{");
						syl = syl.replaceAll(")", "}");
						syl = syl.replaceAll(",", "ʻ");
						syl = syl.replaceAll(".", "·");
						
						syl = syl.replaceAll("\\", "");
						return syl
					}
					
					if (/^\d+$/ig.test(syl)) {
						syl = syl.replaceAll("0", "А");
						syl = syl.replaceAll("1", "Б");
						syl = syl.replaceAll("2", "В");
						syl = syl.replaceAll("3", "Г");
						syl = syl.replaceAll("4", "Д");
						syl = syl.replaceAll("5", "Е");
						syl = syl.replaceAll("6", "Ж");
						syl = syl.replaceAll("7", "З");
						syl = syl.replaceAll("8", "И");
						syl = syl.replaceAll("9", "Й");
						return syl
					}
					break;
				case "sun":
					translate = {
						"po": "",
						"patam": "",
						"ter": "",
						"tr": "",
						"baltie": "",
						"pra": "",
						"gale": "",
						"heu": "",
						"dagos": "",
						"bern": "",
						"žon": "",
						"bele": "",
						"kist": "",
						"begueie": "",
						"hoku": "",
						"sreu": "",
						"ekue": "",
						"greh": "",
						"grea": "",
						"elene": "",
						"dzom": "",
						"beiit": "",
						"kemp": "",
						"tedese": "",
						"hoh": "",
						"hoa": "",
						"sudžie": "",
						"gueih": "",
						"seme": "",
						"kret": "",
						"auake": "",
						"teg": "",
						"hrež": "",
						"lunlin": "",
						"uoder": "",
						"mubeue": "",
						"uerm": "",
						"dude": "",
						"grabel": "",
						"grabl": "",
						"igas": "",
						"pont": "",
						"aliede": "",
						"mont": "",
						"sebo": "",
						"koin": "",
						"žezor": "",
						"pior": "",
						"gred": "",
						"hert": "",
						"ues": "",
						"šer": "",
						"mregen": "",
						"mregn": "",
						"kerp": "",
						"sehil": "",
						"mer": "",
						"deus": "",
						"šern": "",
						"host": "",
						"moin": "",
						"solm": "",
						"kail": "",
						"kaput": "",
						"pil": "",
						"terh": "",
						"tera": "",
						"peisš": "",
						"hou": "",
						"kreti": "",
						"dem": "",
						"heig": "",
						"kelter": "",
						"keltr": "",
						"mermen": "",
						"ters": "",
						"hnes": "",
						"guem": "",
						"skreib": "",
						"edont": "",
						"heiger": "",
						"heigr": "",
						"hešem": "",
						"hešm": "",
						"hesher": "",
						"deiguder": "",
						"deigudr": "",
						"mem": "",
						"denžu": "",
						"goru": "",
						"port": "",
						"ež": "",
						"ž": "",
						"hem": "",
						"hm": "",
						"uei": "",
						"u": "",
						"ens": "",
						"tu": "",
						"t": "",
						"tsu": "",
						"ius": "",
						
						"iu": "",
						"i": "",
						"h": "",
						"as": "",
						"deug": "",
						"proti": "",
						"greb": "",
						"noktakreš": "",
						"noktaues": "",
						"hep": "",
						"heržmen": "",
						"hieu": "",
						"bernhept": "",
						"bernhepheržmen": "",
						"aiheks": "",
						"anru": "",
						"sank": "",
						"a": "",
						"ei": "",
						"id": "",
						"hes": "",
						"še": "",
						"s": "",
						"tor": "",
						"ku": "",
						"i2": "",
						"ku2": "",
						"i3": "",
						"kuei": "",
						"iei": "",
						"kuoda": "",
						"kuebi": "",
						"iebi": "",
						"ne": "",
						"heln": "",
						"somh": "",
						"soma": "",
						"reh": "",
						"rea": "",
						"eis": "",
						"kail2": "",
						"heli": "",
						"mež ": "",
						"maž": "",
						"delg": "",
						"stelh ": "",
						"stela": "",
						"benž": "",
						"greh2": "",
						"grea2": "",
						"mei": "",
						"mrež": "",
						"skert": "",
						"henž": "",
						"tenh": "",
						"tena": "",
						"hlengu": "",
						"sež": "",
						"guen": "",
						"uir": "",
						"gostp": "",
						"dempot": "",
						"guent": "",
						"uirt": "",
						"noltert": "",
						"hantersešst": "",
						"pot": "",
						"leubet": "",
						"prei": "",
						"ženader": "",
						"ženadr": "",
						"deus2": "",
						"grabli": "",
						"hengu": "",
						"uisg": "",
						"žam": "",
						"kali": "",
						"kaui": "",
						"lond": "",
						"hreud": "",
						"želhu": "",
						"grohen": "",
						"grohn": "",
						"moder": "",
						"modr": "",
						"hrežen": "",
						"hrežn": "",
						"kersen": "",
						"kersn": "",
						"alb": "",
						"sleb": "",
						"neu": "",
						"ioher": "",
						"ior": "",
						"neuioher": "",
						"neuior": "",
						"ženh": "",
						"žena": "",
						"huers": "",
						"heku": "",
						"hleuder": "",
						"horb": "",
						"somh2": "",
						"soma2": "",
						"somh3": "",
						"soma3": "",
						"semter": "",
						"semter2": "",
						"deš": "",
						"hrož": "",
						"guen2": "",
						"moreit": "",
						"želti": "",
						"teng": "",
						"šuei": "",
						"mautsor": "",
						"mauter": "",
						"mautr": "",
						"mauder": "",
						"maudr": "",
						"šu": "",
						"ešu": "",
						"muh": "",
						"mua": "",
						"tetšsen": "",
						"tetšsn": "",
						"luber": "",
						"lubr": "",
						"brusg": "",
						"hues": "",
						"gemeionter": "",
						"gemeiontr": "",
						"tetsšenen": "",
						"tetsšenn": "",
						"mel": "",
						"h2": "",
						"a2": "",
						"det": "",
						"geb": "",
						"det2": "",
						"bel": "",
						"gem": "",
						"žneh": "",
						"žnea": "",
						"kag": "",
						"speš": "",
						"guemt": "",
						"ueld": "",
						"speš2": "",
						"bel2": "",
						"hep2": "",
						"gels": "",
						"proš": "",
						"neud": "",
						"sent": "",
						"ken": "",
						"guieh": "",
						"guiea": "",
						"guieh2": "",
						"guiea2": "",
						"skreib2": "",
						"speš3": "",
						"seku": "",
						"pehu": "",
						"šer2": "",
						"bel3": "",
						"leub": "",
						"hed": "",
						"dieu": "",
						"deiu": "",
						"uoihn": "",
						"pohem": "",
						"bež": "",
						"hengul": "",
						"astser": "",
						"is": "",
						"onter": "",
						"ontr": "",
						"uder": "",
						"loub": "",
						"neur": "",
						"hnerter": "",
						"heuser": "",
						"sunter": "",
						"protiheuser": "",
						"hiam": "",
						"hmet": "",
						"dež": "",
						"meg": "",
						"pekumen": "",
						"bloid": "",
						"snoigu": "",
						"gel": "",
						"tep": "",
						"blehm": "",
						"s2": "",
						"n": "",
						"i4": "",
						"t2": "",
						"i5": "",
						"su": "",
						"u2": "",
						"ve": "",
						"ge": "",
						"ze": "",
						"ve2": "",
						"še2": "",
						"ke": "",
						"ge2": "",
						"džan": "",
						"han": "",
						"dže": "",
						"tše": "",
						"hl.": "",
						
						
						":": ":",
						"\"": "«",
						"(": "(",
						")": ")",
						"'": "'",
						",": ",",
						".": ".",
						"!": "!",
						"?": "?",
						"“": "«",
						"”": "»",
						"": "",
					}
					
					if (syl.slice(0, 1) == "\\" && syl.length > 1) {
						//syl = syl.replaceAll("j", "i");
						//syl = syl.replaceAll("w", "u");
						syl = syl.replaceAll("š", "c");
						syl = syl.replaceAll("ž", "j");
						syl = syl.replaceAll("“", "«");
						syl = syl.replaceAll("”", "»");
						
						syl = syl.replaceAll("\\", "");
						return syl
					}
					syl = syl.replaceAll("c", "š");
					syl = syl.replaceAll("j", "ž");
					
					//if (/^\d+$/ig.test(syl)) {return numberSUN(parseInt(syl))}
					if (/^\d+$/ig.test(syl)) {
						syl = syl.replaceAll("0", "У");
						syl = syl.replaceAll("1", "Ф");
						syl = syl.replaceAll("2", "Х");
						syl = syl.replaceAll("3", "Ц");
						syl = syl.replaceAll("4", "Ч");
						syl = syl.replaceAll("5", "Ш");
						syl = syl.replaceAll("6", "Щ");
						syl = syl.replaceAll("7", "Ъ");
						syl = syl.replaceAll("8", "Ы");
						syl = syl.replaceAll("9", "Ь");
						return syl
					}
					break;
				default:
					translate = {
						":": ":",
						"\"": "«",
						"(": "(",
						")": ")",
						"'": "'",
						",": ",",
						".": ".",
						"!": "!",
						"?": "?",
						"“": "«",
						"”": "»",
						"": "",
					}
			}
			
			if (getDict) {
				return translate
			}
			
			// console.log(syl)
			if (syl == "") {return " "}
			// if (/\b\d+\b/ig.test(syl)) {return syl}
			if (syl in translate) {return translate[syl]}
			return "<font style=\"color: red;\">�</font>"
		}
	
		function convertText(inputText, mode) {
			inputText = inputText.toLowerCase()
			inputText = inputText.replaceAll("-", " ");
			inputText = inputText.replace(/"([^"]*)"/g, "“$1”");
			inputText = inputText.replace("\"", "“");
			inputText = inputText.split(" ");
			
			for (var i = 0; i < inputText.length; i++) {inputText[i] = translateSyllable(inputText[i], mode)}
			inputText = inputText.join("");
			
			return inputText
		}
