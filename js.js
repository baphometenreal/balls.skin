function loadLightMode() {
        const theme = document.querySelector("#theme-link");
        if (localStorage.theme == "light") {
          theme.href = "/cssl.css"
        } else if (localStorage.theme == "dark") {
          theme.href = "/css.css"
        } else if (localStorage.theme == "blood") {
          theme.href = "/cssb.css"
        } else if (localStorage.theme == "piss") {
          theme.href = "/cssp.css"
        } else if (localStorage.theme == "holly") {
          theme.href = "/cssh.css"
        } else {
          theme.href = "/css.css" 
        }
}
if (localStorage.lang == null) {localStorage.lang = "en"}
async function loadLanguage(){
  const response = await fetch("/languages/" + localStorage.lang + ".json")
  window.lang = await response.json()
  
  const responseUndf = await fetch("/languages/undefined.json")
  window.undf = await responseUndf.json()
  
  const tags = document.getElementsByClassName("lang");
  for (let i = 0; i < tags.length; i++) {
  tags[i].innerHTML = window.lang[tags[i].id] ?? window.undf[tags[i].id]
  //document.getElementById(tags[i]).innerHTML = window.lang[tags[i]]
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