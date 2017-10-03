function removeRegex(str) {
    /* Make a regex into a string. */
    // remove the "/" and "/ig" before and after the regex
    var cleanedRegex = str.slice(1, -3);

    // remove all backslashes
    cleanedRegex = cleanedRegex.replace(/\\/g, "");

    return cleanedRegex;
}

function fang(regexes, text) {
    /* Run through each of the regexes and make the replacements in the given text. */
    for (var i = regexes.length - 1; i >= 0; i--) {
        text = text.replace(regexes[i].find, removeRegex(String(regexes[i].replace)));
    }

    return text;
}

function takeAction(action) {
    /* Refang or Defang the text. */
    // find the input text
    var text = document.getElementById('input-text').value;

    // defang
    if (action === "de") {
        text = fang(defangRegexes, text);
    }
    // refang
    else if (action === "re") {
        text = fang(refangRegexes, text);
    }

    // provide the output
    document.getElementById('output').innerHTML = text;
}