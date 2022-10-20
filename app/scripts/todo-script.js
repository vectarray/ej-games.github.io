let todoLists = {
    "lists": [
        {
            "name": "template",
            "displayName": "Template",
            "items": [
                {
                    "name": "template-item",
                    "displayName": "Template Item",
                    "status": "not-done"
                }
            ]
        }
    ]
}

const icons = {
    "icons": [
        {
            "name": "status-completed",
            "icon": "fa-regular fa-circle-check complete-icon"
        },
        {
            "name": "status-progress",
            "icon": "fa-regular fa-circle-play complete-icon"
        },
        {
            "name": "status-waiting",
            "icon": "fa-regular fa-clock complete-icon"
        },
        {
            "name": "status-not-done",
            "icon": "fa-regular fa-circle complete-icon"
        }
    ]
}

let canClose = false;
let canListClose = false;
let currentList = "";
let creatingItem = false;
let creatingList = false;

let itemInput = "";
let listInput = "";


function showInfo(itemFor, creating) {
    creatingItem = creating;
    var itemFound = false;
    var item = {};
    for(var list of todoLists.lists) {
        for(var listItem of list.items) {
            if(listItem.name == itemFor) {
                item = listItem;
                itemFound = true;
                break;
            }
        }
    }
    if(!itemFound) {
        return;
    }

    var itemScreen = document.getElementById("item-info");
    var infoDimmer = document.getElementById("info-dimmer");

    itemScreen.getElementsByTagName("hide")[0].innerText = item.name;
    document.getElementById("name-input").value = inverseDisplayName(item.displayName);
    itemInput = document.getElementById("name-input").value;

    for(var btn of Array.from(itemScreen.getElementsByClassName("set-status-button"))) {
        if(item.status != btn.classList[1].replace("status-", "")) {
            btn.removeAttribute("disabled");
        }
        else {
            btn.setAttribute("disabled", "true");
        }
    }

    canClose = false;
    infoDimmer.style.display = "block";
    infoDimmer.style.opacity = 1;
    itemScreen.style.top = "25%";

    setTimeout(function() {
        canClose = true;
    }, 250);
}

function hideInfoScreen() {
    if(!canClose) { return; }
    var itemScreen = document.getElementById("item-info");
    var infoDimmer = document.getElementById("info-dimmer");

    var item = getItem(itemScreen.getElementsByTagName("hide")[0].innerText);

    if(item == null) {
        return;
    }

    var versionsFound = 1
    for(var listItem of getList(currentList).items) {
        if(listItem.name == handleName(document.getElementById("name-input").value)) {
            versionsFound++;
        }
    }
    if(versionsFound > 1 && itemInput != document.getElementById("name-input").value) {
        document.getElementById("name-input").value = itemScreen.getElementsByTagName("hide")[0].innerText.replace(/-/g, " ");
        return;
    }

    item.displayName = handleDisplayName(document.getElementById("name-input").value);
    item.name = handleName(document.getElementById("name-input").value);
    console.log(item.name + ", " + item.displayName);

    creatingItem = false;
    localStorage.setItem("todoLists", JSON.stringify(todoLists));

    infoDimmer.style.opacity = 0;
    itemScreen.style.top = "100%";
    showList(currentList);
    setTimeout(function() {
        infoDimmer.style.display = "none";
    }, 250);
}

function setStatus(statusName) {
    var item = getItem(document.getElementById("item-info").getElementsByTagName("hide")[0].innerText);

    item.status = statusName;
    showInfo(document.getElementById("item-info").getElementsByTagName("hide")[0].innerText);

    localStorage.setItem("todoLists", JSON.stringify(todoLists));
}

function loadLists() {
    document.getElementById("info-dimmer").style.opacity = 0;
    document.getElementById("info-dimmer").addEventListener("click", hideInfoScreen);
    document.getElementById("list-dimmer").style.opacity = 0;
    document.getElementById("list-dimmer").addEventListener("click", stopEditingList);
    /*var newTodoLists = todoLists;
    for(var list of newTodoLists.lists) {
        for(var item of list.items) {
            item.name = handleName(item.name);
            item.displayName = handleDisplayName(item.displayName);
        }
        list.name = handleName(list.name);
        list.displayName = handleDisplayName(list.displayName);
    }
    todoLists = newTodoLists;
    localStorage.setItem("todoLists", JSON.stringify(todoLists));*/
    if(localStorage.getItem("todoLists") != "") {
        try {
            todoLists = JSON.parse(localStorage.getItem("todoLists"));
        }
        catch(e) {
            if(e instanceof SyntaxError)
            localStorage.setItem("todoLists", JSON.stringify(todoLists));
        }
    }
    else {
        localStorage.setItem("todoLists", JSON.stringify(todoLists));
    }
    console.log(localStorage.getItem("todoLists"));
    for(var item of todoLists.lists) {
        if(item.name == "template") {
            continue;
        }
        console.log(item.name);
    }
    loadListDisplay();
}

