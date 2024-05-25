function mod(n, m) {
	return ((n % m) + m) % m;
}

// -- LOREMESE --
function translateLRM(syl) {
	var translate = {
		"a": "α",
		"b": "в",
		"g": "г",
		"d": "d",
		"e": "є",
		"u": "y",
		"v": "y",
		"z": "z",
		"i": "ϝ",
		"c": "k",
		"l": "l",
		"m": "m",
		"n": "n",
		"s": "ʒ",
		"o": "o",
		"p": "c",
		"r": "p",
		"ç": "w",
		"x": "w",
		"t": "т",
		
		"A": "A",
		"B": "В",
		"G": "Γ",
		"D": "Δ",
		"E": "E",
		"U": "Y",
		"V": "Y",
		"Z": "Z",
		"I": "Ϝ",
		"C": "K",
		"L": "Λ",
		"M": "M",
		"N": "N",
		"S": "Ʒ",
		"O": "O",
		"P": "C",
		"R": "P",
		"Ç": "W",
		"X": "W",
		"T": "T",
		
		"₱": "₵",
		"€": "₵",
		"$": "₵",
		
		"~": "~",
		"<": "<",
		">": ">",
		" ": " ",
	}

	if (/\b\d+\b/ig.test(syl)) {return syl}
	if (/\p{P}/uig.test(syl)) {return syl}
	if (syl in translate) {return translate[syl]}
	return "<font style=\"color: red;\">�</font>"
}

function convertTextLRM(inputText) {
	convstring = "";
	for (var i = 0; i < inputText.length; i++) {
		convstring += translateLRM(inputText[i])}

	return convstring
}

function getWeekdayLRM(date) {
	return (date.getUTCDay()+6)%7
}

// -------- Source: https://stellafane.org/misc/equinox.html
//-----Utility Funtions------------------------------------------------------------
function INT ( n ) { return Math.floor(n); }	// Emulates BASIC's INT Funtion
function POW2( n ) { return Math.pow(n,2); }	// Square a number
function POW3( n ) { return Math.pow(n,3); }	// Cube a number
function POW4( n ) { return Math.pow(n,4); }	// Number to the 4th power
function COS( deg ) { 						// Cosine function with degrees as input
	return Math.cos( deg * Math.PI/180  );
}
function noSubmit() { return false; } 		//Prevent form submission

//-----Main Function---------------------------------------------------------------
function calc() {
	if ( firstTime ) { setCurrentYear(); firstTime = false; }
	clearAll();
	if (!valiDate()) { return; }
	var year = getYear();
	//Main Calculations started here
	for( var i=1; i<=4; i++ ) { // Loop over 4 events: 1=AE, 2=SS, 3-VE, 4=WS
		calcEquiSol( i, year ); // This routine calculates and displays a single event
	}
} // End calc

//-----Calculate and Display a single event for a single year (Either a Equiniox or Solstice)
// Meeus Astronmical Algorithms Chapter 27
function calcEquiSol( i, year ) {
	var k = i - 1;
	var str;
	var JDE0 = calcInitial( k, year);	// Initial estimate of date of event
	var T = ( JDE0 - 2451545.0) / 36525;
	var W = 35999.373*T - 2.47;
	var dL = 1 + 0.0334*COS(W) + 0.0007*COS(2*W);
	var S = periodic24( T );
	var JDE = JDE0 + ( (0.00001*S) / dL ); 	// This is the answer in Julian Emphemeris Days
	var TDT = fromJDtoUTC( JDE );				// Convert Julian Days to TDT in a Date Object
	var UTC = fromTDTtoUTC( TDT );				// Correct TDT to UTC, both as Date Objects
	
	return UTC.getUTCDate()
} // End calcEquiSol

//-----Calcualte an initial guess as the JD of the Equinox or Solstice of a Given Year
// Meeus Astronmical Algorithms Chapter 27
function calcInitial( k, year ) { // Valid for years 1000 to 3000
	var JDE0=0, Y=(year-2000)/1000;
	switch( k ) {
	  case 0: JDE0 = 2451623.80984 + 365242.37404*Y + 0.05169*POW2(Y) - 0.00411*POW3(Y) - 0.00057*POW4(Y); break;
	  case 1: JDE0 = 2451716.56767 + 365241.62603*Y + 0.00325*POW2(Y) + 0.00888*POW3(Y) - 0.00030*POW4(Y); break;
	  case 2: JDE0 = 2451810.21715 + 365242.01767*Y - 0.11575*POW2(Y) + 0.00337*POW3(Y) + 0.00078*POW4(Y); break;
	  case 3: JDE0 = 2451900.05952 + 365242.74049*Y - 0.06223*POW2(Y) - 0.00823*POW3(Y) + 0.00032*POW4(Y); break;
	}
	return JDE0;
} // End calcInitial

