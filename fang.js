function removeRegex(str) {
    /* Make a regex into a string. */
    // remove the "/" and "/ig" before and after the regex
    var cleanedRegex = str.slice(1, -3);

    // remove all backslashes
    cleanedRegex = cleanedRegex.replace(/\\/g, "");

    return cleanedRegex;
}

function takeAction(action) {
    /* Refang or Defang the text. */
    // find the input text
    var text = document.getElementById('input-text').value;

    // refang/defang
    for (var i = regexes.length - 1; i >= 0; i--) {
        // defang
        if (action === "de") {
            text = text.replace(regexes[i].find, removeRegex(String(regexes[i].replace)));
        }
        // refang
        else if (action === "re") {
            text = text.replace(regexes[i].replace, removeRegex(String(regexes[i].find)));
        }
    }

    // provide the output
    document.getElementById('output').innerHTML = text;
}