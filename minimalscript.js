var KC = {backspace:8,tab:9,enter:13,shift:16,ctrl:17,alt:18,pausebreak:19,capslock:20,esc:27,space:32,pageup:33,pagedown:34,end:35,home:36,leftarrow:37,uparrow:38,rightarrow:39,downarrow:40,insert:45,delete:46,0:48,1:49,2:50,3:51,4:52,5:53,6:54,7:55,8:56,9:57,a:65,b:66,c:67,d:68,e:69,f:70,g:71,h:72,i:73,j:74,k:75,l:76,m:77,n:78,o:79,p:80,q:81,r:82,s:83,t:84,u:85,v:86,w:87,x:88,y:89,z:90,leftwindowkey:91,rightwindowkey:92,selectkey:93,numpad0:96,numpad1:97,numpad2:98,numpad3:99,numpad4:100,numpad5:101,numpad6:102,numpad7:103,numpad8:104,numpad9:105,multiply:106,add:107,subtract:109,decimalpoint:110,divide:111,f1:112,f2:113,f3:114,f4:115,f5:116,f6:117,f7:118,f8:119,f9:120,f10:121,f11:122,f12:123,numlock:144,scrolllock:145,semicolon:186,equalsign:187,comma:188,dash:189,period:190,forwardslash:191,graveaccent:192,openbracket:219,backslash:220,closebracket:221,singlequote:222};





function CheckFormatting()
{

	// window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
	// Script initialisation
	document.getElementById("loading").remove();
	var newScript = document.createElement("script");
	newScript.src = getAbsLocation("colours.jsonp")
	document.body.appendChild(newScript);
	if(window.location.href.indexOf("tutorials") > -1) {
		createScript("/csharp-keywords.js");
	}

	createStyle("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css");

	createScript("https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js");

	createScript("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/highlight.min.js");

	createScript("/scripts/tooltip-controller.js");
	retryTooltips();
	function retryTooltips() {
		try {
			setupTooltips();
		}
		catch(ex) {
			//console.warn(ex.message);
			setTimeout(retryTooltips, 250);
		}
	}

	createScript("/scripts/transition-controller.js");
	retryTransitions();
	function retryTransitions() {
		try {
			setupTransitions();
		}
		catch(ex) {
			//console.warn(ex.message);
			setTimeout(retryTransitions, 250);
		}
	}

	createScript("/scripts/colour-controller.js");
	retryColours();
	function retryColours() {
		try {
			setupColours();
		}
		catch(ex) {
			//console.warn(ex.message);
			setTimeout(retryColours, 250);
		}
	}

	createScript("/scripts/notifications.js");
	retryNotifications();
	function retryNotifications() {
		try {
			setupNotifications();
		}
		catch(ex) {
			//console.warn(ex.message);
			setTimeout(retryNotifications, 250);
		}
	}


	// Formatting
	var userAgent = navigator.userAgent.toLowerCase();
	//userAgent = "iphone";
	if (userAgent.indexOf("iphone") != -1 || userAgent.indexOf("android") != -1 || userAgent.indexOf("windows phone") != -1)
	{
		setMobile();
	}

	

	collapsible();

	for(var item of document.getElementsByClassName("image-zoom")) {
		item.addEventListener("click", function() {
			popup("", "<img src='" + this.src.toString() + "'>", "", null);
			var thisPopup = document.getElementById("popup");
			thisPopup.style.width = "min-content";
			thisPopup.style.maxWidth = "min-content";
			thisPopup.style.height = "min-content";
			thisPopup.style.maxHeight = "min-content";
			thisPopup.style.cursor = "zoom-out";
			thisPopup.style.zIndex = 100;
			thisPopup.addEventListener("click", function() {
				hidePopup();
			});
		});
	}

}

function keepTrying(toTry, delay) {
	failure();
	function failure() {
		try {
			toTry();
		}
		catch(ex) {
			console.warn(ex.message);
			setTimeout(failure, delay);
		}
	}
}

function getAbsLocation(pathName) {
	return location.protocol + "//" + location.hostname + ":" + location.port + "/" + pathName;
	if((window.location.href.indexOf("https://") > -1 || window.location.href.indexOf("http://") > -1) && window.location.href.indexOf("127.0.0.1") < 0) {
		return "https://" + location.hostname + "/" + pathName;
	}
	else {
		return "http://" + location.hostname + ":" + location.port + "/" + pathName;
	}
}

function setMobile() {
	for(var item of document.getElementsByClassName("mainParagraph")) {
		item.style.margin = "0% 5% 0% 5%";
	}
	document.body.style.fontSize = "2em";
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



function createFont(fontURL) {
	var font = document.createElement("link");
	font.rel = "stylesheet";
	font.href = fontURL;
	document.body.appendChild(font);
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

function collapsible() {
	for(var collapsible of document.getElementsByClassName("collapsible")) {
		collapsible.addEventListener("click", function() {
			this.classList.toggle("active");
			var content = this.nextElementSibling;
			if(content.style.maxHeight) {
				content.style.maxHeight = null;
			}
			else {
				content.style.maxHeight = content.scrollHeight.toString() + "px";
			}
		});
	}
}

function hyperlink(url) {
	window.open(url);
}

function popup(heading, body, soundToPlay) {
	createPopup(heading, body, soundToPlay);
}

function confirm(heading, body, soundToPlay, buttonText, onConfirm) {
	createConfirm(heading, body, soundToPlay, buttonText, onConfirm);
}

function createPopupText(text, elementFor) {
	var newText = document.createElement("div");
	newText.classList.add("popup-text");
	newText.innerHTML = "<div class='popup-text-container'>" + text + "</div>";
	elementFor.appendChild(newText);
	setTimeout(function() {
		newText.remove();
	}, 2990);
}

function createPopupTextAtPos(text, position) {

}

function handleSound(soundName) {
	if(getCookie("colour") == "dark") {
		return "/sounds/" + soundName + ".mp3";
	}
	else {
		return "/sounds/" + soundName + "-light.mp3";
	}
}

function playSound(soundURL) {
	var toPlay = new sound(soundURL);
	toPlay.sound.volume = 0.3;
	toPlay.play();
	toPlay.sound.onended = function() {
		toPlay.sound.remove();
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

function randInt(min, max)
{
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function lerp(a, b, t) {
	return a + (b - a) * t;
}

function multiplyString(str, times) {
	var toReturn = "";
	for(var i = 0; i < times; i++) {
		toReturn += str;
	}
	return toReturn;
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
function setLocalCookie(cname, cvalue, exdays) {
	const d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	let expires = "expires="+ d.toUTCString();
	if(window.location.href.indexOf("file:///") > -1) {
		document.getElementById("cookie").innerHTML = cname + "=" + cvalue + ";" + expires + ";path=/";
	}
	else {
		document.cookie = cname + "=" + cvalue + ";" + expires;
	}
}
function setCookieWithPath(cname, cvalue, exdays, path) {
	const d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	let expires = "expires="+ d.toUTCString();
	if(window.location.href.indexOf("file:///") > -1) {
		document.getElementById("cookie").innerHTML = cname + "=" + cvalue + ";" + expires + ";path=/";
	}
	else {
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=" + path;
	}
}
