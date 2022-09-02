let tutorialPoints = 0
let canComplete = false;

const languageDisplayNames = {
    "csharp": "C#",
    "python": "Python"
}

function waitUntilCompleted() {
    setTimeout(function() {
        canComplete = true;
    }, 30000);
}

function setupTutorial() {
    tutorialPoints = getCookie("knowledgePoints");
    if(tutorialPoints == "") {
        tutorialPoints = "0";
    }
    setCookie("knowledgePoints", tutorialPoints, 365);
    tutorialProgressBar();
    waitUntilCompleted();
}

function tutorialProgressBar() {
	if(location.href.indexOf("/tutorial/") > -1) {
		var newProgressBar = document.createElement("div");
		newProgressBar.id = "tutorial-progress";
		document.body.insertBefore(newProgressBar, document.body.firstChild);
		window.addEventListener('scroll', function() {
			var position = window.scrollY;
			
			var maxHeight = document.body.scrollHeight - this.window.innerHeight;
			let percentage = (position / maxHeight) * 100;
			percentage = Math.round(percentage);
			if(100 - percentage < 2) {
				percentage = 100;
                canComplete = false;
                tutorialPoints = (Number(points) + Number(document.getElementById("tutorial-points").innerHTML)).toString();
                setCookie("knowledgePoints", points, 365);
			}
	
			document.getElementById("tutorial-progress").style.width = percentage + "%";
		});
	}
}