var KC = {backspace:8,tab:9,enter:13,shift:16,ctrl:17,alt:18,pausebreak:19,capslock:20,esc:27,space:32,pageup:33,pagedown:34,end:35,home:36,leftarrow:37,uparrow:38,rightarrow:39,downarrow:40,insert:45,delete:46,0:48,1:49,2:50,3:51,4:52,5:53,6:54,7:55,8:56,9:57,a:65,b:66,c:67,d:68,e:69,f:70,g:71,h:72,i:73,j:74,k:75,l:76,m:77,n:78,o:79,p:80,q:81,r:82,s:83,t:84,u:85,v:86,w:87,x:88,y:89,z:90,leftwindowkey:91,rightwindowkey:92,selectkey:93,numpad0:96,numpad1:97,numpad2:98,numpad3:99,numpad4:100,numpad5:101,numpad6:102,numpad7:103,numpad8:104,numpad9:105,multiply:106,add:107,subtract:109,decimalpoint:110,divide:111,f1:112,f2:113,f3:114,f4:115,f5:116,f6:117,f7:118,f8:119,f9:120,f10:121,f11:122,f12:123,numlock:144,scrolllock:145,semicolon:186,equalsign:187,comma:188,dash:189,period:190,forwardslash:191,graveaccent:192,openbracket:219,backslash:220,closebracket:221,singlequote:222};



var allowNavbarHiding = false;

const _months = ["Error", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function CheckFormatting()
{
	if(window.location.href.endsWith("/index.html")) {
		window.location.href = window.location.href.replace("/index.html", "");
	}
	var sidebar = document.createElement("div");
	sidebar.classList.add("sidebar");
	sidebar.id = "sidebar";
	var title = "";
	if(document.getElementById("title") != null) {
		title = document.getElementById("title").innerHTML.toUpperCase();
	}
	sidebar.innerHTML = String.raw`
		<h4 id="below-logo" class="active" onclick="window.location.href='/index.html'" style="margin-top: -0.5em; text-align: center; font-size: 1.4em;">${title}</h4>
		<h4>Links</h4>
		<a href="${getAbsLocation("index.html")}" class="URLbuttonText">Homepage</a><br>
		<a href="${getAbsLocation("games/index.html")}" class="URLbuttonText">Games</a><br>
		<a href="${getAbsLocation("app/index.html")}" class="URLbuttonText">Apps</a><br>
		<a href="${getAbsLocation("music.html")}" class="URLbuttonText">Music</a><br>
		<a href="${getAbsLocation("tutorial/index.html")}" class="URLbuttonText">Tutorials</a><br>
		<a href="${getAbsLocation("blog/index.html")}" class="URLbuttonText">Blog</a>`

	document.body.insertBefore(sidebar, document.getElementById("title"));
	sidebar.style.left = "-50%";

	// How can I get comments to show up, son?

	//#region Navbar

	createNavbar();

	//#endregion

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
		
		

		if (navigator.userAgent.indexOf("iphone") == -1 && navigator.userAgent.indexOf("android") == -1 && navigator.userAgent.indexOf("windows phone") == -1)
		{
			document.getElementById("sidebar").style.minHeight = "70%";
		}



	}


	// Cleaning up & inserting elements
	try {
		document.getElementById("title").style.display = "none";
	}
	catch(ex) {
		console.log(ex.message);
	}
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
			thisPopup.getElementsByTagName("img")[0].style.maxWidth = (screen.width / 1.5).toString() + "px";
			thisPopup.getElementsByTagName("img")[0].style.maxHeight = (screen.height / 1.5).toString() + "px";
			thisPopup.addEventListener("click", function() {
				hidePopup();
			});
		});
	}

	setTimeout(function() {
		allowNavbarHiding = true;
	}, 1500);

}

