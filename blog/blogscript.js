const types = {
    "updates": "Update",
    "projects": "Project",
    "reviews": "Review"
}
const days = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
]
const suffixes = {
    "1": "st",
    "2": "nd",
    "3": "rd",
    "21": "st",
    "22": "nd",
    "23": "rd",
    "31": "st"
}
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

class Post {
    constructor(date, title, type) {
        this.date = date;
        this.title = title;
        this.type = type;

        this.icon = "fa-newspaper";
        this.brand = "Not a review mate"
        if(type == "reviews") {
            this.icon = "fa-pen-clip";
        }
        if(type == "projects") {
            this.icon = "fa-screwdriver-wrench";
        }
    }   
}
const posts = {
    "220407": new Post("220407", "Controversial Colours Cleared", "updates"),
    "221020": new Post("221020", "Todo List & More", "updates"),
    "221022": new Post("221022", "New Name, Same Game", "updates"),
    "230530": new Post("230530", "Where has he been.", "updates"),
    "231219": new Post("231219", "Have I returned?", "updates"),
    "240715": new Post("240715", "Summer Plans", "updates"),
    "240903": new Post("240903", "Nikon; Coolpix L340", "reviews"),
    "240923": new Post("240923", "Canon; IXUS 185", "reviews"),
    "241231": new Post("241231", "2025? More like 45²!!", "updates"),
    "250708": new Post("250708", "EJMusic Channel", "updates"),
    "250722": new Post("250722", "Canon; Powershot SX70HS", "reviews"),
    "250726": new Post("250726", "Samsung Galaxy; Book4 Pro 360", "reviews"),
    "260705": new Post("260705", "A Year On", "updates")
}

function createTimeline() {

    let timeline = document.createElement("div");
    timeline.classList.add("timeline");
    timeline.innerHTML = String.raw`<h5 style="font-size: 1.8em">Blog Timeline</h5>`;

    let curYear = -1;
    let curMonth = -1;
    let oldYear = -2;
    let oldMonth = -2;
    for(var postId of Object.keys(posts)) {
        post = posts[postId];
        if(curYear != post.date.substring(0, 2)) {
            curYear = post.date.substring(0, 2);
            curMonth = post.date.substring(2, 4);
            timeline.innerHTML += String.raw`<h5>${"20" + curYear}</h5><h6>${months[Number.parseInt(curMonth)-1]}`;
        }
        else if(curMonth != post.date.substring(2, 4)) {
            curMonth = post.date.substring(2, 4);
            timeline.innerHTML += String.raw`<h6>${months[Number.parseInt(curMonth)-1]}`;
        }
        if(oldYear == curYear && oldMonth == curMonth) {
            timeline.innerHTML += "<br><br>";
        }
        if(Object.keys(suffixes).indexOf(post.date.substring(4)) > -1) {
            timeline.innerHTML += `<b>${Number.parseInt(post.date.substring(4))}${suffixes[post.date.substring(4)]}</b>`;
        }
        else {
            timeline.innerHTML += `<b>${Number.parseInt(post.date.substring(4))}th</b>`;
        }
        timeline.innerHTML += String.raw`
        <br><a href="/blog/${post.type}/${post.date}">${post.title.replace(";", "")}</a>
        `
        console.log(oldYear, curYear, oldMonth, curMonth);
        console.log(post.title);
        oldYear = curYear;
        oldMonth = curMonth;
    }
    document.body.insertBefore(timeline, document.getElementsByClassName("mainParagraph")[0]);
}

function setTitle() {
    createTimeline();
    document.getElementsByTagName("h2")[0].style.marginTop = "0";
    let firstHalf = document.getElementsByTagName("h2")[0].innerText;
    let partsOfURL = document.URL.split("/");
    let cleanedURL = [];
    for(var item of partsOfURL) {
        if(item != "") {
            cleanedURL.push(item);
        }
    }
    try {
        let postType = types[cleanedURL[cleanedURL.length - 2]];
        let dateStr = cleanedURL[cleanedURL.length - 1];
        let yearStr = dateStr.slice(0, 2);
        let monthStr = dateStr.slice(2, 4);
        let dayStr = dateStr.slice(4, 6);

        let titleString = dayStr + "/" + monthStr + "/" + yearStr;

        let writtenDate = new Date(Number.parseInt("20" + yearStr), Number.parseInt(monthStr) - 1, Number.parseInt(dayStr));
        //console.log(writtenDate);
        let suffix = "";
        if(Object.keys(suffixes).indexOf(writtenDate.getDate()) > -1) {
            suffix = suffixes[writtenDate.getDate()];
        }
        else {
            suffix = "th";
        }
        
        //let subtitle = `${days[writtenDate.getDay()]} ${writtenDate.getDate()}${suffix} ${months[writtenDate.getMonth()]} ${writtenDate.getFullYear()}`;
        let subtitle = convertDate(dateStr, false);
        document.getElementsByClassName("subtitle")[0].innerText = subtitle;

        var initialSpace = document.createElement("div");
        initialSpace.classList.add("space");
        initialSpace.id = "initial-space";
        document.body.insertBefore(initialSpace, document.getElementsByTagName("h2")[0]);


        //console.log(subtitle);

        let post = posts[dateStr];

        var title = post.title.replace(";", "");
        var brand = "";


        if(cleanedURL[cleanedURL.length - 2] == "reviews") {
            var titleSplit = post.title.split(";");
            titleSplit[1] = titleSplit[1].trimStart();

            title = titleSplit[1];
            brand = titleSplit[0];

            var newBrand = document.createElement("h4");
            newBrand.classList.add("review-brand");
            newBrand.innerText = brand;

            document.body.insertBefore(newBrand, document.getElementsByTagName("h2")[0]);
        }


        document.title = `${brand} ${title} | ${postType} ${titleString}`;
        document.getElementsByTagName("h2")[0].innerText = title + (post.type == "reviews" ? " Review" : "");
    }
    catch(e) {
        console.warn(e.message);
        document.title = "Vectarray | Blog"
    }
}

function convertDate(dateStr, inTitle = false, shortFormat = false) {
    let yearStr = dateStr.slice(0, 2);
    let monthStr = dateStr.slice(2, 4);
    let dayStr = dateStr.slice(4, 6);

    if(inTitle) {
        return (dayStr = "/" + monthStr + "/" + yearStr);
    }

    let writtenDate = new Date(Number.parseInt("20" + yearStr), Number.parseInt(monthStr) - 1, Number.parseInt(dayStr));
    //console.log(writtenDate);
    let suffix = "";
    //console.log(Object.keys(suffixes).indexOf(writtenDate.getDate().toString()))
    if(Object.keys(suffixes).indexOf(writtenDate.getDate().toString()) > -1) {
        suffix = suffixes[writtenDate.getDate().toString()];
    }
    else {
        suffix = "th";
    }

    if(!shortFormat) {
        return `${days[writtenDate.getDay()]} ${writtenDate.getDate()}${suffix} ${months[writtenDate.getMonth()]} ${writtenDate.getFullYear()}`;
    }
    else {
        return `${writtenDate.getDate()} ${months[writtenDate.getMonth()].substring(0, 3)} ${writtenDate.getFullYear()}`;
    }
}