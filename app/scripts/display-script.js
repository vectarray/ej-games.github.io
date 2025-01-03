const daysWithSt = [1, 21, 31];
const daysWithNd = [2, 22];
const daysWithRd = [3, 23];

const monthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

var displayNo = 0;
var canChange = true;

var weatherCity = "London";

const apiKey = "55a2f011abbdb1a83198e7fcab6ca594";

var nowTemp = 5;
var nowFeelsLike = 5;
var nowIcon = "https://openweathermap.org/img/wn/03d@4x.png";
var nowCondition = 801;

var futureTemp1 = 7;
var futureFeelsLike1 = 7;
var futureHour1 = 12;
var futureIcon1 = "https://openweathermap.org/img/wn/03d@4x.png";
var futureCondition1 = 801;

// %d is time of day
// %t is temperature
// %f is feels like

const nowTexts = {
    200: {
        short: "Careful out there",
        long: "There's a thunderstorm!"
    },
    300: {
        short: "It's drizzling",
        long: "Cancel your plans, then."
    },
    500: {
        short: "It's raining",
        long: "Have a lovely time outside then!"
    },
    600: {
        short: "It's snowing!",
        long: "It's snowing right now. Just look."
    },
    700: {
        short: "It's misty",
        long: "And hard to see."
    },
    711: {
        short: "It's smoky",
        long: "Don't choke yourself, thanks."
    },
    721: {
        short: "It's hazy",
        long: "Isn't that nice?"
    },
    731: {
        short: "It's dusty",
        long: "Don't ruin your lungs, thanks."
    },
    741: {
        short: "It's foggy",
        long: "Isn't that nice?"
    },
    751: {
        short: "Sand is in the air",
        long: "Not sure how that happened."
    },
    761: {
        short: "It's dusty out ther",
        long: "Not sure how that happened."
    },
    762: {
        short: "Oh, no",
        long: "Where's this ash coming from?"
    },
    771: {
        short: "What is 'squall'?",
        long: "Apparently there's squall out there."
    },
    781: {
        short: "Leave now",
        long: "Says there's a tornado, I don't believe it."
    },
    800: {
        short: "The skies are clear",
        long: "Enjoy the view."
    },
    801: {
        short: "It's mostly clear",
        long: "Just a few clouds."
    },
    802: {
        short: "It's partly cloudy",
        long: "A few scattered clouds."
    },
    803: {
        short: "It's mostly cloudy",
        long: "Typical British weather."
    },
    804: {
        short: "It's overcast",
        long: "How joyous."
    }
};

// 4xx is custom
const futureTexts = {
    200: {
        ifSame: {
            short: "Storm's not stoppin",
            long: "This storm is really going at it."
        },
        ifDifferent: {
            short: "It's getting stormy",
            long: "A thunderstorm is approaching from the west!"
        }
    },
    300: {
        ifSame: {
            short: "Ongoing drizzle...",
            long: "The showers aren't stopping for at least 3 hours."
        },
        ifDifferent: {
            short: "The showers are coming",
            long: "It's going to rain soon!"
        }
    },
    /*400: { // Getting warm (>24)
        short: "Getting warm!",
        long: "It's only getting warmer from here."
    },
    401: { // Getting hot (>27)
        short: "Getting hot!",
        long: "It's only getting hotter from here."
    },
    402: { // Same temperature (>26)
        short: "Not getting cooler",
        long: "The heat's staying for a while."
    },
    403: { // Cooling down (>27)
        short: "Cooling down",
        long: "Should be cooling down now."
    },*/
    500: {
        ifSame: {
            short: "Still rainin'",
            long: "In 3 hours' time, you'll be soaking wet."
        },
        ifDifferent: {
            short: "Raining soon",
            long: "It's going to start raining."
        }
    },
    600: {
        ifSame: {
            short: "Still snowing",
            long: "The snow isn't stopping."
        },
        ifDifferent: {
            short: "It's going to snow!",
            long: "Children, look outside!"
        }
    },
    700: {
        ifSame: {
            short: "Still not clear",
            long: "There's still stuff in the air."
        },
        ifDifferent: {
            short: "The air is thickening",
            long: "Prepare to lose all visibility!"
        }
    },
    800: {
        ifSame: {
            short: "Skies are still clear",
            long: "Still no clouds to be seen."
        },
        ifDifferent: {
            short: "The skies are clearing",
            long: "I can see clearly now, etc."
        }
    },
    801: {
        ifSame: {
            short: "Still some clouds",
            long: "Mostly clear skies though."
        },
        ifDifferent: {
            short: "Almost clear skies",
            long: "The clouds will be mostly scattered."
        },
        ifGettingClearer: {
            short: "Getting clearer",
            long: "The clouds are scattering slightly."
        },
        ifGettingCloudier: {
            short: "Clouds building up",
            long: "More clouds are accumulating."
        }
    },
    802: {
        ifSame: {
            short: "Still quite cloudy",
            long: "The sky will be covered for a while."
        },
        ifDifferent: {
            short: "Half clouds soon",
            long: "The sky will be halfway covered."
        },
        ifGettingClearer: {
            short: "Getting clearer",
            long: "The clouds are scattering slightly."
        },
        ifGettingCloudier: {
            short: "Clouds building up",
            long: "More clouds are accumulating."
        }
    },
    803: {
        ifSame: {
            short: "Still mostly cloudy",
            long: "Clouds are not moving."
        },
        ifDifferent: {
            short: "Some gaps in clouds",
            long: "The sky will pretty much be covered."
        },
        ifGettingClearer: {
            short: "Getting clearer",
            long: "The clouds are scattering slightly."
        },
        ifGettingCloudier: {
            short: "Clouds building up",
            long: "More clouds are accumulating."
        }
    },
    804: {
        ifSame: {
            short: "Still no sky",
            long: "The sky will be obscured for a while now."
        },
        ifDifferent: {
            short: "Just boring grey",
            long: "The clouds are just going to be thick."
        },
        ifGettingClearer: {
            short: "No more grey",
            long: "The clouds are scattering."
        },
        ifGettingCloudier: {
            short: "More clouds",
            long: "The clouds will soon cover the sky."
        }
    }
}

