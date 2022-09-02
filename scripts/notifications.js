function setupNotifications() {

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