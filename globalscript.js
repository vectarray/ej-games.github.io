function CheckFormatting()
		{
			var userAgent = navigator.userAgent.toLowerCase();
			//userAgent = "iphone";
			if (userAgent.indexOf("iphone") != -1)
			{
				document.getElementsByClassName("mainParagraph")[0].style.margin = "0% 5% 0% 5%";
				document.getElementById("sidebarbutton").style.display = "block";
				document.getElementById("sidebar").style.left = "-15%";
				for(var i = 0; i < document.getElementById("sidebar").getElementsByTagName("a").length; i++) {
					document.getElementById("sidebar").getElementsByTagName("a")[i].classList.add("bigger");
				}
				document.body.style.fontSize = "1.5em";
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
	document.getElementById("sidebar").style.left = "-15%";
	document.getElementById(buttonId).onclick = function() {
		MoveSidebarIn(buttonId, textWhenOpen, textWhenClosed);
	}
	document.getElementById(buttonId).innerHTML = textWhenClosed;
}
