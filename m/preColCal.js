// hravily based on Xadrezo's program

function mod(n, m) {
	return ((n % m) + m) % m;
}

function setDate(year, month, day, offset = 0) {
	var date = new Date(Date.UTC(year, month-1, day, 12, 0, 0) + offset)
	date.setUTCFullYear(year)
	
	return date
}

function getEpact(year) {
	var goldenNumber = mod(year, 19) + 1
	
	var epactShift = (year - 1582) * 11
	var saltusLunae = Math.floor((year - 1596)/19)+1
	var solarEq = -1 * (Math.floor(year / 100) - 15) + (Math.floor(year / 400) - 3)
	var lunarEq = Math.floor((year - 1800)/2500) + 1 + Math.floor((year - 2100)/2500) + 1 + Math.floor((year - 2400)/2500) + 1 + Math.floor((year - 2700)/2500) + 1 + Math.floor((year - 3000)/2500) + 1 + Math.floor((year - 3300)/2500) + 1 + Math.floor((year - 3600)/2500) + 1 + Math.floor((year - 3900)/2500) + 1 
	
	var epact = mod(26 + epactShift + saltusLunae + solarEq + lunarEq, 30)
	var special = (epact == 25 && goldenNumber > 11) ? 1 : 0
	
	return [epact, special]
}

function no(x, iter = 0) {
	var number = x
	var numberString = ""
	
	if (iter > 0 && x == 0) {return 0}
	
	var parseNum = [no(Math.floor(x / 1000), iter + 1), Math.floor(x / 100) % 10, Math.floor(x / 10) % 10, x % 10]
	
	var digits = [0, "", "", "", "", "", "", "", "", ""]
	
	numberString = (parseNum[0] != 0 ? parseNum[0] + "" : "") + (parseNum[1] != 0 ? digits[parseNum[1]] + "" : "") + (parseNum[2] != 0 ? digits[parseNum[2]] + "" : "") + (parseNum[3] != 0 ? digits[parseNum[3]] : "")
	if (iter > 0) {return numberString}
	
	if (numberString.slice(0, 1) == "" && numberString.length > 1) {numberString = numberString.slice(1)}
	
	return "<text style=\"border-top-width: 1.75px; padding-top: 2.5px; border-top-style: solid;\">" + numberString + "</text>"
}

function isFat(year) {
	return (mod(year, 5) == 0)
}

function isLeap(year) {
	return (mod(year, 19) == 0 || mod(year, 19) == 3 || mod(year, 19) == 6 || mod(year, 19) == 8 || mod(year, 19) == 11 || mod(year, 19) == 14 || mod(year, 19) == 17)
}

function getYearLength(year) {
	return 354 + isFat(year) + 30 * isLeap(year)
}

function calcDate(date) {
	var epoch = new Date(Date.UTC(-1126, 5, 23))
	// var epoch = new Date(Date.UTC(-1127, 6, 1))
	var dayNumber = Math.floor((date - epoch) / 86400000) + 1
	
	if (dayNumber > 0) {
		var yearNum = 1;
		var totalDays = 0;
		while (true) {
			// console.log(yearNum + ": " + getYearLengthSUN(yearNum))
			
			if (totalDays + getYearLength(yearNum) > dayNumber) break;
			totalDays = totalDays + getYearLength(yearNum);
			yearNum = yearNum + 1;
		}
	} else {
		var yearNum = 1;
		var totalDays = 0;
		while (true) {
			// console.log(yearNum + ": " + getYearLengthSUN(yearNum))
			yearNum = yearNum - 1;
			totalDays = totalDays - getYearLength(yearNum);
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
	
	var leap = isFat(yearNum)
	
	var monthDays = [0, 30, 59 + leap, 89  + leap, 118 + leap, 148 + leap, 177 + leap, 207 + leap, 236 + leap, 266 + leap, 295 + leap, 325 + leap, 354 + leap, 999];
	
	var dayYear = dayNumber - totalDays - 1;
	
	if (dayYear == -1) {dayYear = getYearLength(yearNum) - 1}
	
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
	
	var ponkudoDay = mod(dayNumber - 1, 15)
	
	return [day, month, yearNum, suffix, ponkudoDay]
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
