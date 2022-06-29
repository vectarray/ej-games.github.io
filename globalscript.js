function CheckFormatting()
{
	// window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
	// Script initialisation
	var newScript = document.createElement("script");
	if((window.location.href.indexOf("https://") > -1 || window.location.href.indexOf("http://") > -1) && window.location.href.indexOf("127.0.0.1") < 0) {
		newScript.src = "https://ejgames.co.uk/colours.jsonp";
	}
	else {
		newScript.src = "colours.jsonp";
	}
	document.body.appendChild(newScript);
	if(window.location.href.indexOf("tutorials") > -1) {
		createScript("files/all-words.js");
	}

	createStyle("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css");

	createScript("https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js");


	// Cleaning up & inserting elements
	document.getElementById("title").style.display = "none";
	var newH4 = document.createElement("h4");
	newH4.innerHTML = "Actions";
	var newButton = document.createElement("b");
	newButton.innerHTML = "Colour Scheme:";
	document.getElementById("sidebar").appendChild(newH4);
	document.getElementById("sidebar").appendChild(newButton);
	document.getElementById("loading").remove();

	var newLogo = document.createElement("img");
	newLogo.src = "https://ejgames.co.uk/ejgames%20logo.png";
	newLogo.id = "logo";
	document.getElementById("sidebar").insertBefore(newLogo, document.getElementById("sidebar").firstChild);


	// Formatting
	var userAgent = navigator.userAgent.toLowerCase();
	//userAgent = "iphone";
	if (userAgent.indexOf("iphone") != -1 || userAgent.indexOf("android") != -1 || userAgent.indexOf("windows phone") != -1)
	{
		setMobile();
	}

	
	/*for(var icon of document.getElementsByTagName("link")) {
		if(icon.rel == "icon" && icon.type == "image/x-icon") {
			icon.remove();
		}
	}
	var newIcon = document.createElement("link");
	newIcon.rel = "icon";
	newIcon.href = "https://ejgames.co.uk/files/ej%20logo.png";
	newIcon.type = "image/x-icon";
	document.body.appendChild(newIcon);*/

	document.getElementById("sidebar").lastChild.innerHTML += "\n";

	var newColourButton = document.createElement("a");
	newColourButton.id = "colour-button";
	newColourButton.href = "https://ejgames.co.uk/blog/#070422";
	newColourButton.classList.add("URLbuttonText", "zoomonhover")
	newColourButton.innerHTML = "No options?"
	document.getElementById("sidebar").appendChild(newColourButton);

	/*var newDropdown = document.createElement("select");
	newDropdown.id = "colour-dropdown";
	document.getElementById("sidebar").appendChild(newDropdown);
	var colourArrangements = ["default", "dark", "red", "aqua"];
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
		createPopup("Colours set!", "You've picked the " + newDropdown.options[newDropdown.options.selectedIndex].text + " colour scheme.", "https://ejgames.co.uk/sounds/clickbutton.wav")
		newDropdown.disabled = true;
		setTimeout(function() {
			newDropdown.disabled = false;
		}, 1000)
	}*/
	ChangeColours("default"/*getCookie("colour")*/);
	
	var observer = new IntersectionObserver(function(entries) {
		if(entries[0].isIntersecting === true) {
			console.log(entries[0].target.innerHTML);
			moveInElement(entries[0]);
		}
	}, { threshold: [0] });
	checkForVisibility("moveIn");
	var tooltip = document.createElement("span");
	tooltip.id = "tooltip";
	document.addEventListener('mousemove', updateTooltip, false);
	tooltip.style.opacity = "0";
	document.body.appendChild(tooltip);

	for(var hover of document.getElementsByClassName("hover")) {
		hover.addEventListener('mouseenter', function(e) {
			stt(e.target.getElementsByTagName("hide")[0].innerHTML);
		});
		hover.addEventListener('mouseleave', htt);
		/*hover.onmouseenter = function() {
			stt(hover.getElementsByClassName("hide")[0].innerHTML);
		};
		hover.onmouseleave = htt;*/
	}

	for(var moveIn of document.getElementsByClassName("moveIn")) {
		moveIn.style.opacity = "0%";
	}
}

function htt() {
	tooltip.style.opacity = "0";
}

function stt(text) {
	var tooltip = document.getElementById("tooltip");
	tooltip.innerHTML = text;
	tooltip.style.opacity = "100";
}

