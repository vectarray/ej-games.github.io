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
    "240903": new Post("240903", "Nikon Coolpix L340", "reviews")
}

function setTitle() {
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
        document.getElementsByTagName("h5")[0].innerText = subtitle;

        //console.log(subtitle);

        let post = posts[dateStr];


        document.title = `${post.title} | ${postType} ${titleString}`;
        document.getElementsByTagName("h2")[0].innerText = post.title + (post.type == "reviews" ? " Review" : "");
    }
    catch(e) {
        console.warn(e.message);
        document.title = "Vectarray | Blog"
    }
}

function convertDate(dateStr, inTitle = false) {
    let yearStr = dateStr.slice(0, 2);
    let monthStr = dateStr.slice(2, 4);
    let dayStr = dateStr.slice(4, 6);

    if(inTitle) {
        return (dayStr = "/" + monthStr + "/" + yearStr);
    }

    let writtenDate = new Date(Number.parseInt("20" + yearStr), Number.parseInt(monthStr) - 1, Number.parseInt(dayStr));
    //console.log(writtenDate);
    let suffix = "";
    console.log(Object.keys(suffixes).indexOf(writtenDate.getDate().toString()))
    if(Object.keys(suffixes).indexOf(writtenDate.getDate().toString()) > -1) {
        suffix = suffixes[writtenDate.getDate().toString()];
    }
    else {
        suffix = "th";
    }
    
    return `${days[writtenDate.getDay()]} ${writtenDate.getDate()}${suffix} ${months[writtenDate.getMonth()]} ${writtenDate.getFullYear()}`;
}