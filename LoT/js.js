function loadLightMode() {
        const theme = document.querySelector("#theme-link");
        if (localStorage.theme == "light") {
          theme.href = "/LoT/cssl.css"
        } else if (localStorage.theme == "dark") {
          theme.href = "/LoT/css.css"
        } else if (localStorage.theme == "blood") {
          theme.href = "/LoT/cssb.css"
        } else if (localStorage.theme == "piss") {
          theme.href = "/LoT/cssp.css"
        } else if (localStorage.theme == "holly") {
          theme.href = "/LoT/cssh.css"
        } else {
          theme.href = "/LoT/css.css" 
        }
}
window.addEventListener("storage", function(e) {
  if (e.key === "theme") {try {loadLightMode()} catch(error){}}
  console.log(":haruko:")
});
loadLightMode()