function createNavbar() {

	// Create and set up element
	var navbar = document.createElement("div");
	navbar.id = "navbar";
	navbar.classList.add("navbar");

	// Set top left text
	var navbarText = "";
	if(document.getElementById("title") != null) {
		navbarText = document.getElementById("title").innerHTML.toUpperCase();
	}
	
	// Selected items: remove all unused letters and symbols
	// Cleaned items: ready to show
	var selectedItems = []
	var cleanedItems = []
	
	// Show all directories as separate words
	var urlItems = window.location.href.split("/");
	//urlItems = "https://vectarray.com/app/electric-fields.html".split("/");
	//console.log(urlItems.indexOf("vectarray.com"));


	for(var item of urlItems) {
		// Ignore https://, 127.0.0.1, and vectarray.com
		//console.log(item, item.indexOf("vectarray.com"));
		if(item.indexOf("http") <= -1 && item.indexOf(".") == item.lastIndexOf(".") && item != "" && item.indexOf("vectarray.com") <= -1) {
			selectedItems.push(item)
		}
	}

	// Put Homepage at the start to allow for easy access
	//cleanedItems.push("Homepage");

	//console.log(selectedItems);
	
	for(var item of selectedItems) {

		var words = item.replace(".html", "").split("-"); // Split URL into words, and remove .html ending
		var newPhrase = ""; // Set up new phrase

		// Clean each word in words
		for(var word of words) {
			newPhrase = newPhrase + word[0].toUpperCase() + word.substring(1) + " "; // Capitalise first letter
		}

		// If it's a blog page, turn the filename into a date
		if(window.location.href.indexOf("blog") > -1 && Number.parseInt(item) > 100000) {
			newPhrase = convertDate(item, false);
		}

		// If it's index.html, write "home" instead of "index"
		if(item.indexOf("index") > -1) {
			newPhrase = "Home"
		}

		// Remove trailing spaces and add
		newPhrase = newPhrase.trimEnd();
		cleanedItems.push(newPhrase);
	}
	//console.log(cleanedItems);
	navbar.innerHTML = `
	<h4 id="vectarray-logo" onclick="hyperlink('/index.html')">VECTARRAY ${navbarText}</h4>
	<!--<img src="/images/vectarray-logo-shadow.png" class="navbar-img">-->
	`

	console.log(selectedItems);
	console.log(cleanedItems);

	for(var i = 0; i < selectedItems.length; i++) {
		var href = window.location.href;
		var toSlice = "/" + selectedItems[i];
		var newURL = href.slice(0, href.indexOf(toSlice) + toSlice.length);
		if(i == selectedItems.length) {
			navbar.innerHTML += ` / <a href="${newURL}" class="URLbuttonText" style="font-weight: bold;">${cleanedItems[i]}</a>`;
		}
		else {
			navbar.innerHTML += ` / <a href="${newURL}" class="URLbuttonText">${cleanedItems[i]}</a>`;
		}
	}

		var newBottom = document.createElement("div");
		newBottom.id = "bottom";
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
			<h5>Web Apps & Games</h5>
			<a class="URLbuttonText" href="/games/index.html">Web Games Home</a>
			<a class="URLbuttonText" href="/games/word-game.html">Word Game</a>
			<a class="URLbuttonText" href="/games/connect-more.html">ConnectMore</a>
			<a class="URLbuttonText" href="/app/">Apps Home</a>
			<a class="URLbuttonText" href="/app/web-todo.html">Todo List</a>
		</span>
		<span>
			<h5>Articles</h5>
			<a class="URLbuttonText" href="/tutorial/index.html">Tutorials Home</a>
			<a class="URLbuttonText" href="/blog/index.html">Blog Home</a>
		</span>
		<div class="clear"/>`;
		navbar.appendChild(newBottom);

	document.body.insertBefore(navbar, document.getElementById("title"));

	navbar.addEventListener("mouseover", function() {
		navbar.style.height = "20.4em"
	});
	navbar.addEventListener("mouseleave", function() {
		navbar.style.height = "1.4em"
	});

	var prevScrollpos = window.scrollY;
	window.onscroll = function () {
		var currentScrollPos = window.scrollY;
		if (prevScrollpos > currentScrollPos) {
			document.getElementById("navbar").style.top = "0";
		} else {
			document.getElementById("navbar").style.top = "-50px";
			navbar.style.height = "1.4em"
		}
		prevScrollpos = currentScrollPos;
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

function changeSelection(selectionElement, isNext = true) {
	for(var child of selectionElement.getElementsByClassName("option")) {
		child.style.display = "none";
	}

	var numberOfChildren = selectionElement.getElementsByClassName("option").length;
	var counterElement = selectionElement.getElementsByTagName("hide")[0];
	var counter = Number.parseInt(counterElement.innerHTML);

	if(isNext) {
		counter += 1;
		if(counter >= numberOfChildren) {
			counter = 0
		}
	}
	else {
		counter -= 1;
		if(counter < 0) {
			counter = numberOfChildren - 1
		}
	}
	//console.log(counter);
	counterElement.innerHTML = counter.toString();

	for(var child of selectionElement.getElementsByClassName("option")) {
		if(child.classList.contains(counter.toString())) {
			child.style.display = "block";
		}
	}

}

function hyperlink(url) {
	window.location = url;
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
