const input = document.getElementById("text");
var out = input.value;
var mode = document.getElementById("mode").value;

function lower(text) {
    var corrl = { "Ǝ": "ə",
        ":": ".", ";": ",", "¡": "!", "“": "«", "”": "»", "¿": "?",
        "\u{E000}": "\u{E010}", "\u{E001}": "\u{E011}", "\u{E002}": "\u{E012}", "\u{E003}": "\u{E013}", "\u{E004}": "\u{E014}", "\u{E005}": "\u{E015}", "\u{E006}": "\u{E016}", "\u{E007}": "\u{E017}"
    }
    for (const c in corrl) { text = text.replaceAll(c, corrl[c]); }
    text = text.toLowerCase();
    if ( document.getElementById("yij").checked ) { text = text.replaceAll('ĳ', 'y'); } else { text = text.replaceAll('y', 'ĳ'); }
    return text;
}

function upper(text) {
    var corru = { "ə": "Ǝ",
        ".": ":", ",": ";", "!": "¡", "«": "“", "»": "”", "?": "¿",
        "\u{E010}": "\u{E000}", "\u{E011}": "\u{E001}", "\u{E012}": "\u{E002}", "\u{E013}": "\u{E003}", "\u{E014}": "\u{E004}", "\u{E015}": "\u{E005}", "\u{E016}": "\u{E006}", "\u{E017}": "\u{E007}"
    }
    for (const c in corru) { text = text.replaceAll(c, corru[c]); }
    text = text.toUpperCase();
    if ( document.getElementById("yij").checked ) { text = text.replaceAll('Ĳ', 'Y'); } else { text = text.replaceAll('Y', 'Ĳ'); }
    return text;
}

function roman(text) {
    text = lower(text);
    var corrr = { "è": "ə", "î": "ie", "á": "aa", "á": "aa", "ú": "uu",
        "c": "sh", "x": "ch", "k": "c", "ŋ": "ng", "q": "ng",
        "\u{E010}": "‽", "\u{E011}": "ʕʔ", "\u{E012}": "", "\u{E013}": "Ṭ", "\u{E014}": "", "\u{E015}": "Ṿ", "\u{E016}": "Ʒ̣", "\u{E017}": " /j", 
    }
    console.log("here")
    for (const c in corrr) { text = text.replaceAll(c, corrr[c]); }
    if ( document.getElementById("yij").checked ) { text = text.replaceAll('ĳ', 'y'); } else { text = text.replaceAll('y', 'ĳ'); }
    return text
}

function typed() {
    var merge = {"Ŋ": "Q", "ŋ": "q", "È": "Ǝ", "è": "ə", "Ə": "Ǝ"}
    for (const c in merge) { out = out.replaceAll(c, merge[c]); }
    document.getElementById("angular").innerHTML = upper(out);
    document.getElementById("uppertype").innerHTML = upper(out);
    document.getElementById("cursive").innerHTML = lower(out);
    document.getElementById("lowertype").innerHTML = lower(out);
    document.getElementById("roman").innerHTML = roman(out);
}

function ipa() {
    return;
}

function trans() {
    out = input.value.replaceAll(" ", " ​");
    if (mode == "type") { typed(); } else if (mode == "ipa") { ipa(); } else {return;}
}
input.addEventListener('input', () => { trans(); });


