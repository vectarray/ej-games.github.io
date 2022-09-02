function htt() { // Short for "Hide ToolTip"
        tooltip.style.opacity = "0";
    }
    
function stt(text) { // Short for "Show ToolTip"
    var tooltip = document.getElementById("tooltip");
    tooltip.innerHTML = text;
    tooltip.style.opacity = "100";
}

function updateTooltip(e) {
    var tooltip = document.getElementById("tooltip");
    tooltip.style.left = "calc(" + ((e.clientX / innerWidth) * 100) + "vw + 10px)";
    tooltip.style.top = "calc(" + ((e.clientY / innerHeight) * 100) + "vh + 10px)";
}

function setupTooltips() {
    var tooltip = document.createElement("span");
    tooltip.id = "tooltip";
    tooltip.style.opacity = "0";
    document.body.appendChild(tooltip);

    for(var hover of document.getElementsByClassName("hover")) {
        hover.addEventListener('mouseenter', function(e) {
            stt(e.target.getElementsByTagName("hide")[0].innerHTML);
        });
        hover.addEventListener('mouseleave', htt);
        /*hover.onmouseenter = function() {
            stt(hover.getElementsByClassName("hide")[0].innerHTML);
        };
        hover.onmouseleave = htt;*/
    }
    document.addEventListener('mousemove', updateTooltip, false);
}
