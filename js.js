function loadLightMode() {
        const theme = document.querySelector("#theme-link");
		
		if (window.navigator.userAgent.includes("Windows NT 5.0") || window.navigator.userAgent.includes("Windows 2000")) {
          theme.href = "/themes/win2000.css"
		  return
        }
		
        if (localStorage.theme == "light") {
          theme.href = "/themes/flat/css_light.css"
        } else if (localStorage.theme == "dark") {
          theme.href = "/themes/flat/css.css"
        } else if (localStorage.theme == "blood") {
          theme.href = "/themes/flat/css_blood.css"
        } else if (localStorage.theme == "piss") {
          theme.href = "/themes/flat/css_pwee.css"
        } else if (localStorage.theme == "holly") {
          theme.href = "/themes/flat/css_christmas.css"
        } else if (localStorage.theme == "grape") {
          theme.href = "/themes/flat/css_grape.css"
        } else if (localStorage.theme == "tears") {
          theme.href = "/themes/flat/css_tears.css"
        } else if (localStorage.theme == "cunty") {
          theme.href = "/themes/flat/css_cunty.css"
        } else if (localStorage.theme == "darkc") {
          theme.href = "/themes/high contrast/css_dark.css"
        } else if (localStorage.theme == "lightc") {
          theme.href = "/themes/high contrast/css_light.css"
        } else if (localStorage.theme == "chcola") {
          theme.href = "/themes/flat/css_cherrycola.css"
        } else if (localStorage.theme == "studious") {
          theme.href = "/themes/flat/css_studious.css"
        } else if (localStorage.theme == "yomi") {
          theme.href = "/themes/flat/css_yomi.css"
        } else if (localStorage.theme == "mint") {
          theme.href = "/themes/flat/css_mint.css"
        } else if (localStorage.theme == "lcl") {
          theme.href = "/themes/flat/css_lcl.css"
        } else if (localStorage.theme == "croc") {
          theme.href = "/themes/flat/css_croc.css"
        } else if (localStorage.theme == "swamp") {
          theme.href = "/themes/flat/css_swamp.css"
        } else if (localStorage.theme == "dream") {
          theme.href = "/themes/flat/css_dream.css"
        } else if (localStorage.theme == "emma") {
          theme.href = "/themes/gradient/css_emma.css"
        } else if (localStorage.theme == "lake") {
          theme.href = "/themes/flat/css_lake.css"
        } else if (localStorage.theme == "mintc") {
          theme.href = "/themes/flat/css_mintchip.css"
        } else if (localStorage.theme == "purple100") {
          theme.href = "/themes/flat/css_purple100.css"
        } else if (localStorage.theme == "royal") {
          theme.href = "/themes/flat/css_royal.css"
        } else if (localStorage.theme == "sea") {
          theme.href = "/themes/flat/css_sea.css"
        } else if (localStorage.theme == "USA") {
          theme.href = "/themes/flat/css_usa.css"
        } else if (localStorage.theme == "wine") {
          theme.href = "/themes/flat/css_wine.css"
        } else if (localStorage.theme == "ough") {
          theme.href = "/themes/flat/css_ough.css"
        } else if (localStorage.theme == "gdark") {
          theme.href = "/themes/gradient/css.css"
        } else if (localStorage.theme == "gblood") {
          theme.href = "/themes/gradient/css_blood.css"
        } else if (localStorage.theme == "glight") {
          theme.href = "/themes/gradient/css_light.css"
        } else if (localStorage.theme == "gcunty") {
          theme.href = "/themes/gradient/css_cunty.css"
        } else if (localStorage.theme == "gpiss") {
          theme.href = "/themes/gradient/css_pwee.css"
        } else if (localStorage.theme == "gtears") {
          theme.href = "/themes/gradient/css_tears.css"
        } else if (localStorage.theme == "glcl") {
          theme.href = "/themes/gradient/css_lcl.css"
        } else {
          theme.href = "/themes/flat/css.css" 
        }
}

function loadFont() {
	const font = document.querySelector("#font-link");
	
	if (window.navigator.userAgent.includes("Windows NT 5.0") || window.navigator.userAgent.includes("Windows 2000")) {
          font.href = "/themes/font/win2000.css"
		  return
        }
	
	if (localStorage.font == "default") {
		font.href = "/themes/font/defaultfont.css"
		console.log("default") 
	} else if (localStorage.font == "dyslexic") {
		font.href = "/themes/font/dyslexicfont.css"
		console.log("dyslexic") 
	} else if (localStorage.font == "comic") {
		font.href = "/themes/font/comicfont.css"
		console.log("comic") 
	} else if (localStorage.font == "noto") {
		font.href = "/themes/font/noto.css"
		console.log("noto") 
	} else {
		font.href = "/themes/font/defaultfont.css"
		console.log("default") 
	}
	
}

if (localStorage.lang == null) {localStorage.lang = "en"}
async function loadLanguage(){
  const response = await fetch("/languages/" + localStorage.lang + ".json")
  window.lang = await response.json()
  

  // const responseUndf = await fetch("/languages/undefined.json")
  // window.undf = await responseUndf.json()
  
  const tags = document.getElementsByClassName("lang");
  for (let i = 0; i < tags.length; i++) {
	if (Object.keys(window.lang).includes(tags[i].id)) {
		tags[i].innerHTML = window.lang[tags[i].id] // ?? window.undf[tags[i].id]
	}
  //document.getElementById(tags[i]).innerHTML = window.lang[tags[i]]
  }
    if (Object.keys(window.lang).includes("themebasic")) {
	document.getElementById("themebasic").label = window.lang["themebasic"]
  }
    if (Object.keys(window.lang).includes("themeaesthetic")) {
	document.getElementById("themeaesthetic").label = window.lang["themeaesthetic"]
  }
    if (Object.keys(window.lang).includes("themenovelty")) {
	document.getElementById("themenovelty").label = window.lang["themenovelty"]
  }
    if (Object.keys(window.lang).includes("finishedtranslations")) {
	document.getElementById("finishedtranslations").label = window.lang["finishedtranslations"]
  }
    if (Object.keys(window.lang).includes("unfinishedtranslations")) {
	document.getElementById("unfinishedtranslations").label = window.lang["unfinishedtranslations"]
  }
  /*
  return fetch("/languages/" + localStorage.lang + ".json")
    .then(response => response.json())
    .then(json => window.lang = json)
    .then(()=>{
      const tags = document.getElementsByClassName("lang");
      for (let i = 0; i < tags.length; i++) {
      tags[i].innerHTML = window.lang[tags[i].id]
      //document.getElementById(tags[i]).innerHTML = window.lang[tags[i]]
      }})
  */
}
window.addEventListener("storage", function(e) {
  if (e.key === "theme") {try {loadLightMode()} catch(error){}}
  if (e.key === "lang") {try {loadLanguage()} catch(error){}}
  if (e.key === "font") {try {loadFont()} catch(error){}}
  console.log(":haruko:")
});
loadLightMode()
loadFont()