function options() {
    if (document.getElementById("options").style.display == "block") {
        document.getElementById("options").style.display = "none";
    }
    else {
        document.getElementById("options").style.display = "block";
    }



    //console.log(document.getElementById("font-select").options[document.getElementById("font-select").options.selectedIndex].value)
}

function changeFont() {
    var fontSelection = document.getElementById("font-select");
    var alignSelection = document.getElementById("align-select");

    var fontName = fontSelection.options[fontSelection.options.selectedIndex].value;
    var fontSize = document.getElementById("size-input").value;
    var align = "center";
    try {
        var align = alignSelection.options[alignSelection.options.selectedIndex].value || "center";
    }
    catch { }

    var clock = document.getElementById("clock-display");
    var date = document.getElementById("date-display");

    //var fontName = localStorage.getItem("fontFamily") || "var(--normalFont)";
    //var fontSize = localStorage.getItem("fontSize") || "5";

    clock.setAttribute("style", `font-family: ${fontName}, Montserrat, sans-serif; font-size: ${fontSize}em; text-align: ${align}`);
    date.setAttribute("style", `font-family: ${fontName}, Montserrat, sans-serif; font-size: ${Number.parseFloat(fontSize) / 4}em; text-align: ${align}`);

    document.querySelector(":root").style.setProperty("--bodyfont", `${fontName}, Montserrat, sans-serif`)

    //document.getElementById("clock-display").setAttribute("style", `font-family: ${fontName}, Montserrat, sans-serif; font-size: ${fontSize}em;`)   
    localStorage.setItem("fontFamily", fontName);
    localStorage.setItem("fontSize", fontSize);
    localStorage.setItem("align", "left")
}

function updateClock() {
    var now = new Date();


    var hours = now.getHours().toString().padStart(2, "0");
    var mins = now.getMinutes().toString().padStart(2, "0");

    for(var item of document.getElementsByClassName("clock")) {
        item.textContent = (`${hours}:${mins}`);
    }



    var dayName = now.toLocaleDateString("en-GB", { weekday: "long" });
    var day = now.getDate();
    var ending = "th";
    if (daysWithSt.indexOf(day) > -1) {
        ending = "st";
    }
    else if (daysWithNd.indexOf(day) > -1) {
        ending = "nd";
    }
    else if (daysWithRd.indexOf(day) > -1) {
        ending = "rd";
    }
    var month = now.toLocaleDateString("en-GB", { month: "long" });
    var year = now.getFullYear();

    for(var item of document.getElementsByClassName("date")) {
        item.textContent = `${dayName}, ${day}${ending} ${month} ${year}`
    }

    for (var i = 1; i < 3; i++) {
        var progressBar = document.getElementById("progress" + i.toString());
        //console.log(i);
        var selectedValue = document.getElementById(`bar${i}-select`).value;
        //console.log(selectedValue);

        var valueToSet = 0;
        progressBar.style.backgroundColor = "white";
        progressBar.style.display = "block";

        if (selectedValue == "Minute") valueToSet = now.getSeconds() / 60;
        if (selectedValue == "Hour") valueToSet = now.getMinutes() / 60;
        if (selectedValue == "Day") valueToSet = now.getHours() / 24;
        if (selectedValue == "Full Week") valueToSet = now.getDay() / 7;
        if (selectedValue == "Month") valueToSet = now.getDate() / monthDays[now.getMonth() - 1];
        if (selectedValue == "Year") valueToSet = now.getMonth() / 12;
        if (selectedValue == "Week") {
            valueToSet = now.getDay() / 5;
            if (now.getDay() > 5) {
                progressBar.style.backgroundColor = "#57A1EB";
            }
        }
        if (selectedValue == "None") {
            progressBar.style.display = "none";

        }

        progressBar.getElementsByTagName("span")[0].innerHTML = selectedValue.toUpperCase();

        progressBar.style.width = `${valueToSet * 100}%`
    }
}

