function cannotDownload() {
    createPopup('Unavailable', 'You cannot download this game, it has been discontinued.', "sounds/error.wav");
}
function cannotDownloadMobile(gameName) {
    createPopup("Game Unavailable", String.raw`This game (${gameName != null ? "<b>" + gameName + "</b>" : "the one you're trying to access"}) is unavailable
    because it is mobile-only and is no longer supported. Other games, that are not iOS-only, can be accessed by clicking on the other cards.`, "sounds/error.wav");
}
function promptRobloxVisit(id) {
    createConfirm('Leave website?', 'Are you sure you want to leave EJGames and visit the Roblox game?', "sounds/bad.wav", "Yes, take me there.",
    function() {
        window.location.href = "https://www.roblox.com/games/" + id.toString();
    });
}
function promptOldGame() {
    createConfirm('Leave website?', "Leave EJGames and visit the GitHub page for my old game installs?", "sounds/bad.wav", "Yes! I mean, it's not that bad, is it?",
    function() {
        window.location.href = "https://github.com/ej-games/old-games";
    });
}
function incomplete(gameName) {
    createPopup("Not Available!", String.raw`This game (${gameName != null ? "<b>" + gameName + "</b>" : "the one you're trying to access"}) is unavailable
    because it's not ready to be release to the public yet! Come back soon and maybe it'll be available.`, "sounds/error.wav");
}