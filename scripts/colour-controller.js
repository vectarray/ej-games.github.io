function setupColours() {

	var newButton = document.createElement("b");
	newButton.innerHTML = "Colour Scheme:";
	if(document.getElementById("sidebar")) {
		document.getElementById("sidebar").appendChild(newButton);
	}

    ChangeColours(getCookie("colour"));

    var newDropdown = document.createElement("select");
	newDropdown.id = "colour-dropdown";
	if(document.getElementById("sidebar")) {
		document.getElementById("sidebar").appendChild(newDropdown);
	}
	var colourArrangements = ["dark", "light"];
	var colourDisplayNames = {
		"default": "Default",
		"dark": "Dark",
		"red": "Red",
		"aqua": "Aqua",
		"light": "Light"
	}
	for(var item of colourArrangements) {
		var newOption = document.createElement("option");
		newOption.value = colourDisplayNames[item];
		newOption.innerHTML = colourDisplayNames[item];
		if(item == getCookie("colour")) newOption.selected = "selected";
		newDropdown.appendChild(newOption);
	}
	newDropdown.onchange = function() {
		var newColour = newDropdown.options[newDropdown.options.selectedIndex].text.toLowerCase().replace(" ", "");
		ChangeColours(newColour);
		//CreateNotification("Colours set!", "You've picked the " + newDropdown.options[newDropdown.options.selectedIndex].text + " colour scheme.", "https://ejgames.co.uk/sounds/clickbutton.wav")
		/*newDropdown.disabled = true;
		setTimeout(function() {
			newDropdown.disabled = false;
		}, 1000)*/
	}
}


function UpdateColour() {

	if(getCookie("colour") != "") {
		try {
			var colourScheme = colours[getCookie("colour")];
			
			var root = document.querySelector(":root");
			root.style.setProperty("--background", colourScheme.background);
			root.style.setProperty("--title", colourScheme.title);
			root.style.setProperty("--sidebar", colourScheme.sidebar);
			root.style.setProperty("--h2", colourScheme.h2);
			root.style.setProperty("--body", colourScheme.body);
			root.style.setProperty("--shadow", colourScheme.shadow);
			root.style.setProperty("--elementBG", colourScheme.elementBG);
			root.style.setProperty("--elementHover", colourScheme.elementHover);
			root.style.setProperty("--elementBrighter", colourScheme.elementBrighter)
			root.style.setProperty("--green", colourScheme.green);

			var ua = navigator.userAgent.toLowerCase();
			if(ua.indexOf("iphone") > -1 || ua.indexOf("android") > -1 || ua.indexOf("windows phone") > -1) {
				root.style.setProperty("--sidebar", colourScheme.elementBG);
			}

			for(var style of document.getElementsByTagName("link")) {
				var possibleLinks = ["https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/github-dark-dimmed.min.css",
					"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/github.min.css"]
				if(style.rel == "stylesheet" && possibleLinks.indexOf(style.href) > -1) {
					style.remove();
				}
			}

			if(colourScheme.background == "#ffffff") {
				createStyle("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/github.min.css");
			}
			else {
				createStyle("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/github-dark-dimmed.min.css");
			}

			hljs.highlightAll();
			
			setTimeout(function() {
				document.getElementsByTagName("html")[0].style.transition = "background 0.5s";
				for(var item of document.getElementsByTagName("h2")) {
					item.style.transition = "color 0.5s";
				}
				for(var item of document.getElementsByClassName("URLbuttonText")) {
					item.style.transition = "color 0.5s";
				}
				var changeToTitle = [
					document.getElementsByClassName("card"), document.getElementsByClassName("whole-width-card"),
					document.getElementsByClassName("small-card"), document.getElementsByClassName("smaller-card")
				]
				for(var item of changeToTitle) {
					for(var toChange of item) {
						toChange.style.transition = "background-color 0.5s";
					}
				}
				for(var item of document.getElementsByClassName("searchBar")) {
					item.style.transition = "background-color 0.5s";
				}
				for(var item of document.getElementsByClassName("searchItems")) {
					for(var searchItem of item.getElementsByTagName("a")) {
						searchItem.style.transition = "color 0.5s";
					}
				}
			}, 500);
		}
		catch {
			setTimeout(UpdateColour, 50)
		}
	}
	else {
		ChangeColours("dark")
	}
}


function ChangeColours(newColour) {
	setCookie("colour", newColour, 730);
	UpdateColour();
}