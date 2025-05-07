function loadAds() {
	var adList = [
		{"img": "emma-furnace.png", "link": ""},
		{"img": "inserad.png", "link": ""},
		{"img": "bloodspire.jpg", "link": ""}
	]

	var randomSel = Math.floor(Math.random() * adList.length)
	document.querySelector("#ad").src = "./limi/" + adList[randomSel]["img"]

	var randomSel1 = Math.floor(Math.random() * adList.length)
	document.querySelector("#ad1").src = "./limi/" + adList[randomSel1]["img"]
}

loadAds()