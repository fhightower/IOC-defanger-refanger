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
        var matches = regexes[i].find.exec(text);
        if (matches) {
            // TODO: there may be a more efficient way to do the chunk below... I haven't look into it yet
            if (matches.length > 1) {
                console.log("many matches found: ", String(regexes[i].find));
                function replacer(match, selection1) {
                    /* Replace selection1 with the replacement. */
                    return match.replace(selection1, regexes[i].replace);
                }
                text = text.replace(regexes[i].find, replacer);
            } else {
                console.log("one match found", removeRegex(String(regexes[i].find)));
                console.log("find", removeRegex(String(regexes[i].find)));
                console.log("replace", regexes[i].replace);
                text = text.replace(regexes[i].find, regexes[i].replace);
            }
        }
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
    else if (action === "fa") {
        text = fang(refangRegexes, text);
    }

    // provide the output
    document.getElementById('output').innerHTML = text;
}