function handleName(name) {
    return name.replace(/[=;"`\\<>]/g, "").replace(/ /g, "-").toLowerCase();
}

function handleDisplayName(name) {
    return name.replace(/ /g, "_").replace(/[=;"`\\<>]/g, "");
}

function inverseDisplayName(name) {
    return name.replace(/_/g, " ");
}

function getItem(name) {
    var itemFound = false;
    var item = {};
    for(var list of todoLists.lists) {
        for(var listItem of list.items) {
            if(listItem.name == name) {
                item = listItem;
                itemFound = true;
                break;
            }
        }
    }
    if(!itemFound) {
        return null;
    }
    else {
        return item;
    }
}

function getList(name) {
    var list = [];
    var listFound = false;
    for(var item of todoLists.lists) {
        if(item.name == name) {
            list = item;
            listFound = true;
            break;
        }
    }
    if(!listFound) {
        return null;
    }
    else {
        return list;
    }
}

function loadListDisplay() {
    for(var listDisplay of Array.from(document.getElementById("list-content").getElementsByTagName("div"))) {
        listDisplay.remove();
    }
    for(var list of todoLists.lists) {
        var allCompleted = true;
        for(var item of list.items) {
            if(item.status != "completed") {
                allCompleted = false;
                break;
            }
        }
        var iconClass = "";
        for(var icon of icons.icons) {
            if(icon.name.replace("status-", "") == (allCompleted ? "completed" : "not-done")) {
                iconClass = icon.icon;
            }
        }
        var newDisplay = document.createElement("div");
        newDisplay.id = list.name;
        newDisplay.className = "lists-item";
        newDisplay.innerHTML = String.raw`<button class="list-button">${inverseDisplayName(list.displayName)}</button>
        <i class="fa-solid fa-pen-to-square edit-icon" onclick="editList(this.parentElement.id)"></i>`;
        newDisplay.getElementsByClassName("list-button")[0].addEventListener("click", function() {
            showList(this.parentElement.id);
        });
        document.getElementById("list-content").appendChild(newDisplay);
    }


    var highestId = 0;
    for(var list of todoLists.lists) {
        if(list.name.toLowerCase().match(/new-list-[0-9]+$/i) != null) {
            var thisId = Number(list.name.replace("new-list-", ""));
            if(thisId > highestId) {
                highestId = thisId;
            }
        }
    }

    var addButton = document.createElement("div");
    addButton.id = "add-button";
    addButton.className = "lists-item";
    addButton.innerHTML = String.raw`<i class="fa-regular fa-plus complete-icon"></i>
    <button class="list-button" onclick="createList('new-list-${highestId + 1}')">Add list</button>`;
    document.getElementById("list-content").appendChild(addButton);
    addButton.getElementsByTagName("i")[0].style.backgroundColor = "var(--elementBG)";
    addButton.getElementsByTagName("i")[0].style.cursor = "text";
    
    showList(todoLists.lists[0].name);
}

function editList(listId, creating) {
    creatingList = creating;
    var list = getList(listId)

    var listInfo = document.getElementById("list-info");
    var infoDimmer = document.getElementById("list-dimmer");

    listInfo.getElementsByTagName("hide")[0].innerText = list.name;
    document.getElementById("list-name-input").value = inverseDisplayName(list.displayName);

    listInput = document.getElementById("list-name-input").value;

    canListClose = false;
    infoDimmer.style.display = "block";
    infoDimmer.style.opacity = 1;
    listInfo.style.top = "25%";

    setTimeout(function() {
        canListClose = true;
    }, 250);
}

function stopEditingList() {
    if(!canListClose) { return; }
    var listInfo = document.getElementById("list-info");
    var infoDimmer = document.getElementById("list-dimmer");

    var item = getList(listInfo.getElementsByTagName("hide")[0].innerText);

    if(item == null) {
        return;
    }

    var versionsFound = 1
    for(var list of todoLists.lists) {
        console.log(list.name, "exists,", handleName(document.getElementById("list-name-input").value), "is being made.")
        if(list.name == handleName(document.getElementById("list-name-input").value)) {
            versionsFound++;
        }
    }
    if(versionsFound > 1 && listInput != document.getElementById("list-name-input").value) {
        document.getElementById("list-name-input").value = listInfo.getElementsByTagName("hide")[0].innerText.replace(/-/g, " ");
        return;
    }

    item.displayName = handleDisplayName(document.getElementById("list-name-input").value);
    item.name = handleName(document.getElementById("list-name-input").value);
    console.log(item.name + ", " + item.displayName);

    creatingList = false;
    localStorage.setItem("todoLists", JSON.stringify(todoLists));

    infoDimmer.style.opacity = 0;
    listInfo.style.top = "100%";
    showList(currentList);
    loadListDisplay();
    setTimeout(function() {
        infoDimmer.style.display = "none";
    }, 250);
}

function deleteList(listId) {
    var foundList = null;
    for(var list of todoLists.lists) {
        if(list.name == listId) {
            foundList = list;
        }
    }
    if(foundList == null) {
        throw "List '" + listId + "' not found in array!"
    }
    else {
        if(todoLists.lists.length <= 1) {
            popup("Can't Delete", "You can't delete this list, or there will be none left.", handleSound("bad"));
            return;
        }
        stopEditingList();
        todoLists.lists.splice(todoLists.lists.indexOf(foundList), 1);
        localStorage.setItem("todoLists", JSON.stringify(todoLists));
        loadListDisplay();
        showList(todoLists.lists[0]);
    }
}

function createList(listId) {
    todoLists.lists.push({
        "name": listId,
        "displayName": "new list " + listId.replace("new-list-", ""),
        "items": []
    });
    localStorage.setItem("todoLists", JSON.stringify(todoLists));
    editList(listId, true);
}

function showList(listId) {
    var list = [];
    var listFound = false;
    for(var item of todoLists.lists) {
        if(item.name == listId) {
            list = item;
            listFound = true;
            break;
        }
    }
    if(!listFound) {
        return;
    }
    currentList = listId;
    for(var item of Array.from(document.getElementById("item-content").getElementsByTagName("div"))) {
        item.remove();
    }
    document.getElementById("list-name-display").innerText = inverseDisplayName(list.displayName);
    for(var item of list.items) {
        //console.log(item);
        var newItem = document.createElement("div");

        var correctIcon = "";
        for(var icon of icons.icons) {
            if(icon.name == "status-" + item.status) {
                correctIcon = icon.icon;
                break;
            }
        }
        if(correctIcon == "") { return; }


        document.getElementById("item-content").appendChild(newItem);
        newItem.outerHTML = String.raw`<div id="${item.name}" class="todo-list-item disable-select">
            <i class="${correctIcon}" onclick="toggleComplete(this.parentElement.id)"></i>
            <button class="view-item-button" onclick="showInfo(this.parentElement.id)">${inverseDisplayName(item.displayName)}</button>
        </div>`;
    }
    var newItem = document.createElement("div");

    var completed = 0;
    for(var item of list.items) {
        if(item.status == "completed") {
            completed++;
        }
    }
    var percentage = Math.round((completed / list.items.length) * 100);
    if(list.items.length < 1) {
        percentage = 0;
    }
    document.getElementById("list-progress-value").innerText = String.raw`${completed}/${list.items.length} (${percentage}%)`
    document.getElementById("list-progress-bar").style.width = percentage.toString() + "%";

    document.getElementById("item-content").appendChild(newItem);
    var highestId = 0;
    for(var list of todoLists.lists) {
        for(var item of list.items) {
            if(item.name.toLowerCase().match(/new-item-[0-9]+$/i) != null) {
                var thisId = Number(item.name.replace("new-item-", ""));
                if(thisId > highestId) {
                    highestId = thisId;
                }
            }
        }
    }
    newItem.outerHTML = String.raw`<div id="new-item-${highestId + 1}" class="todo-list-item">
        <i class="fa-regular fa-plus complete-icon" style="background-color: var(--elementBG); cursor: text;"></i>
        <button class="view-item-button" onclick="createItem(this.parentElement.id)">Add item</button>
    </div>`;
    console.log(todoLists.lists);
}

function toggleComplete(itemName) {
    var item = getItem(itemName);
    if(item.status == "completed") {
        item.status = "not-done";
    }
    else {
        item.status = "completed";
        playSound(handleSound("good"))
    }
    localStorage.setItem("todoLists", JSON.stringify(todoLists));
    showList(currentList);
}

function createItem(itemName) {
    getList(currentList).items.push({
        "name": itemName,
        "displayName": "new item " + itemName.replace("new-item-", ""),
        "status": "not-done"
    });
    localStorage.setItem("todoLists", JSON.stringify(todoLists));
    showInfo(itemName, true);
}
function deleteItem(itemName) {
    var foundItem = null;
    for(var item of getList(currentList).items) {
        if(item.name == itemName) {
            foundItem = item;
        }
    }
    if(foundItem == null) {
        throw "Item '" + itemName + "' not found in array of items!"
    }
    else {
        hideInfoScreen();
        getList(currentList).items.splice(getList(currentList).items.indexOf(foundItem), 1);
        localStorage.setItem("todoLists", JSON.stringify(todoLists));
        showList(currentList);
    }
}