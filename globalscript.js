var KC = {backspace:8,tab:9,enter:13,shift:16,ctrl:17,alt:18,pausebreak:19,capslock:20,esc:27,space:32,pageup:33,pagedown:34,end:35,home:36,leftarrow:37,uparrow:38,rightarrow:39,downarrow:40,insert:45,delete:46,0:48,1:49,2:50,3:51,4:52,5:53,6:54,7:55,8:56,9:57,a:65,b:66,c:67,d:68,e:69,f:70,g:71,h:72,i:73,j:74,k:75,l:76,m:77,n:78,o:79,p:80,q:81,r:82,s:83,t:84,u:85,v:86,w:87,x:88,y:89,z:90,leftwindowkey:91,rightwindowkey:92,selectkey:93,numpad0:96,numpad1:97,numpad2:98,numpad3:99,numpad4:100,numpad5:101,numpad6:102,numpad7:103,numpad8:104,numpad9:105,multiply:106,add:107,subtract:109,decimalpoint:110,divide:111,f1:112,f2:113,f3:114,f4:115,f5:116,f6:117,f7:118,f8:119,f9:120,f10:121,f11:122,f12:123,numlock:144,scrolllock:145,semicolon:186,equalsign:187,comma:188,dash:189,period:190,forwardslash:191,graveaccent:192,openbracket:219,backslash:220,closebracket:221,singlequote:222};





function CheckFormatting()
{
	var sidebar = document.createElement("div");
	sidebar.classList.add("sidebar");
	sidebar.id = "sidebar";
	sidebar.innerHTML = String.raw`
		<h4 id="below-logo" class="active" onclick="window.location.href='/index.html'" style="margin-top: -0.5em; text-align: center; font-size: 1.4em;">${document.getElementById("title").innerHTML.toUpperCase()}</h4>
		<h4>Links</h4>
		<a href="${getAbsLocation("index.html")}" class="URLbuttonText">Homepage</a><br>
		<a href="${getAbsLocation("games/index.html")}" class="URLbuttonText">Games</a><br>
		<a href="${getAbsLocation("app/index.html")}" class="URLbuttonText">Apps</a><br>
		<a href="${getAbsLocation("music.html")}" class="URLbuttonText">Music</a><br>
		<a href="${getAbsLocation("tutorials.html")}" class="URLbuttonText">Tutorials</a><br>
		<a href="${getAbsLocation("blog/index.html")}" class="URLbuttonText">Blog</a>`

	document.body.insertBefore(sidebar, document.getElementById("title"));

	// window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
	// Script initialisation
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

	/*if(window.location.href.indexOf("/tutorial/") > -1) {
		createScript("/scripts/tutorial-manager.js");
		retryTutorial();
		function retryTutorial() {
			try {
				setupTutorial();
			}
			catch(ex) {
				//console.warn(ex.message);
				setTimeout(retryTutorial, 250);
			}
		}
	}*/

	if(window.location.href.indexOf("planet-orbit") < 0) {
		
		var newBottom = document.createElement("div");
		newBottom.id = "bottom";
		newBottom.style.zIndex = "15";
		newBottom.innerHTML = String.raw`
		<span>
			<h5>PC Games</h5>
			<a class="URLbuttonText" href="/lockedin.html">Locked In</a>
			<a class="URLbuttonText" href="/connectcircle.html">ConnectCircle</a>
			<a class="URLbuttonText" href="/connectmore.html">ConnectMore</a>
			<a class="URLbuttonText" href="/roblox-games.html">Roblox Games</a>
			<a class="URLbuttonText" href="/index.html">Homepage</a>
		</span>
		<span>
			<h5>Web games</h5>
			<a class="URLbuttonText" href="/games/index.html">Web Games Home</a>
			<a class="URLbuttonText" href="/games/word-game.html">Word Game</a>
			<a class="URLbuttonText" href="/games/connect-more.html">ConnectMore</a>
		</span>
		<span>
			<h5>Apps</h5>
			<a class="URLbuttonText" href="/app/web-todo.html">Todo List</a>

			<h5>Tutorials & Coding</h5>
			<a class="URLbuttonText" href="/tutorials.html">Tutorials Home</a>
		</span>
		<div class="clear"/><div class="smallSpace">`;
		document.body.appendChild(newBottom);

		if (navigator.userAgent.indexOf("iphone") == -1 && navigator.userAgent.indexOf("android") == -1 && navigator.userAgent.indexOf("windows phone") == -1)
		{
			document.getElementById("sidebar").style.minHeight = "70%";
		}



	}


	// Cleaning up & inserting elements
	document.getElementById("title").style.display = "none";
	var newH4 = document.createElement("h4");
	newH4.innerHTML = "Actions";
	newH4.id = "sidebar-actions";
	document.getElementById("sidebar").appendChild(newH4);

	document.getElementById("loading").remove();

	var newLogo = document.createElement("img");
	newLogo.src = getAbsLocation("images/vectarray-logo-white.png");
	newLogo.id = "logo";
	newLogo.classList.add("active");
	newLogo.onclick = function() {
		window.location.href = "/index.html";
	};
	document.getElementById("sidebar").insertBefore(newLogo, document.getElementById("sidebar").firstChild);


	// Formatting
	var userAgent = navigator.userAgent.toLowerCase();
	//userAgent = "iphone";
	if (userAgent.indexOf("iphone") != -1 || userAgent.indexOf("android") != -1 || userAgent.indexOf("windows phone") != -1)
	{
		setMobile();
	}

	document.getElementById("sidebar").lastChild.innerHTML += "\n";

	

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
	document.getElementById("sidebarbutton").style.display = "block";
	document.getElementById("sidebar").style.left = "-100%";
	document.getElementById("sidebar").style.top = "0";
	document.getElementById("sidebar").style.width = "30%";

	/*var sidebarColour;
	try {
		sidebarColour = colours[getCookie("colour")].sidebar;
		document.getElementById("sidebar").style.backgroundColor = colours[getCookie("colour")].sidebar;
	}
	catch {
		function setSidebar() {
			try {
				//sidebarColour = colours[getCookie("colour")].sidebar;
				//document.getElementById("sidebar").style.backgroundColor = colours[getCookie("colour")].sidebar;
			}
			catch {
				setTimeout(setSidebar, 100);
			}
		}
		setTimeout(setSidebar, 100);
	}
	*/

	for(var i = 0; i < document.getElementById("sidebar").getElementsByTagName("a").length; i++) {
		document.getElementById("sidebar").getElementsByTagName("a")[i].classList.add("bigger");
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