function updateTooltip(e) {
	var tooltip = document.getElementById("tooltip");
	tooltip.style.left = "calc(" + ((e.clientX / innerWidth) * 100) + "vw + 10px)";
	tooltip.style.top = "calc(" + ((e.clientY / innerHeight) * 100) + "vh + 10px)";
}

function setMobile() {
	document.getElementsByClassName("mainParagraph")[0].style.margin = "0% 5% 0% 5%";
	document.getElementById("sidebarbutton").style.display = "block";
	document.getElementById("sidebar").style.left = "-100%";
	document.getElementById("sidebar").style.width = "30%";	
	for(var i = 0; i < document.getElementById("sidebar").getElementsByTagName("a").length; i++) {
		document.getElementById("sidebar").getElementsByTagName("a")[i].classList.add("bigger");
	}
	document.body.style.fontSize = "1.5em";
}

function createScript(url) {
	var newScript = document.createElement("script");
	newScript.src = url;
	document.body.appendChild(newScript);
}

function createStyle(url) {
	var newScript = document.createElement("link");
	newScript.href = url;
	newScript.rel = "stylesheet";
	document.body.appendChild(newScript);
}

function moveInElement(element) {
	setTimeout(function() {
		/*element.style.transition = "transform 0.5s, opacity 0.5s";
		element.style.opacity = "100%";
		element.style.transform = "translateY(-20px)";*/
		element.style.animation = "moveInElement 0.7s cubic-bezier(0, 0, 0, 1)"
		setTimeout(function() {
			element.style.opacity = 100;
		}, 500)
	}, 200)
}

function checkForVisibility(className) {
	for(var item of this.document.getElementsByClassName(className)) {
		var element = item;
		var position = element.getBoundingClientRect();

		// checking for partial visibility
		if(position.top < window.innerHeight && position.bottom >= 0) {
			moveInElement(element);
		}
	}
	window.addEventListener('scroll', function() {
		for(var item of this.document.getElementsByClassName(className)) {
			var element = item;
			var position = element.getBoundingClientRect();
	
			// checking for partial visibility
			if(position.top < window.innerHeight && position.bottom >= 0) {
				moveInElement(element);
			}
		}
	});
}

function checkForVisibilityTag(tagName) {
	for(var item of this.document.getElementsByTagName(tagName)) {
		var element = item;
		var position = element.getBoundingClientRect();

		// checking for partial visibility
		if(position.top < window.innerHeight && position.bottom >= 0) {
			moveInElement(element);
		}
	}
	window.addEventListener('scroll', function() {
		for(var item of this.document.getElementsByTagName(tagName)) {
			var element = item;
			var position = element.getBoundingClientRect();
	
			// checking for partial visibility
			if(position.top < window.innerHeight && position.bottom >= 0) {
				moveInElement(element)
			}
		}
	});
}

function createFont(fontURL) {
	var font = document.createElement("link");
	font.rel = "stylesheet";
	font.href = fontURL;
	document.body.appendChild(font);
}

