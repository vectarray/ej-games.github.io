var points = "0";

var inGame = true;

var homeSq;
var sqrs = [];
var connectedSqrs = [];

var isMobile = false;

function update() {

}

function handleInput(e) {
    console.log("moving!");
    if(e.keyCode == KC.uparrow || e.keyCode == KC.w) {
        move(-100);
    }
    else if(e.keyCode == KC.leftarrow || e.keyCode == KC.a) {
        move(-1);
    }
    else if(e.keyCode == KC.downarrow || e.keyCode == KC.s) {
        move(100);
    }
    else if(e.keyCode == KC.rightarrow || e.keyCode == KC.d) {
        move(1);
    }
}

// Up=-100, Down=100, Left=-1, Right=1

function move(dir) {
    
}

function onLoad() {
    setInterval(update, 20);

    document.addEventListener("keydown", handleInput)

    // Load points
    if (getCookie("connectMorePoints") != "") {
        points = getCookie("connectMorePoints");
    }
    else {
        points = "0";
    }

    // Show instructions
    if (getCookie("playedConnectMore") == "" || getCookie("playedConnectMore") == "false") {
        createConfirm("How to play", String.raw`Move the green block towards the white blocks, to create a pattern.
                Different patterns reward different numbers of points.
                Don't destroy the green block, or go off the edge - this will end the game and your total score will be added to your balance.`, null, "OK, don't show me again.", function () {
            setCookie("playedConnectMore", "true", 730);
            hideConfirm();
        });
    }

    // Mobile formatting
    var userAgent = navigator.userAgent.toLowerCase();
    //userAgent = "iphone";
    if (userAgent.indexOf("iphone") != -1 || userAgent.indexOf("android") != -1 || userAgent.indexOf("windows phone") != -1) {
        isMobile = true;
    }
    if (isMobile) {

    }


    loadGame();

    //document.getElementById("game-content").style.backgroundColor = colours[getCookie("colour")].title;
}

function loadGame() {


    // Initialise Squares
    for (var y = 500; y <= 1300; y += 100) {
        for (var x = 5; x <= 13; x++) {
            var newSquare = document.createElement("div")
            newSquare.classList.add("square");
            newSquare.id = "square-" + (x + y).toString();
            document.getElementById("game-content").appendChild(newSquare)
        }
    }

    document.getElementById("square-909").classList.add("occupied", "home-square", "connected");
    homeSq = document.getElementById("square-909")
    sqrs.push(homeSq);
    connectedSqrs.push(homeSq);

}

function createNewSquare() {

}

function openPatterns() {
    document.getElementById("game").setAttribute("hidden", "");
    document.getElementById("patterns").removeAttribute("hidden");
}

function openGame() {
    document.getElementById("game").removeAttribute("hidden");
    document.getElementById("patterns").setAttribute("hidden", "");
}