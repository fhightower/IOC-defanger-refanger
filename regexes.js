function escapeRegExp(str) {
    return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
}

function getDataset(datasetURL, regexList) {
    /* Regest the given dataset and retrieve each of the regexes from it. */
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var regexResponse = JSON.parse(xmlHttp.responseText);

            // format the regexes
            for (var i = regexResponse.length - 1; i >= 0; i--) {
                // create a regex based on the escaped string value from the API
                var new_regex = {
                    "find": new RegExp(escapeRegExp(regexResponse[i].find), "gi"),
                    "replace": new RegExp(escapeRegExp(regexResponse[i].replace), "gi")
                };

                regexList.push(new_regex);
            }
        }
    };

    xmlHttp.open("GET", datasetURL, true);
    xmlHttp.send(null);
}

var defangRegexes = [];
var refangRegexes = [];

// retrieve the regexes for defanging
getDataset("https://ioc-fang.github.io/defanger-dataset/defang.json", defangRegexes);

// retrieve the regexes for refanging
getDataset("https://ioc-fang.github.io/refanger-dataset/refang.json", refangRegexes);