function UpdateColour() {

	if(getCookie("colour") != "") {
		/*if(getCookie("colour") == "blue") {
			document.body.style.backgroundColor = "#0c1420";
			document.getElementById("title").style.backgroundColor = "rgb(24, 36, 77)";
			for(var item of document.getElementsByClassName("sidebar")) {
				item.style.backgroundColor = "rgb(10, 15, 19)";
			}
		}
		else if(getCookie("colour") == "dark") {
			document.body.style.backgroundColor = "rgb(22, 28, 37)";
			document.getElementById("title").style.backgroundColor = "rgb(24, 42, 77)";
			for(var item of document.getElementsByClassName("sidebar")) {
				item.style.backgroundColor = "rgb(20, 22, 29)";
			}
		}
		else if(getCookie("colour") == "lockedin") {
			document.body.style.backgroundColor = "#1a1d16";
			document.getElementById("title").style.backgroundColor = "rgb(24, 77, 28)";
			for(var item of document.getElementsByClassName("sidebar")) {
				item.style.backgroundColor = "rgb(10, 19, 13)";
			}
		}*/
		try {
			document.getElementsByTagName("html")[0].style.background = colours[getCookie("colour")].background;
			document.getElementsByTagName("html")[0].style.backgroundAttachment = "fixed";
			//document.getElementById("title").style.backgroundColor = colours[getCookie("colour")].title;
			document.getElementById("title").style.color = colours[getCookie("colour")].h2;
			document.getElementById("sidebar").style.backgroundColor = colours[getCookie("colour")].sidebar;
			for(var item of document.getElementsByTagName("h2")) {
				item.style.color = colours[getCookie("colour")].h2;
			}
			document.body.style.color = colours[getCookie("colour")].body;
			for(var item of document.getElementsByClassName("URLbuttonText")) {
				item.style.color = colours[getCookie("colour")].body;
			}
			for(var item of document.getElementsByClassName("card")) {
				item.style.backgroundColor = colours[getCookie("colour")].title;
			}
			for(var item of document.getElementsByClassName("small-card")) {
				item.style.backgroundColor = colours[getCookie("colour")].title;
			}
			for(var item of document.getElementsByClassName("smaller-card")) {
				item.style.backgroundColor = colours[getCookie("colour")].title;
			}
			for(var item of document.getElementsByClassName("searchBar")) {
				item.style.backgroundColor = colours[getCookie("colour")].sidebar;
			}
			for(var item of document.getElementsByClassName("searchItems")) {
				for(var searchItem of item.getElementsByTagName("a")) {
					searchItem.style.color = colours[getCookie("colour")].body;
				}
			}
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

function SetCompleted() {
	if(getCookie("completed") != "") {
		if(getCookie("completed") == "true") {
			document.body.getElementsByTagName("h2")[0].innerHTML += " (Completed)";
			CreateNotification("Tutorial Completed!", "You've completed this tutorial!", 5, "https://ejgames.co.uk/sounds/complete.wav", "rgba(0, 150, 155, 0.8)", "rgba(0, 75, 77, 0.8)");
		}
		else {
			window.setTimeout(function() {
				setCookie("completed", "true", 45);
				CreateNotification("Tutorial Completed!", "You've completed this tutorial!", 5, "https://ejgames.co.uk/sounds/complete.wav", "rgba(0, 150, 155, 0.8)", "rgba(0, 75, 77, 0.8)");
			}, 50000)
		}
	}
	else {
		setCookie("completed", "false", 45);
		window.setTimeout(function() {
			setCookie("completed", "true", 45);
			CreateNotification("Tutorial Completed!", "You've completed this tutorial!", 5, "https://ejgames.co.uk/sounds/complete.wav", "rgba(0, 150, 155, 0.8)", "rgba(0, 75, 77, 0.8)");
		}, 50000)
	}
}

function hyperlink(url) {
	window.open(url);
}

function CreateNotification(heading, body, showTime, soundToPlay, colour, borderColour) {
	var notification = document.createElement("div");
	var bodyText = document.createElement("div");
	notification.classList.add("notification");
	bodyText.innerHTML = body;
	var bold = document.createElement("b");
	bold.innerHTML = heading;
	notification.appendChild(bold)
	document.body.appendChild(notification);
	notification.appendChild(bodyText);
	notification.style.backgroundColor = colour;
	notification.style.borderColor = borderColour;
	setTimeout(function() {
		setTimeout(function() {
			notification.remove();
		}, 1000);
		notification.style.opacity = 0;
	}, (showTime - 1) * 1000)
	setTimeout(function() {
		notification.style.right = "3.5%";
		playSound(soundToPlay);
	}, 100)
}

function playSound(soundURL) {
	var toPlay = new sound(soundURL);
	toPlay.sound.volume = 0.3;
	toPlay.play();
	toPlay.sound.onended = function() {
		toPlay.sound.remove();
	}
}

function createPopup(heading, body, soundToPlay) {
	var notification = document.createElement("div");
	notification.classList.add("popup");
	notification.id = "popup";
	notification.innerHTML = `
	<h5 class="heading">${heading == undefined ? "Notification" : heading}
	<button class="close-button" onclick="hidePopup()">&times;</button>
	</h5>
	<div class="popup-body">
	${body == undefined ? String.raw`You have received a notification, but there was no body ¯\_ (ツ)_/¯` : body}
	</div>
	`
	if(soundToPlay != null && soundToPlay != undefined) {
		playSound(soundToPlay);
	}
	document.body.appendChild(notification);
	if(document.getElementById("overlay") == null) {
		var newOverlay = document.createElement("div");
		newOverlay.id = "overlay";
		document.body.appendChild(newOverlay);
	}
	document.getElementById("overlay").onclick = hidePopup;
	document.getElementById("overlay").style.display = "block";
	document.getElementById("overlay").style.opacity = 100;
}

function hidePopup() {
	var notification = document.getElementById("popup");
	document.getElementById("overlay").onclick = null;
	notification.classList.add("closed");
	document.getElementById("overlay").style.opacity = 0;
	setTimeout(function() {
		notification.remove();
		document.getElementById("overlay").style.display = "none";
	}, 200);
}

function createConfirm(heading, body, soundToPlay, buttonText, onConfirm) {
	var notification = document.createElement("div");
	notification.classList.add("popup");
	notification.id = "confirm";
	notification.innerHTML = `
	<h5 class="heading">${heading == undefined ? "Notification" : heading}
	<button class="close-button" onclick="hideConfirm()">&times;</button>
	</h5>
	<div class="popup-body">
	${body == undefined ? String.raw`You have received a notification, but there was no body ¯\_ (ツ)_/¯` : body}
	<br><br>
	<h5><button id="confirm-close">${buttonText}</button></h5>
	</div>
	`
	if(soundToPlay != null && soundToPlay != undefined) {
		playSound(soundToPlay);
	}
	document.body.appendChild(notification);
	if(document.getElementById("overlay") == null) {
		var newOverlay = document.createElement("div");
		newOverlay.id = "overlay";
		document.body.appendChild(newOverlay);
	}
	document.getElementById("overlay").style.display = "block";
	document.getElementById("overlay").style.opacity = 100;
	document.getElementById("overlay").onclick = hideConfirm;
	document.getElementById("confirm-close").onclick = onConfirm;
}

function hideConfirm() {
	var notification = document.getElementById("confirm");
	document.getElementById("overlay").onclick = null;
	notification.classList.add("closed");
	document.getElementById("overlay").style.opacity = 0;
	setTimeout(function() {
		notification.remove();
		document.getElementById("overlay").style.display = "none";
	}, 200);
}

function OpenElement(elementId, buttonId, textWhenOpen, textWhenClosed) {
	document.getElementById(elementId).style.display = "block";
	document.getElementById(buttonId).onclick = function() {
		CloseElement(elementId, buttonId, textWhenOpen, textWhenClosed);
	}
	document.getElementById(buttonId).innerHTML = textWhenOpen;
}
function CloseElement(elementId, buttonId, textWhenOpen, textWhenClosed) {
	document.getElementById(elementId).style.display = "none";
	document.getElementById(buttonId).onclick = function() {
		OpenElement(elementId,buttonId, textWhenOpen, textWhenClosed);
	}
	document.getElementById(buttonId).innerHTML = textWhenClosed;
}
function MoveSidebarIn(buttonId, textWhenOpen, textWhenClosed) {
	document.getElementById("sidebar").style.left = "0%";
	document.getElementById(buttonId).onclick = function() {
		MoveSidebarOut(buttonId, textWhenOpen, textWhenClosed);
	}
	document.getElementById(buttonId).innerHTML = textWhenOpen;
}
function MoveSidebarOut(buttonId, textWhenOpen, textWhenClosed) {
	document.getElementById("sidebar").style.left = "-50%";
	document.getElementById(buttonId).onclick = function() {
		MoveSidebarIn(buttonId, textWhenOpen, textWhenClosed);
	}
	document.getElementById(buttonId).innerHTML = textWhenClosed;
}
function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = "";
	if(window.location.href.indexOf("file:///") > -1) {
		decodedCookie = document.getElementById("cookie").innerHTML;
	}
	else {
		decodedCookie = decodeURIComponent(document.cookie);
	}
	let ca = decodedCookie.split(';');
	for(let i = 0; i <ca.length; i++) {
	  let c = ca[i];
	  while (c.charAt(0) == ' ') {
		c = c.substring(1);
	  }
	  if (c.indexOf(name) == 0) {
		return c.substring(name.length, c.length);
	  }
	}
	return "";
}
function setCookie(cname, cvalue, exdays) {
	const d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	let expires = "expires="+ d.toUTCString();
	if(window.location.href.indexOf("file:///") > -1) {
		document.getElementById("cookie").innerHTML = cname + "=" + cvalue + ";" + expires + ";path=/";
	}
	else {
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}
}
function sound(src)
{
	this.sound = document.createElement("audio");
	this.sound.src = src;
	this.sound.setAttribute("preload", "auto");
	this.sound.setAttribute("controls", "none");
	this.sound.style.display = "none";
	document.body.appendChild(this.sound);
	this.play = function ()
	{
		this.sound.play();
	}
	this.stop = function ()
	{	
		this.sound.pause();
	}
}