//-----Calculate 24 Periodic Terms----------------------------------------------------
// Meeus Astronmical Algorithms Chapter 27
function periodic24( T ) {
	var A = new Array(485,203,199,182,156,136,77,74,70,58,52,50,45,44,29,18,17,16,14,12,12,12,9,8);
	var B = new Array(324.96,337.23,342.08,27.85,73.14,171.52,222.54,296.72,243.58,119.81,297.17,21.02,
			247.54,325.15,60.93,155.12,288.79,198.04,199.76,95.39,287.11,320.81,227.73,15.45);
	var C = new Array(1934.136,32964.467,20.186,445267.112,45036.886,22518.443,
			65928.934,3034.906,9037.513,33718.147,150.678,2281.226,
			29929.562,31555.956,4443.417,67555.328,4562.452,62894.029,
			31436.921,14577.848,31931.756,34777.259,1222.114,16859.074);
	var S = 0;
	for( var i=0; i<24; i++ ) { S += A[i]*COS( B[i] + (C[i]*T) ); }
	return S;
} 

//-----Correct TDT to UTC----------------------------------------------------------------
//See https://eclipse.gsfc.nasa.gov/SEhelp/deltatpoly2004.html for possibly better corrections
function fromTDTtoUTC( tobj ) {
// from Meeus Astronmical Algroithms Chapter 10
	// Correction lookup table has entry for every even year between TBLfirst and TBLlast
	var TBLfirst = 1620, TBLlast = 2002;	// Range of years in lookup table
	var TBL = new Array(					// Corrections in Seconds
		/*1620*/ 121,112,103, 95, 88,  82, 77, 72, 68, 63,  60, 56, 53, 51, 48,  46, 44, 42, 40, 38,
		/*1660*/  35, 33, 31, 29, 26,  24, 22, 20, 18, 16,  14, 12, 11, 10,  9,   8,  7,  7,  7,  7,
		/*1700*/   7,  7,  8,  8,  9,   9,  9,  9,  9, 10,  10, 10, 10, 10, 10,  10, 10, 11, 11, 11,
		/*1740*/  11, 11, 12, 12, 12,  12, 13, 13, 13, 14,  14, 14, 14, 15, 15,  15, 15, 15, 16, 16,
		/*1780*/  16, 16, 16, 16, 16,  16, 15, 15, 14, 13,  
		/*1800*/ 13.1, 12.5, 12.2, 12.0, 12.0,  12.0, 12.0, 12.0, 12.0, 11.9,  11.6, 11.0, 10.2,  9.2,  8.2,
		/*1830*/  7.1,  6.2,  5.6,  5.4,  5.3,   5.4,  5.6,  5.9,  6.2,  6.5,   6.8,  7.1,  7.3,  7.5,  7.6,
		/*1860*/  7.7,  7.3,  6.2,  5.2,  2.7,   1.4, -1.2, -2.8, -3.8, -4.8,  -5.5, -5.3, -5.6, -5.7, -5.9,
		/*1890*/ -6.0, -6.3, -6.5, -6.2, -4.7,  -2.8, -0.1,  2.6,  5.3,  7.7,  10.4, 13.3, 16.0, 18.2, 20.2,
		/*1920*/ 21.1, 22.4, 23.5, 23.8, 24.3,  24.0, 23.9, 23.9, 23.7, 24.0,  24.3, 25.3, 26.2, 27.3, 28.2,
		/*1950*/ 29.1, 30.0, 30.7, 31.4, 32.2,  33.1, 34.0, 35.0, 36.5, 38.3,  40.2, 42.2, 44.5, 46.5, 48.5,
		/*1980*/ 50.5, 52.5, 53.8, 54.9, 55.8,  56.9, 58.3, 60.0, 61.6, 63.0,  63.8, 64.3); /*2002 last entry*/
		// Values for Delta T for 2000 thru 2002 from NASA
	var deltaT = 0; // deltaT = TDT - UTC (in Seconds)
	var Year = tobj.getUTCFullYear();
	var t = (Year - 2000) / 100;	// Centuries from the epoch 2000.0
	
	if ( Year >= TBLfirst && Year <= TBLlast ) { // Find correction in table
		if (mod(Year, 2)) { // Odd year - interpolate
			deltaT = ( TBL[(Year-TBLfirst-1)/2] + TBL[(Year-TBLfirst+1)/2] ) / 2;
		} else { // Even year - direct table lookup
			deltaT = TBL[(Year-TBLfirst)/2];
		}
	} else if( Year < 948) { 
		deltaT = 2177 + 497*t + 44.1*POW2(t);
	} else if( Year >=948) {
		deltaT =  102 + 102*t + 25.3*POW2(t);
		if (Year>=2000 && Year <=2100) { // Special correction to avoid discontinurity in 2000
			deltaT += 0.37 * ( Year - 2100 );
		}
	} else { alert("Error: TDT to UTC correction not computed"); }
	return( new Date( tobj.getTime() - (deltaT*1000) ) ); // JavaScript native time is in milliseonds
} // End fromTDTtoUTC