function start() {
    getWeatherURL(document.getElementById("city-input").value);

    updateClock();

    document.getElementById("main-display").style.transition = "transform 1s, opacity 0.25s";


    var clock = document.getElementById("clock-display");
    var date = document.getElementById("date-display");
    var fontName = localStorage.getItem("fontFamily") || "var(--normalFont)";
    var fontSize = localStorage.getItem("fontSize") || "5";

    clock.setAttribute("style", `font-family: ${fontName}, Montserrat, sans-serif; font-size: ${fontSize}em;`);
    date.setAttribute("style", `font-family: ${fontName}, Montserrat, sans-serif; font-size: ${Number.parseFloat(fontSize) / 4}em;`);

    document.querySelector(":root").style.setProperty("--bodyfont", `${fontName}, Montserrat, sans-serif`)

    document.getElementById("font-select").value = fontName;
    document.getElementById("size-input").value = Number.parseInt(fontSize) || 5;

    setInterval(function() {
        getWeatherURL(document.getElementById("city-input").value);
    }, 300000)
}

async function getWeatherURL(name) {
    const url = String.raw`https://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=1&appid=${apiKey}`;
    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error(response.statusText);
        }

        const data = (await response.json())[0];
        console.log(data.lat);
        console.log(data.lon);
        getWeather(String.raw`lat=${data.lat}&lon=${data.lon}`);
    }
    catch(error) {
        alert("Failed to get weather: " + error.message);
        return;
    }
}

