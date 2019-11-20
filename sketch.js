const logo = "CFPT-I";
// color constants
const backgroundColor = "#0000FF";
const textColor = "#ff0000";
// coordinates constants
const canvasX = 500;
const canvasY = 500;
const maxTextSize = 128;
const startXposition = 0;
const startYposition = canvasY / 2 + maxTextSize / 2; // try to center the text position

let actualTextSize = maxTextSize;
let actualXposition = startXposition;
let actualYposition = startYposition;

function setup() {
    createCanvas(canvasX, canvasY);
    textFont('Georgia');
    fill(textColor);
}

function draw() {
    clear();
    background(backgroundColor);
    textSize(actualTextSize);
    text(logo, actualXposition, actualYposition);
    if (actualTextSize >= 15) {
        actualTextSize--;
    }
}