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
	if(getCookie("completed") != "") {
		if(getCookie("completed") == "true") {
			document.body.getElementsByTagName("h2")[0].innerHTML += " (Completed)";
		}
	}
	else {
		setCookie("completed", "false", 45);
	}
}

function SetCompleted() {
	window.setTimeout(function() {
		setCookie("completed", "true", 45);
	}, 50000)
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
