
function moveInRight(element, slow) {
    setTimeout(function() {
        /*element.style.transition = "transform 0.5s, opacity 0.5s";
        element.style.opacity = "100%";
        element.style.transform = "translateY(-20px)";*/
        element.style.animation = String.raw`moveInRight ${slow ? "1.5" : "0.7"}s cubic-bezier(0, 0, 0, 1)`
        setTimeout(function() {
            element.style.opacity = 100;
        }, 500)
    }, 200)
}

function moveInElement(element, slow) {
    setTimeout(function() {
        /*element.style.transition = "transform 0.5s, opacity 0.5s";
        element.style.opacity = "100%";
        element.style.transform = "translateY(-20px)";*/
        element.style.animation = String.raw`moveInElement ${slow ? "1.5" : "0.7"}s cubic-bezier(0, 0, 0, 1)`
        setTimeout(function() {
            element.style.opacity = 100;
        }, 500)
    }, 200)
}

function checkForVisibility(className, slow) {
    for(var item of this.document.getElementsByClassName(className)) {
        var element = item;
        var position = element.getBoundingClientRect();

        // checking for partial visibility
        if(position.top < window.innerHeight - (slow ? 250 : 0)  && position.bottom >= 0) {
            moveInElement(element, slow);
        }
    }
    window.addEventListener('scroll', function() {
        for(var item of this.document.getElementsByClassName(className)) {
            var element = item;
            var position = element.getBoundingClientRect();
            //console.log(element.innerHTML, "(" + position.top.toString() + ")", "needs to get to", window.innerHeight);
    
            // checking for partial visibility
            if(position.top < window.innerHeight - (slow ? 250 : 0)  && position.bottom >= 0) {
                moveInElement(element, slow);
            }
        }
    });
}

function checkForVisibilityTag(tagName, slow) {
    for(var item of this.document.getElementsByTagName(tagName)) {
        var element = item;
        var position = element.getBoundingClientRect();

        // checking for partial visibility
        if(position.top < window.innerHeight - (slow ? 250 : 0)  && position.bottom >= 0) {
            moveInElement(element, slow);
        }
    }
    window.addEventListener('scroll', function() {
        for(var item of this.document.getElementsByTagName(tagName)) {
            var element = item;
            var position = element.getBoundingClientRect();
    
            // checking for partial visibility
            if(position.top < window.innerHeight - (slow ? 250 : 0)  && position.bottom >= 0) {
                moveInElement(element, slow)
            }
        }
    });
}
function checkForVisibilityRight(className, slow) {
    for(var item of this.document.getElementsByClassName(className)) {
        var element = item;
        var position = element.getBoundingClientRect();

        // checking for partial visibility
        if(position.top < window.innerHeight - (slow ? 250 : 0) && position.bottom >= 0) {
            moveInRight(element, slow);
        }
    }
    window.addEventListener('scroll', function() {
        for(var item of this.document.getElementsByClassName(className)) {
            var element = item;
            var position = element.getBoundingClientRect();
    
            // checking for partial visibility
            if(position.top < window.innerHeight - (slow ? 250 : 0) && position.bottom >= 0) {
                moveInRight(element, slow);
            }
        }
    });
}

function checkForVisibilityTagRight(tagName, slow) {
    for(var item of this.document.getElementsByTagName(tagName)) {
        var element = item;
        var position = element.getBoundingClientRect();

        // checking for partial visibility
        if(position.top < window.innerHeight - (slow ? 250 : 0)  && position.bottom >= 0) {
            moveInRight(element, slow);
        }
    }
    window.addEventListener('scroll', function() {
        for(var item of this.document.getElementsByTagName(tagName)) {
            var element = item;
            var position = element.getBoundingClientRect();
    
            // checking for partial visibility
            if(position.top < window.innerHeight - (slow ? 250 : 0)  && position.bottom >= 0) {
                moveInRight(element, slow)
            }
        }
    });
}

function setupTransitions() {
    checkForVisibility("moveIn", false);
    checkForVisibilityRight("moveInRight", false);
    checkForVisibility("moveInSlow", true);
    checkForVisibilityRight("moveInRightSlow", true);

    for(var moveIn of document.getElementsByClassName("moveIn")) {
        moveIn.style.opacity = "0%";
    }
    for(var moveIn of document.getElementsByClassName("moveInRight")) {
        moveIn.style.opacity = "0%";
    }
    for(var moveIn of document.getElementsByClassName("moveInSlow")) {
        moveIn.style.opacity = "0%";
    }
    for(var moveIn of document.getElementsByClassName("moveInRightSlow")) {
        moveIn.style.opacity = "0%";
    }
}