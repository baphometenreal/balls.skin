function massReplace(text, replacements) {
	for (const [key, value] of Object.entries(replacements)) {
		text = text.replace(new RegExp(key, 'g'), value);
	}
	return text;
}

function findSyllables(word) {
	word = word.replace(/([aeiouyæœāēīōūȳ])/g, ".$1");
	word = word.replace(/^(s?)([pbtdckgf])([lrw])\.([aeiouyæœāēīōūȳ])/g, ".$1$2$3$4");
	word = word.replace(/([pbtdckg])([lrw])\.([aeiouyæœāēīōūȳ])/g, ".$1$2$3");
	word = word.replace(/\.([td])l/g, "$1.l");
	word = word.replace(/([pbtdckgfθszxhmnvlrj])\.([aeiouyæœāēīōūȳ])/g, ".$1$2");
	word = word.replace(".", "");
	return word;
}

function markStress(word) {
	word = word.replace(/^([^.]*)([aeiouyæœāēīōūȳ])([^.]*)$/g, "$1$2´$3");
	word = word.replace(/^([^.]*)([aeiouyæœāēīōūȳ])([^.]*)\.([^.]*)$/g, "$1$2´$3.$4");
	word = word.replace(/([aeiouyæœāēīōūȳ])([^.]*)\.([^.]*)([aeiouy])\.([^.]*)$/g, "$1´$2.$3$4.$5");
	word = word.replace(/\.([^.]*)([æœāēīōūȳ])([^.]*)\.([^.]*)$/g, ".$1$2´$3.$4");
	word = word.replace(/\.([^.]*)([aeiouy])([^.]+)\.([^.]*)$/g, ".$1$2´$3.$4");
	word = word.replace(/([aeiouyæœāēīōūȳ])([^.]*)\.([^.]*)\.([^.]*)\´/g, "$1`$2.$3.$4´");
	word = word.replace(/([aeiouyæœāēīōūȳ])([^.]*)\.([^.]*)\.([^.]*)\`/g, "$1`$2.$3.$4`");
	return word;
}

function latinPronouncer() {
	var latinText = document.getElementById("latin").value;
	latinText = latinText.toLowerCase();
	latinText = latinText.split(/\s/);
	for (let i = 0; i < latinText.length; i++) {
		string = latinText[i];
		string = massReplace(string, { "rh" : "r"});
		string = massReplace(string, { "ae" : "æ", "oe" : "œ"});
		string = string.replace(/^i([aeouāēōūæœ])/g, "j$1");
		string = string.replace(/([aeouæœāēōū])i([aeouāēōūæœ])/g, "$1jj$2");
		string = string.replace(/qu([aeiouyæœāēīōūȳ])/g, "kw$1");
		string = string.replace(/gu([aeiouyæœāēīōūȳ])/g, "gw$1");
		string = string.replace(/^su([aeiouyæœāēīōūȳ])/g, "sw$1");
		string = string.replace(/([aeiouyæœāēīōūȳ])z/g, "$1zz");
		string = massReplace(string, { "x" : "cs"});
		string = string.replace(/^cs/g, "z");
		string = massReplace(string, { "ph" : "f" , "th" : "θ" , "ch" : "x"});
		string = string.replace(/^bd/g, "d");
		string = string.replace(/^tm/g, "m");
		string = string.replace(/^[mkg]n/g, "n");
		string = string.replace(/^ps/g, "s");
		string = string.replace(/^[pk]t/g, "t");
		string = string.replace(/^[fx]θ/g, "θ");
		string = string.replace(/([aeo])i([pbtdckgfvθszxhmnlr])/g, "$1ĭ$2");
		string = string.replace(/([aeo])u([pbtdckgfvθszxhmnlr])/g, "$1w$2");
		string = massReplace(string, { "ä" : "a" , "ë" : "e" ,  "ï" : "i" , "ö" : "o" , "ü" : "u"});
		
		string = findSyllables(string);
		string = markStress(string);
		
		latinText[i] = string;
	}
	latinText = latinText.join(" ");
    document.getElementById("output").innerHTML = latinText;
}