//-----Julian Date to UTC Date Object----------------------------------------------------
// Meeus Astronmical Algorithms Chapter 7 
function fromJDtoUTC( JD ){
	// JD = Julian Date, possible with fractional days
	// Output is a JavaScript UTC Date Object
	var A, alpha;
	var Z = INT( JD + 0.5 ); // Integer JD's
	var F = (JD + 0.5) - Z;	 // Fractional JD's
	/*
	if (Z < 2299161) { A = Z; }
	else {*/
	alpha = INT( (Z-1867216.25) / 36524.25 );
	A = Z + 1 + alpha - INT( alpha / 4 );
	//}
	var B = A + 1524;
	var C = INT( (B-122.1) / 365.25 );
	var D = INT( 365.25*C );
	var E = INT( ( B-D )/30.6001 );
	var DT = B - D - INT(30.6001*E) + F;	// Day of Month with decimals for time
	var Mon = E - (E<13.5?1:13);			// Month Number
	var Yr  = C - (Mon>2.5?4716:4715);		// Year    
	var Day = INT( DT ); 					// Day of Month without decimals for time
	var H = 24*(DT - Day);					// Hours and fractional hours 
	var Hr = INT( H ); 						// Integer Hours
	var M = 60*(H - Hr);					// Minutes and fractional minutes
	var Min = INT( M );						// Integer Minutes
	var Sec = INT( 60*(M-Min) );			// Integer Seconds (Milliseconds discarded)
	//Create and set a JavaScript Date Object and return it
	var theDate = new Date(0);
	theDate.setUTCFullYear(Yr, Mon-1, Day);
	theDate.setUTCHours(Hr, Min, Sec);
	return( theDate );
}
// --------

function getFirstDayLRM(year) {
	// var equinoxDate = new Date(Date.UTC(year, 2, calcEquiSol(1, year)))
	var equinoxDate = new Date(Date.UTC(year, 2, 20))
	equinoxDate.setFullYear(year)
	
	return new Date(equinoxDate - getWeekdayLRM(equinoxDate) * 86400000)
}

function calcDateLRM(date) {
	var year = date.getFullYear()
	var firstDay = getFirstDayLRM(year)
	
	if (date < firstDay) {
		year = year - 1
		firstDay = getFirstDayLRM(year)
	}
	
	var doy = Math.floor((date - firstDay) / 86400000)
	
	var quarterNo = Math.floor(doy / 91)
	var doq = doy % 91
	
	var woq = Math.floor(doq / 7)
	var woy = quarterNo*91 + woq
	var dow = doq % 7
	
	// convert raw data to month and day here
	var month = (quarterNo + 1)*3 - (woq < 9) - (woq < 5)
	var day = doq - 35*(woq > 4) - 28*(woq > 8) + 1 + 28*(month == 13)
	year = year + 1213
	
	var suffix = 0;
	if (year < 1) {year = (Math.abs(year)+1); suffix = 1}
	
	return [day, month-1, year, suffix]
}

// --- NOELLASTANI ---
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

