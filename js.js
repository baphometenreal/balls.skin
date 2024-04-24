function loadLightMode() {
        const theme = document.querySelector("#theme-link");
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
        } else {
          theme.href = "/themes/css.css" 
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
  console.log(":haruko:")
});
loadLightMode()