async function getWeather(params) {
    const nowURL = `https://api.openweathermap.org/data/2.5/weather?${params}&appid=${apiKey}&units=metric`;
    const futureURL = `https://api.openweathermap.org/data/2.5/forecast?${params}&cnt=2&appid=${apiKey}&units=metric`;
    try {
        const nowResponse = await fetch(nowURL);
        if(!nowResponse.ok) {
            throw new Error(nowResponse.statusText);
        }

        const nowData = (await nowResponse.json());
        nowTemp = Math.round(nowData.main.temp);
        nowFeelsLike = Math.round(nowData.main.feels_like);
        nowCondition = nowData.weather[0].id;

        nowIcon = getWeatherIcon(nowData);

        const nowTextsKeys = Array.from(Object.keys(nowTexts));

        nowCondition = "803";



        for(var i = 0; i < nowTextsKeys.length; i++) {
            if(i >= nowTextsKeys.length - 1 || (nowCondition >= nowTextsKeys[i] && nowCondition < nowTextsKeys[i + 1])) {
                //console.log(i, nowTextsKeys.length - 1, nowCondition, nowTextsKeys[i], nowTextsKeys[i + 1]);
                //console.log(nowCondition);
                document.getElementById("now-weather-short-display").textContent = nowTexts[nowTextsKeys[i]].short;
                var longContent = `${nowTexts[nowTextsKeys[i]].long}<br>It's ${nowTemp} °C, but feels like ${nowFeelsLike}  °C.` 
                document.getElementById("now-weather-long-display").innerHTML = longContent;
                break;
            }
        }
        document.getElementById("now-weather-img").src = nowIcon;


        const futureResponse = await fetch(futureURL);
        if(!futureResponse.ok) {
            throw new Error(futureResponse.statusText);
        }

        const futureData = (await futureResponse.json());
        futureTemp1 = Math.round(futureData.list[0].main.temp);
        futureFeelsLike1 = Math.round(futureData.list[0].main.feels_like);
        futureHour1 = new Date(futureData.list[0].dt * 1000).getHours();
        futureCondition1 = futureData.list[0].weather[0].id;
        futureCondition1 = "802";

        futureIcon1 = getWeatherIcon(futureData.list[0]);

        var nowBaseCondition = Math.round(nowCondition / 100) * 100;
        var futureBaseCondition = Math.round(futureCondition1 / 100) * 100;
        console.log(nowCondition, futureCondition1);

        const futureTextsKeys = Array.from(Object.keys(futureTexts));

        for(var i = 0; i < futureTextsKeys.length; i++) {
            if(i >= futureTextsKeys.length - 1 || (futureCondition1 >= futureTextsKeys[i] && futureCondition1 < futureTextsKeys[i + 1])) {
                var short = "Description unavailable";
                var long = "Sorry.";
                
                if(futureCondition1 >= 800) {
                    if(futureCondition1 == nowCondition) {
                        short = futureTexts[futureTextsKeys[i]].ifSame.short;
                        long = futureTexts[futureTextsKeys[i]].ifSame.long;
                    }
                    else if(futureCondition1 != nowCondition && nowCondition >= 800) {
                        if(futureCondition1 > nowCondition) {
                            short = futureTexts[futureTextsKeys[i]].ifGettingCloudier.short;
                            long = futureTexts[futureTextsKeys[i]].ifGettingCloudier.long;
                        }
                        else if(futureCondition1 < nowCondition) {
                            short = futureTexts[futureTextsKeys[i]].ifGettingClearer.short;
                            long = futureTexts[futureTextsKeys[i]].ifGettingClearer.long;
                        }
                    }
                    else {
                        short = futureTexts[futureTextsKeys[i]].ifDifferent.short;
                        long = futureTexts[futureTextsKeys[i]].ifDifferent.long;
                    }
                }
                else {
                    if(futureBaseCondition == nowBaseCondition) {
                        short = futureTexts[futureTextsKeys[i]].ifSame.short;
                        long = futureTexts[futureTextsKeys[i]].ifSame.long;
                    }
                    else {
                        short = futureTexts[futureTextsKeys[i]].ifDifferent.short;
                        long = futureTexts[futureTextsKeys[i]].ifDifferent.long;
                    }
                }
                document.getElementById("future-weather-short-display").textContent = short;
                var longContent = `${long}<br>It'll be ${futureTemp1} °C, but feel like ${futureFeelsLike1}  °C.` 
                document.getElementById("future-weather-long-display").innerHTML = longContent;
                break;
            }
        }
        var futureClock = document.getElementById("future-clock-display");
        futureClock.innerHTML = `At ${(futureHour1 % 12 == 0) ? 12 : futureHour1 % 12} ${futureHour1 >= 12 ? "PM" : "AM"}:`
        document.getElementById("future-weather-img").src = futureIcon1;



        futureIcon1 = getWeatherIcon(futureData.list[0]);
    }
    catch(error) {
        alert("Failed to get weather: " + error.message);
        return;
    }
}

// Pass either a list item (for forecast) or the main directory (for weather)
function getWeatherIcon(weatherItem) {
    return `https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png`;
}

function changeCity() {
    getWeatherURL(document.getElementById("city-input").value);
}

function changeDisplay() {
    console.log(`Now: ${nowTemp} °C, feels like ${nowFeelsLike} °C, at ${new Date().getHours() % 12} ${new Date().getHours() >= 12 ? "PM" : "AM"}`);
    console.log(`At ${futureHour1 % 12} ${futureHour1 >= 12 ? "PM" : "AM"}: ${futureTemp1} °C, feels like ${futureFeelsLike1} °C`);
    
    if (!canChange) return;
    canChange = false;
    document.getElementById("main-display").style.transform = "translateX(-60%)";
    document.getElementById("main-display").style.transition = "transform 0.5s, opacity 0.25s ease-out";
    document.getElementById("main-display").style.opacity = 0;
    setTimeout(function () {
        document.getElementById("main-display").style.transition = "transform 0s ease-in, opacity 0.25s linear";
        document.getElementById("main-display").style.transform = "translateX(-40%)";
        setTimeout(function () {
            document.getElementById(`display${displayNo}`).style.display = "none";
            displayNo += 1;
            if(displayNo >= document.getElementById("main-display").childElementCount) {
                displayNo = 0;
            }
            document.getElementById(`display${displayNo}`).style.display = "block";
            console.log(displayNo);
            document.getElementById("main-display").style.transition = "transform 0.5s cubic-bezier(0,.5,.5,1), opacity 0.25s ease-out";
            document.getElementById("main-display").style.transform = "translateX(-50%)";
            document.getElementById("main-display").style.opacity = 100;
            setTimeout(() => {
                canChange = true;
            }, 250);
        }, 25);
    }, 225);
}