function calcDateNOE(date, natscr = false) {
	// 6 days, 6 weeks, 6 months per year since january 1st 2005

	var epoch = new Date(Date.UTC(2005, 0, 1))
	var dayNumber = Math.floor((date - epoch) / 86400000)
	
	var year = Math.floor(dayNumber / 216) + 1
	var weekTotal = Math.floor(dayNumber / 6)
	var doy = mod(dayNumber, 216)
	
	var month = Math.floor(doy / 36)
	var week = mod(weekTotal, 6)
	var day = mod(doy, 6)
	
	var dayNames = ["Mirtai", "Sekretai", "Ventita", "Warahai", "Desimatai", "Rahatai"]
	var dayNamesW6 = ["Mirdsune", "Sekrune", "Awa Dsune", "Ape Dsune", "Repo", "Phesti"]
	var weekNames = ["Miraha", "Sekra", "Druraha", "Deuxha", "Menya", "Dsune"]
	var monthNames = ["Nèlè", "Britani", "Phrankani", "Doidse", "Yalaji", "Suomi"]
	
	if (natscr) {
		var dayNames = ["\\Mi'rtai", "\\Sekre'tai'", "\\Ventitë'", "\\Warahai'", "\\Desimatai", "\\Rhahatai"]
		var dayNamesW6 = ["\\Mirdsu'ne", "\\Sekrune", "\\Awa'  \\Dsune", "\\Ape'  \\Dsune", "\\Repo", "\\Phesti"]
		var weekNames = ["\\Miraha", "\\Sekra", "\\Drhuraha'", "\\Deux'ha", "\\Menya", "\\Dsune"]
		var monthNames = ["\\Nëlë", "\\Britani", "\\Phrankani", "\\Doidse", "\\Yalaji", "\\Suomi"]
	}
	
	var dayN = dayNames;
	if (week == 5) {dayN = dayNamesW6}
	
	if (year < 1) {
		if (natscr) {
			year = (Math.abs(year)+ 1) + "  \\ANC" //bijectiveString(Math.abs(year)+ 1, 6) + " ANC"
		} else {
			year = (Math.abs(year)+ 1)+ " BNC"
		}
	} 
	
	return [dayN[day], weekNames[week], monthNames[month], year]
}

// --- WEST NOELLASTANI ---

function isLeapWNL(year) {
	return mod((year * 699 + 1545), 3200) < 699
}

function getYearLengthWNL(year) {
	return 360 + 24 * isLeapWNL(year)
}

function getNumberWNL(x) {
	number = bijectiveString(x, 6)
	convstring = "";
	
	var digitsWNL = ["", "<img class='glyph' src='./nag/1.svg'/>", "<img class='glyph' src='./nag/2.svg'/>", "<img class='glyph' src='./nag/3.svg'/>", "<img class='glyph' src='./nag/4.svg'/>", "<img class='glyph' src='./nag/5.svg'/>", "<img class='glyph' src='./nag/6.svg'/>"]
	
	for (var i = 0; i < number.length; i++) {
		convstring += digitsWNL[number[i]]
	}
	
	return convstring
}

function calcDateWNL(date, natscr = false) {
	var epoch = new Date(Date.UTC(2005, 0, 1))
	var dayNumber = Math.floor((date - epoch) / 86400000) + 1
	
	// console.log(dayNumber)
	
	var day = mod(dayNumber-1, 6)
	var month = 0
	
	if (dayNumber > 0) {
		var yearNum = 1;
		var totalDays = 0;
		while (true) {
			// console.log(yearNum + ": " + getYearLengthWNL(yearNum))
			if (totalDays + getYearLengthWNL(yearNum) > dayNumber) break;
			totalDays = totalDays + getYearLengthWNL(yearNum);
			yearNum = yearNum + 1;
		}
	} else {
		var yearNum = 1;
		var totalDays = 0;
		while (true) {
			// console.log(yearNum + ": " + getYearLengthWNL(yearNum))
			yearNum = yearNum - 1;
			totalDays = totalDays - getYearLengthWNL(yearNum);
			if (totalDays < dayNumber) break;
		}
	}
	
	
	if ((dayNumber - totalDays) == 0) {
		if (dayNumber > 0) {
			yearNum = yearNum - 1;
		}
	}
	
	var dayYear = dayNumber - totalDays - 1;
	if (dayYear == -1) {dayYear = getYearLengthWNL(yearNum) - 1}
	
	var month = Math.floor(dayYear / 24)
	var week = mod(Math.floor(dayYear / 6), 4)
	
	var era = 5
	if (dayNumber < -41410) {era = 0}
	if (dayNumber >= -41410 && dayNumber < -24651) {era = 1}
	if (dayNumber >= -24651 && dayNumber < -8280) {era = 2}
	if (dayNumber >= -8280 && dayNumber < -1826) {era = 3}
	if (dayNumber >= -1826 && dayNumber < 1) {era = 4}
	if (dayNumber >= 6910) {era = 6}
	
	var suffix = 0
	if (yearNum < 1) {yearNum = (Math.abs(yearNum)+1);} //suffix = 1}
	
	return [day, week, month, yearNum, suffix, era]
}

