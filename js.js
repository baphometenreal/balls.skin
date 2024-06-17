function loadLightMode() {
        const theme = document.querySelector("#theme-link");
		
		if (window.navigator.userAgent.includes("Windows NT 5.0") || window.navigator.userAgent.includes("Windows 2000")) {
          theme.href = "/themes/win2000.css"
		  return
        }
		
        if (localStorage.theme == "light") {
          theme.href = "/themes/css_light.css"
        } else if (localStorage.theme == "dark") {
          theme.href = "/themes/css.css"
        } else if (localStorage.theme == "blood") {
          theme.href = "/themes/css_blood.css"
        } else if (localStorage.theme == "piss") {
          theme.href = "/themes/css_pwee.css"
        } else if (localStorage.theme == "holly") {
          theme.href = "/themes/css_christmas.css"
        } else if (localStorage.theme == "grape") {
          theme.href = "/themes/css_grape.css"
        } else if (localStorage.theme == "tears") {
          theme.href = "/themes/css_tears.css"
        } else if (localStorage.theme == "cunty") {
          theme.href = "/themes/css_cunty.css"
        } else if (localStorage.theme == "darkc") {
          theme.href = "/themes/high contrast/css_dark.css"
        } else if (localStorage.theme == "lightc") {
          theme.href = "/themes/high contrast/css_light.css"
        } else if (localStorage.theme == "chcola") {
          theme.href = "/themes/css_cherrycola.css"
        } else if (localStorage.theme == "studious") {
          theme.href = "/themes/css_studious.css"
        } else if (localStorage.theme == "yomi") {
          theme.href = "/themes/css_yomi.css"
        } else if (localStorage.theme == "mint") {
          theme.href = "/themes/css_mint.css"
        } else if (localStorage.theme == "lcl") {
          theme.href = "/themes/css_lcl.css"
        } else if (localStorage.theme == "croc") {
          theme.href = "/themes/css_croc.css"
        } else if (localStorage.theme == "swamp") {
          theme.href = "/themes/css_swamp.css"
        } else if (localStorage.theme == "dream") {
          theme.href = "/themes/css_dream.css"
        } else if (localStorage.theme == "emma") {
          theme.href = "/themes/css_emma.css"
        } else if (localStorage.theme == "lake") {
          theme.href = "/themes/css_lake.css"
        } else if (localStorage.theme == "mintc") {
          theme.href = "/themes/css_mintchip.css"
        } else if (localStorage.theme == "purple100") {
          theme.href = "/themes/css_purple100.css"
        } else if (localStorage.theme == "royal") {
          theme.href = "/themes/css_royal.css"
        } else if (localStorage.theme == "sea") {
          theme.href = "/themes/css_sea.css"
        } else if (localStorage.theme == "USA") {
          theme.href = "/themes/css_usa.css"
        } else if (localStorage.theme == "wine") {
          theme.href = "/themes/css_wine.css"
        } else {
          theme.href = "/themes/css.css" 
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
    if (Object.keys(window.lang).includes("boryaworldlang")) {
	document.getElementById("boryaworldlang").label = window.lang["boryaworldlang"]
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