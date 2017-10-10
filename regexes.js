function escapeRegExp(str) {
    return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
}

function getDataset(datasetURL, regexList, escapeRegex=false) {
    /* Regest the given dataset and retrieve each of the regexes from it. */
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var regexResponse = JSON.parse(xmlHttp.responseText);

            // format the regexes
            for (var i = regexResponse.length - 1; i >= 0; i--) {
                // create a regex based on the escaped string value from the API
                var newRegex;

                if (!escapeRegex) {
                    // if we are not escaping the 'find' regex...
                    newRegex = {
                        "find": new RegExp(regexResponse[i].find, "gi"),
                        "replace": regexResponse[i].replace
                    };
                } else {
                    // if we are escaping the 'find' regex...
                    newRegex = {
                        "find": new RegExp(escapeRegExp(regexResponse[i].find), "gi"),
                        "replace": regexResponse[i].replace
                    };
                }

                regexList.push(newRegex);
            }
        }
    };

    xmlHttp.open("GET", datasetURL, true);
    xmlHttp.send(null);
}

var defangRegexes = [];
var refangRegexes = [];

// retrieve the regexes for defanging
getDataset("https://ioc-fang.github.io/defanging-dataset/defang.json", defangRegexes);

// retrieve the regexes for refanging
getDataset("https://ioc-fang.github.io/fanging-dataset/refang.json", refangRegexes, escapeRegex=true);