// --- ALLOTI ---

function getWeekdayALL(date) {
	return mod((Math.floor(date.getTime()/86400000) + 2440589), 6)
}

function isLeapALL(year) {
	if ((0 == mod(year, 4)) && (0 != mod(year, 100)) || (0 == mod(year, 400))) {
		return true
	} else {
		return false
	}
}

function calcDateALL(date) {
	var epoch;
	if ((date.getUTCFullYear() < 100) && (date.getUTCFullYear() > -1)) {
		epoch = new Date(String(date.getUTCFullYear()).padStart(4, '0') + '-07-29T00:00:00Z')
	} else {
		epoch = new Date(Date.UTC(date.getUTCFullYear(), 6, 29))
	};
	
	if (Math.floor((date - epoch) / 86400000) < 0) {
		if ((date.getUTCFullYear() - 1 < 100) && (date.getUTCFullYear() - 1 > -1)) {
		epoch = new Date(String(date.getUTCFullYear() - 1).padStart(4, '0') + '-07-29T00:00:00Z')
	} else {
		epoch = new Date(Date.UTC(date.getUTCFullYear() - 1, 6, 29))
		};
	}
	
	var dayNumber = Math.floor((date - epoch) / 86400000)
	
	var weekday = getWeekdayALL(date)
	var day = 0
	var month = 0
	var year = epoch.getUTCFullYear() - 730
	
	var leap = isLeapALL(epoch.getUTCFullYear() + 1)
	
	var monthDays = [0, 36 + leap, 72 + leap, 108 + leap, 144 + leap, 180 + leap, 217 + leap, 254 + leap, 291 + leap, 328 + leap, 999];
	
	while (true) {
		if (dayNumber >= monthDays[month] && dayNumber < monthDays[month+1]) break;
		month = month + 1;
	}
	// console.log (epoch)
	// console.log (dayNumber)
	
	var day = dayNumber - monthDays[month] + 1
	
	var weekdayNames = ["Avarav", "Rav", "Ostav", "Elnav", "Kanav", "Liav"]
	var monthNames = ["Ujore", "Erae", "Tosote", "Lenone", "Ankane", "Solaune", "Ilaune", "Daunene", "Esefe", "Onisime"]
	
	if (year < 1) {year = (Math.abs(year)+1) + " BT"}
	
	return [weekdayNames[weekday], day, monthNames[month], year]
}

// --- SUNTERIA ---

function numberSUN(x, iter = 0) {
	var number = x
	var numberString = ""
	
	if (iter > 0 && x == 0) {return 0}
	
	var parseNum = [numberSUN(Math.floor(x / 1000), iter + 1), Math.floor(x / 100) % 10, Math.floor(x / 10) % 10, x % 10]
	
	var digits = [0, "", "", "", "", "", "", "", "", ""]
	
	numberString = (parseNum[0] != 0 ? parseNum[0] + "" : "") + (parseNum[1] != 0 ? digits[parseNum[1]] + "" : "") + (parseNum[2] != 0 ? digits[parseNum[2]] + "" : "") + (parseNum[3] != 0 ? digits[parseNum[3]] : "")
	if (iter > 0) {return numberString}
	
	if (numberString.slice(0, 1) == "" && numberString.length > 1) {numberString = numberString.slice(1)}
	
	return "<text style=\"border-top-width: 1.75px; padding-top: 2.5px; border-top-style: solid;\">" + numberString + "</text>"
}

function isFatSUN(year) {
	return (mod(year, 5) == 0)
}

function isLeapSUN(year) {
	return (mod(year, 19) == 0 || mod(year, 19) == 3 || mod(year, 19) == 6 || mod(year, 19) == 8 || mod(year, 19) == 11 || mod(year, 19) == 14 || mod(year, 19) == 17)
}

function getYearLengthSUN(year) {
	return 354 + isFatSUN(year) + 30 * isLeapSUN(year)
}

