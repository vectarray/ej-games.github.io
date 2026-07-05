
let programmingLanguages = {}

preLoadSnippets();

async function preLoadSnippets() {
	await fetch("/tutorial/migration-comparisons.json")
		.then(response => response.json())
		.then(data => programmingLanguages = data)
		.catch(error => console.error(error));
}

function onLoadSnippets() {
    if(Object.keys(programmingLanguages).length < 1) {
        setTimeout(onLoadSnippets, 100);
        return;
    }
    for(var element of document.getElementsByTagName("code")) {
        if(element.id.startsWith("snippet-")) {
            element.innerHTML = "";
            var id = element.id.split("-");
            id.shift();

            if(id[1] == "datatypes") {
                element.innerHTML = programmingLanguages[id[0]][id[1]][id[2]];
            }
            else {
                var contentArray = programmingLanguages[id[0]][id[1]][id[2]].lines;

                console.log(contentArray);

                for(var line of contentArray) {
                    element.innerHTML += line + "\n";
                }
            }
        }
    }
}