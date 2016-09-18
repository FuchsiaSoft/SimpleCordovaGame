var interval;
var colors = ["red", "orange", "yellow", "forestgreen", "royalblue", "darkviolet"];
var colorNames = ["RED", "ORANGE", "YELLOW", "GREEN", "BLUE", "PURPLE"];
var currentColorName;
var availablePoints = 0;
var score = 0;

function randomise() {

    //if the interval isn't nothing, clear it
    if (interval != null) {
        clearInterval(interval);
    }

    //start the interval running for score countdown
    availablePoints = 100;
    interval = setInterval(countDown, 300);

    //choose a random color as the correct one and assign it
    currentColorName = getRandomElementFromArray(colorNames);
    var randomColor = getRandomElementFromArray(colors);
    var currentColorElement = document.getElementById("CurrentColor");
    currentColorElement.innerText = currentColorName;
    currentColorElement.style.color = randomColor;

    //shuffle the colors and their names
    var shuffledColors = shuffle(colors);
    var shuffledColorNames = shuffle(colorNames);

    //assign the shuffled colors and color names to the 6 divs
    for (var i = 0; i < 6; i++) {
        var thisOptionElement = document.getElementById("ColorOption" + (i + 1));
        thisOptionElement.innerText = shuffledColorNames[i];
        thisOptionElement.style.color = shuffledColors[i];
    }
}


function countDown() {
    if (availablePoints > 0) {
        availablePoints--;
        document.getElementById("PointsAvailable").innerText = availablePoints;
    }
}

function getRandomElementFromArray(array) {
    var randomIndex = Math.floor(Math.random() * array.length);
    var element = array[randomIndex];
    return element;
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function optionTapped(optionId) {
    //get the element from the id passed through
    var tappedOption = document.getElementById(optionId);

    //check if the tapped option is right, if so give the
    //user some points, otherwise just randomise again
    if (tappedOption.innerText == currentColorName) {
        score += availablePoints;
        document.getElementById("CurrentScore").innerText = score;
    }

    randomise();
}