function calcDateSUN(date) {
	var epoch = new Date(Date.UTC(-1126, 11, 9))
	// var epoch = new Date(Date.UTC(-1127, 6, 1))
	var dayNumber = Math.floor((date - epoch) / 86400000) + 1
	
	if (dayNumber > 0) {
		var yearNum = 1;
		var totalDays = 0;
		while (true) {
			// console.log(yearNum + ": " + getYearLengthSUN(yearNum))
			
			if (totalDays + getYearLengthSUN(yearNum) > dayNumber) break;
			totalDays = totalDays + getYearLengthSUN(yearNum);
			yearNum = yearNum + 1;
		}
	} else {
		var yearNum = 1;
		var totalDays = 0;
		while (true) {
			// console.log(yearNum + ": " + getYearLengthSUN(yearNum))
			yearNum = yearNum - 1;
			totalDays = totalDays - getYearLengthSUN(yearNum);
			if (totalDays < dayNumber) break;
		}
	}
	
	
	if ((dayNumber - totalDays) == 0) {
		if (dayNumber > 0) {
			yearNum = yearNum - 1;
		}
	}
	
	var day = 0
	var month = 0
	
	var leap = isFatSUN(yearNum)
	
	var monthDays = [0, 30, 59 + leap, 89  + leap, 118 + leap, 148 + leap, 177 + leap, 207 + leap, 236 + leap, 266 + leap, 295 + leap, 325 + leap, 354 + leap, 999];
	
	var dayYear = dayNumber - totalDays - 1;
	
	if (dayYear == -1) {dayYear = getYearLengthSUN(yearNum) - 1}
	
	// console.log(dayYear)
	
	if (dayYear > 0) {
		while (true) {
			// console.log(month)
			if (dayYear >= monthDays[month] && dayYear < monthDays[month+1]) break;
			month = month + 1;
			
		}
	}
	
	// console.log (dayNumber)
	var day = dayYear - monthDays[month] + 1
	
	var suffix = ""
	
	if (yearNum < 1) {yearNum = (Math.abs(yearNum)+1); var suffix = " IPT"}
	
	return [day, month, yearNum, suffix]
}

// -- RANGEI

function calcDateRAN(date) {
	var year = date.getUTCFullYear()
	var epoch = new Date(Date.UTC(year, 11, calcEquiSol(4, year), 12, 0, 0))
	epoch.setUTCFullYear(year)
	
	var dayNumber = Math.floor((date - epoch) / 86400000)
	
	if (dayNumber < 0) {
		year = date.getUTCFullYear() - 1
		epoch = new Date(Date.UTC(year, 11, calcEquiSol(4, year), 12, 0, 0))
		epoch.setUTCFullYear(year)
		
		dayNumber = Math.floor((date - epoch) / 86400000)
	}
	
	var day = 0
	var month = 0
	
	var nextEpoch = new Date(Date.UTC(year+1, 11, calcEquiSol(4, year+1), 12, 0, 0))
	nextEpoch.setUTCFullYear(year+1)
	var leap = Math.floor((nextEpoch - epoch) / 86400000) - 365
	
	var monthDays = [0, 1 + leap, 92 + leap, 183 + leap, 274 + leap, 999];
	
	if (dayNumber >= 0) {
		while (true) {
			if (dayNumber >= monthDays[month] && dayNumber < monthDays[month+1]) break;
			month = month + 1;
			
		}
	}
	
	var day = dayNumber - monthDays[month] + 1
	
	var monthNames = ["Jaucoiklyn", "Dèž", "Raš", "Zìnd", "Dìt"]
	var monthName = monthNames[month]
	
	var yearNum = year + 1
	var suffix = ""
	
	if (yearNum < 1) {yearNum = (Math.abs(yearNum)+1); var suffix = " BE"}
	
	if (day == 1 && month == 0) {day = ""}
	if (day == 2 && month == 0) {day = ""; monthName = "Sècoik"}
	
	return [day, monthName, yearNum, suffix]
}

// -- MALLIA

function getWeekdayMAL(date) {
	return mod((Math.floor(date.getTime()/86400000) + 2440591), 6)
}

function isLeapMAL(year) {
	return isLeapALL(year)
}

