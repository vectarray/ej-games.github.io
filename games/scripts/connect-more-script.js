var points = "0";

var inGame = true;
var spawningSquare = false;


var isMobile = false;
var longLoadingTime = false;

var currentTime = 0;
function update() {
    currentTime = Math.round(currentTime + 20); // Milliseconds
    if(currentTime % 200 == 0 && !spawningSquare) {
        var hasSquare = false;
        for(var item of document.getElementsByClassName("occupied")) {
            if(!item.classList.contains("connected")) {
                hasSquare = true;
                break;
            }
        }
        if(!hasSquare) {
            createNewSquare();
        }
    }

    if(longLoadingTime) {
        document.getElementById("game-heading").innerHTML = "Game<small><small><br>(taking a long time to load)</small></small>";
    }
    else {
        document.getElementById("game-heading").innerHTML = "Game";
    }

    document.getElementById("points-display").textContent = "Points: " + points;
}

function handleInput(e) {
    //console.log("moving!");
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

function createSequence(moveDir) {
    var moveSequence = [];
    var currentNumber = 0;
    if(moveDir == "left") {
        currentNumber = 405;
        for(var i = 0; i < 81; i++) {
            currentNumber += 100;
            if(currentNumber > 1313) {
                currentNumber -= 899;
            }
            moveSequence.push(currentNumber);
        }
    }
    else if(moveDir == "right") {
        currentNumber = 1413;
        for(var i = 0; i < 81; i++) {
            currentNumber -= 100;
            if(currentNumber < 505) {
                currentNumber += 899;
            }
            moveSequence.push(currentNumber);
        }
    }
    else if(moveDir == "down") {
        currentNumber = 1304;
        for(var i = 0; i < 81; i++) {
            currentNumber += 1;
            if(currentNumber % 100 > 13) {
                currentNumber -= 109;
            }
            moveSequence.push(currentNumber);
        }
    }
    else if(moveDir == "up") {
        currentNumber = 514;
        for(var i = 0; i < 81; i++) {
            currentNumber -= 1;
            if(currentNumber % 100 < 5) {
                currentNumber += 109;
            }
            moveSequence.push(currentNumber);
        }
    }
    //console.log(moveSequence);
    return moveSequence;
}

function checkAround(number) {
    var thisSquare = document.getElementById("square-" + number.toString());
    var up = document.getElementById("square-" + (number - 100).toString());
    var down = document.getElementById("square-" + (number + 100).toString());
    var left = document.getElementById("square-" + (number - 1).toString());
    var right = document.getElementById("square-" + (number + 1).toString());

    if(up != null && up.classList.contains("occupied") && !up.classList.contains("connected")) {
        return -100;
    }
    else if(down != null && down.classList.contains("occupied") && !down.classList.contains("connected")) {
        return 100;
    }
    else if(left != null && left.classList.contains("occupied") && !left.classList.contains("connected")) {
        return -1;
    }
    else if(right != null && right.classList.contains("occupied") && !right.classList.contains("connected")) {
        return 1;
    }
    else {
        return null;
    }
}

// Up=-100, Down=100, Left=-1, Right=1

function move(dir) {
    console.log(patterns);
    if(spawningSquare || (!inGame && !isMobile)) return;
    if(document.getElementById("game-content").hasAttribute("hidden")) {
        document.getElementById("game-content").removeAttribute("hidden");
        document.getElementById("open-game-button").remove();
    }
    const directions = {
        "-100": "up",
        "100": "down",
        "-1": "left",
        "1": "right"
    }
    //console.log(dir.toString());
    var sequence = createSequence(directions[dir.toString()]);
    //console.log(sequence);
    //var currentTimeout = 0;
    for(var i = 0; i < sequence.length; i++) {
        //currentTimeout += 20;
        var squareNumber = sequence[i]
        var sqr = document.getElementById("square-" + squareNumber.toString());
        //console.log(sqr.id);
        if(sqr.classList.contains("connected")) {
            var newSquare = document.getElementById("square-" + (squareNumber + dir).toString());
            if(newSquare == null) {
                confirm("Game over!", "You went off the map and ended up with 9...9...9...9...9... points!", handleSound("bad"), "Play Again", function() {
                    location.reload();
                });
                inGame = false;
            }
            //console.log(newSquare.id);
            newSquare.classList = sqr.classList;
            sqr.className = "square";

            var connectedDirection =  checkAround(Number(newSquare.id.replace("square-", "")))
            if(connectedDirection != null) {
                var newConnectedSquare = document.getElementById("square-" + (Number(newSquare.id.replace("square-", "")) + connectedDirection).toString());
                //console.log(newConnectedSquare.id);
                newConnectedSquare.classList.add("connected");
                spawnNewSquare();
            }
        }
    }

    var foundPattern = null;
    for(var pId = 0; pId < Object.keys(patterns).length; pId++) {
        var patternName = Object.keys(patterns)[pId];
        var pattern = patterns[patternName].squares;
        if(patterns[patternName].completed || document.getElementsByClassName("connected").length > pattern.length) {
            continue;
        }
        var homeSqPos = Number(document.getElementsByClassName("home-square")[0].id.replace("square-", ""));
        var homeSqOffset = homeSqPos - 909;
        var currentOffset = 0;
        var patternFound = false;
        var currentPatternCopy = [];
        for(var offsetIndex = 0; offsetIndex < pattern.length; offsetIndex++) {
            var toPrint = "";
            toPrint += "Pattern '" + patternName + "' (which is " + pattern.toString() + ") -- ";
            toPrint += "homeSqOffset is " + homeSqOffset.toString() + " -- ";
            if(offsetIndex > 0) {
                currentOffset = pattern[offsetIndex - 1] - pattern[offsetIndex]
            }
            toPrint += "current offset is " + currentOffset.toString() + " -- patternCopy is ";
            var patternCopy = [];
            if(offsetIndex == 0) {
                currentPatternCopy = Array.from(pattern);
            }
            for(var copySquare of currentPatternCopy) {
                patternCopy.push(copySquare + currentOffset);
                toPrint += (copySquare + currentOffset + homeSqOffset).toString() + ", ";
            }
            currentPatternCopy = Array.from(patternCopy);
            toPrint += " -- ";
            if(patternExists(patternCopy, homeSqOffset)) {
                patternFound = true;
                toPrint += "pattern exists? " + patternExists(patternCopy, homeSqOffset).toString();
                foundPattern = patternName;
                //console.log(toPrint);
                break;
            }
            //console.log(toPrint);
        }
        if(patternFound) {
            break;
        }
    }
    if(foundPattern != null) {
        points = (Number(points) + patterns[foundPattern].points).toString();
        setCookie("connectMorePoints", points, 730);
        patterns[foundPattern].completed = true;
        playSound(handleSound("prompt"));
        createPopupText("+" + patterns[foundPattern].points.toString() + " points<br>" + patterns[foundPattern].displayName, document.getElementById("points-popup"));
    }
}

function patternExists(pattern, homeSqOffset) {
    var squareMissing = false;
    for(var square of pattern) {
        console.log("square-" + square.toString());
        var squareId = (square + homeSqOffset).toString();
        if(document.getElementById("square-" + squareId) == null || !document.getElementById("square-" + squareId).classList.contains("connected")) {
            squareMissing = true;
            break;
        }
    }
    return !squareMissing;
}

function spawnNewSquare() {
    newSquarePos();
    spawningSquare = true;
    var attempts = 0;
    function newSquarePos() {
        longLoadingTime = false;
        if(attempts > 100) {
            longLoadingTime = true;
        }
        var canSpawn = true;
        var newSquareX = randInt(5, 13);
        var newSquareY = randInt(5, 13);
        for(var occ of document.getElementsByClassName("occupied")) {
            var position = Number(occ.id.replace("square-", ""));
            var posY = Math.round(position / 100);
            var posX = position % 100;
            //console.log(newSquareX + (newSquareY * 100));
            
            var lerpedDistance = lerp(Math.abs(newSquareX - posX), Math.abs(newSquareY - posY), 0.5);
            //console.log(lerpedDistance);
            if(lerpedDistance <= 1) {
                canSpawn = false;
                break;
            }
        }
        if(canSpawn) {
            setTimeout(function() {
                createSquareAtPos(newSquareX, newSquareY);
            }, 100);
        }
        else {
            attempts += 1;
            setTimeout(newSquarePos, 20);
        }
    }

    function createSquareAtPos(x, y) {
        var newPosition = x + (y * 100);
        document.getElementById("square-" + newPosition.toString()).classList.add("occupied");
        spawningSquare = false;
        longLoadingTime = false;
    }
}

let patterns = {}

function setPatterns(ptns) {
    patterns = ptns;
    onLoad();
}

function onLoad() {
    inGame = false;
    setInterval(update, 20);

    document.addEventListener("keydown", handleInput);
    document.getElementById("button-move-down").addEventListener("click", function() { move(100); });
    document.getElementById("button-move-up").addEventListener("click", function() { move(-100); });
    document.getElementById("button-move-left").addEventListener("click", function() { move(-1); });
    document.getElementById("button-move-right").addEventListener("click", function() { move(1); });

    // Load points
    if (getCookie("connectMorePoints") != "") {
        points = getCookie("connectMorePoints");
    }
    else {
        points = "0";
        setCookie("connectMorePoints", "0", 730);
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
    createSequence("down");

    //console.log(patterns);

    //document.getElementById("game-content").style.backgroundColor = colours[getCookie("colour")].title;
}

function loadGame() {


    // Initialise Squares
    for (var y = 500; y <= 1300; y += 100) {
        for (var x = 5; x <= 13; x++) {
            var newSquare = document.createElement("div")
            newSquare.classList.add("square");
            newSquare.id = "square-" + (x + y).toString();
            //newSquare.innerHTML = (x + y);
            newSquare.onclick = function() {
                this.classList.add("occupied");
            }
            document.getElementById("game-content").appendChild(newSquare)
        }
    }

    document.getElementById("square-909").classList.add("occupied", "home-square", "connected");

    // Mobile buttons
    if(isMobile) {
        document.getElementById("mobile-buttons").removeAttribute("hidden");
    }

    spawnNewSquare();

}

function createNewSquare() {

}

function openPatterns() {
    document.getElementById("game").setAttribute("hidden", "");
    document.getElementById("patterns").removeAttribute("hidden");
    inGame = false;
}

function openGame() {
    document.getElementById("game").removeAttribute("hidden");
    document.getElementById("patterns").setAttribute("hidden", "");
    inGame = true;
}

function loadPatterns() {
    fetch("/games/scripts/connect-more-patterns.json")
    .then(response => response.json())
    .then(data => setPatterns(data))
    .catch(err => console.log(err))
}