function CheckFormatting()
{
	var userAgent = navigator.userAgent.toLowerCase();
	//userAgent = "iphone";
	if (userAgent.indexOf("iphone") != -1)
	{
		document.getElementsByClassName("mainParagraph")[0].style.margin = "0% 5% 0% 5%";
		document.getElementById("sidebarbutton").style.display = "block";
		document.getElementById("sidebar").style.left = "-100%";
		document.getElementById("sidebar").style.width = "30%";
		for(var i = 0; i < document.getElementById("sidebar").getElementsByTagName("a").length; i++) {
			document.getElementById("sidebar").getElementsByTagName("a")[i].classList.add("bigger");
		}
		document.body.style.fontSize = "1.5em";
	}

	var newH4 = document.createElement("h4");
	newH4.innerHTML = "Actions";
	var newButton = document.createElement("button");
	newButton.innerHTML = "Change Colours";
	newButton.classList.add("URLbuttonText");
	newButton.classList.add("zoomonhover");
	document.getElementById("sidebar").appendChild(newH4);
	document.getElementById("sidebar").appendChild(newButton);
	newButton.onclick = function() {
		if(getCookie("colour") == "blue") {
			ChangeColours("classic");
		}
		if(getCookie("colour") == "classic") {
			ChangeColours("lockedin");
		}
		if(getCookie("colour") == "lockedin") {
			ChangeColours("blue");
		}
	}
	UpdateColour();
}

function UpdateColour() {

	if(getCookie("colour") != "") {
		if(getCookie("colour") == "blue") {
			document.body.style.backgroundColor = "rgb(24, 24, 24)";
			document.getElementById("title").style.backgroundColor = "rgb(24, 36, 77)";
			for(var item of document.getElementsByClassName("sidebar")) {
				item.style.backgroundColor = "rgb(10, 15, 19)";
			}
		}
		else if(getCookie("colour") == "classic") {
			document.body.style.backgroundColor = "rgb(22, 28, 37)";
			document.getElementById("title").style.backgroundColor = "rgb(24, 42, 77)";
			for(var item of document.getElementsByClassName("sidebar")) {
				item.style.backgroundColor = "rgb(20, 22, 29)";
			}
		}
		else if(getCookie("colour") == "lockedin") {
			document.body.style.backgroundColor = "rgb(24, 24, 24)";
			document.getElementById("title").style.backgroundColor = "rgb(24, 77, 28)";
			for(var item of document.getElementsByClassName("sidebar")) {
				item.style.backgroundColor = "rgb(10, 19, 13)";
			}
		}
	}
	else {
		setCookie("colour", "classic", 730);
	}
	document.getElementById("sidebar").getElementsByTagName("button")[0].onclick = function() {
		if(getCookie("colour") == "blue") {
			ChangeColours("classic");
		}
		if(getCookie("colour") == "classic") {
			ChangeColours("lockedin");
		}
		if(getCookie("colour") == "lockedin") {
			ChangeColours("blue");
		}
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
function CreateNotification(heading, body, showTime, soundToPlay, colour, borderColour) {
	var notification = document.createElement("button");
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
		var toPlay = new sound(soundToPlay);
		toPlay.sound.volume = 0.3;
		toPlay.play();
	}, 100)
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
	let decodedCookie = decodeURIComponent(document.cookie);
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
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
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