function calcDateMAL(date) {
	var epoch;
	if ((date.getUTCFullYear() < 100) && (date.getUTCFullYear() > -1)) {
		epoch = new Date(String(date.getUTCFullYear()).padStart(4, '0') + '-06-02T00:00:00Z')
	} else {
		epoch = new Date(Date.UTC(date.getUTCFullYear(), 5, 2))
	};
	
	if (Math.floor((date - epoch) / 86400000) < 0) {
		if ((date.getUTCFullYear() - 1 < 100) && (date.getUTCFullYear() - 1 > -1)) {
		epoch = new Date(String(date.getUTCFullYear() - 1).padStart(4, '0') + '-06-02T00:00:00Z')
	} else {
		epoch = new Date(Date.UTC(date.getUTCFullYear() - 1, 5, 2))
		};
	}
	
	var dayNumber = Math.floor((date - epoch) / 86400000)
	
	var weekday = getWeekdayMAL(date)
	var day = 0
	var month = 0
	var year = epoch.getUTCFullYear() + 163
	
	var leap = isLeapMAL(epoch.getUTCFullYear() + 1)
	
	var monthDays = [0, 40, 80, 121, 162, 203 + leap, 244 + leap, 285 + leap, 325 + leap, 999];
	
	while (true) {
		if (dayNumber >= monthDays[month] && dayNumber < monthDays[month+1]) break;
		month = month + 1;
	}
	
	var day = dayNumber - monthDays[month] + 1
	
	var weekdayNames = ["Oneday", "Twoday", "Threeday", "Fourday", "Fiveday", "Sixday"]
	var monthNames = ["Dry I", "Dry II", "Dry III", "Rain I", "Rain II", "Rain III", "Harvest I", "Harvest II", "Harvest III"]
	
	if (year < 1) {year = (Math.abs(year)+1) + " BE"}
	
	return [weekdayNames[weekday], day, monthNames[month], year]
}

// --- CRING ---

function romanNumCRG(int) {
  let roman = '';

  roman +=  'M'.repeat(int / 1000);  int %= 1000; 
  roman += 'CM'.repeat(int / 900);   int %= 900; 
  roman +=  'D'.repeat(int / 500);   int %= 500;  
  roman += 'CD'.repeat(int / 400);   int %= 400;
  roman +=  'C'.repeat(int / 100);   int %= 100;
  roman += 'XC'.repeat(int / 90);    int %= 90;
  roman +=  'L'.repeat(int / 50);    int %= 50;
  roman += 'XL'.repeat(int / 40);    int %= 40;
  roman +=  'X'.repeat(int / 10);    int %= 10;
  roman += 'IX'.repeat(int / 9);     int %= 9;
  roman +=  'V'.repeat(int / 5);     int %= 5;
  roman += 'IV'.repeat(int / 4);     int %= 4;
  roman +=  'I'.repeat(int);

  return roman;
}

function complementCRG(number) {
	if (number >= 0) {return number}
	
	number = ((number+1) * -1).toString()
	
	number = number.split('')
	for (let i=0 ; i < number.length; i++ ){        
		if (number[i] != '.'){
			number[i] = String(9 - Number(number[i]) + 0);
		 }
	}
	
	if (number[0] == "9") {number[0] = ""}
	
	number = "<text style='text-decoration-line: overline;'>9</text>" + number.join("")
	return number
}

function calcDateCRG(date) {
	var epoch = new Date(Date.UTC(2005, 0, 1))
	var dayNumber = Math.floor((date - epoch) / 86400000) + 1
	
	var day = mod(dayNumber-1, 24) + 1
	var month = 0
	
	if (dayNumber > 0) {
		var yearNum = 1;
		var totalDays = 0;
		while (true) {
			// console.log(yearNum + ": " + getYearLengthWNL(yearNum))
			if (totalDays + getYearLengthWNL(yearNum) > dayNumber) break;
			totalDays = totalDays + getYearLengthWNL(yearNum);
			yearNum = yearNum + 1;
		}
	} else {
		var yearNum = 1;
		var totalDays = 0;
		while (true) {
			// console.log(yearNum + ": " + getYearLengthWNL(yearNum))
			yearNum = yearNum - 1;
			totalDays = totalDays - getYearLengthWNL(yearNum);
			if (totalDays < dayNumber) break;
		}
	}
	
	
	if ((dayNumber - totalDays) == 0) {
		if (dayNumber > 0) {
			yearNum = yearNum - 1;
		}
	}
	
	var dayYear = dayNumber - totalDays - 1;
	if (dayYear == -1) {dayYear = getYearLengthWNL(yearNum) - 1}
	
	var relWeek = mod(Math.floor((dayNumber-1) / 6), 6)
	
	var month = Math.floor(dayYear / 24)
	
	var monthNamesCRG = ["Ļiuš Tliulg", "Koučej", "Ðauňk", "Faulg", "Mouls", "Tliuzz", "Kriuň", "Am Ndaumm", "Ciužž", "Riunt", "Koun", "Haukej", "Żżauňk", "Vvaunt", "Staužej", "Ļiuš Soulg"] //["Ļoeš Tloelg", "Kuočäj", "Ðoaňk", "Foalg", "Muols", "Tloezz", "Kroeň", "Am Ndoamm", "Coežž", "Roent", "Kuon", "Hoakäj", "Żżoaňk", "Vvoant", "Stoažej", "Ļoeš Suolg"]
	
	return [(relWeek == 5 ? romanNumCRG(day) : day), monthNamesCRG[month], complementCRG(yearNum)]
}

// KZMR

function isLeapKZM(year) {
	return (mod(year, 17) == 0 || mod(year, 17) == 4 || mod(year, 17) == 8 || mod(year, 17) == 13)
}

function getYearLengthKZM(year) {
	return 365 + isLeapKZM(year)
}

function calcDateKZM(date) {
	var d = date;
	var dayNumber = Math.floor(d.getTime() / 86400000) - 12908
	
	//var dayYear = mod(dayNumber, 365)
	//var year = Math.floor(dayNumber / 365) + 1892
	
	if (dayNumber > 0) {
		var yearNum = 1;
		var totalDays = 0;
		while (true) {
			if (totalDays + getYearLengthKZM(yearNum) > dayNumber) break;
			totalDays = totalDays + getYearLengthKZM(yearNum);
			yearNum = yearNum + 1;
		}
	} else {
		var yearNum = 1;
		var totalDays = 0;
		while (true) {
			yearNum = yearNum - 1;
			totalDays = totalDays - getYearLengthKZM(yearNum);
			if (totalDays < dayNumber) break;
		}
	}
	
	
	if ((dayNumber - totalDays) == 0) {
		if (dayNumber > 0) {
			yearNum = yearNum - 1;
		}
	}
	
	var year = yearNum
	
	var dayYear = dayNumber - totalDays - 1;
	
	var lunarDoy = mod(dayNumber, 148)
	
	var weekday = mod(dayNumber + 3, 9)
	
	var monthDays = [0, 46, 47, 92, 137, 138, 183, 228, 229, 274, 319, 320, 999]
	var monthNames = ["Hškath", "Prsith", "Kpgath", "Hška'sþbhi", "Prsi'sþbhi", "Kpga'sþbhi", "Hškasv", "Prsisv", "Kpgasv", "Hškanrh", "Prsinrh", "Kpganrh", "Ptnaprsithd"]
	
	if (isLeapKZM(year)) {
		monthDays = [0, 46, 48, 93, 138, 139, 184, 229, 230, 275, 320, 321, 999]
	}

	var month = 0
	if (dayYear >= 0) {
		while (true) {
			if (dayYear >= monthDays[month] && dayYear < monthDays[month+1]) break;
			month = month + 1;
		}
	}
	
	var day = dayYear - monthDays[month] + 1
	
	if (mod(month, 3) == 1) {
		if (day == 2) {
			month = 12
		}
		day = ""
	} else if (mod(month, 3) == 0) {
		day = (46 + (month == 0 ? 1 : 0)) - day
	}
	
	var lunarMonthDays = [0, 30, 60, 89, 118, 999]
	var lunarMonthNames = ["Ng Kžri", "Ng Žrxci", "Ng Tšrn", "Ng Hšri", "Ng Hrni"]

	var lunarMonth = 0
	if (lunarDoy >= 0) {
		while (true) {
			if (lunarDoy >= lunarMonthDays[lunarMonth] && lunarDoy < lunarMonthDays[lunarMonth+1]) break;
			lunarMonth = lunarMonth + 1;
		}
	}
	
	var lunarDay = lunarDoy - lunarMonthDays[lunarMonth] + 1
	
	var weekdayNames = ["Ngkahvm", "Bdkuhvm", "Sgrkuhvm", "Spnkahvm", "'Hngrgkahvm", "Tptkahvm", "Brxskahvm", "'Snšrkahvm", "'Tnrhkihvm"]
	
	//return [-1, day, monthNames[month], year + 1214]
	return [weekdayNames[weekday], day + " " + monthNames[month], lunarDay + " " + lunarMonthNames[lunarMonth], year]
}