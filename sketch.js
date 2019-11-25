const logo = "CFPT-I";
// color constants
const backgroundColor = "#0000ff";
const textColor = "#ff0000";
const snowflakesColor = "#ffffff";
// coordinates constants
const canvasX = 500;
const canvasY = 500;
const maxTextSize = 128;
const startXposition = 0;
const startYposition = canvasY / 2 + maxTextSize / 2; // try to center the text position

let actualTextSize = maxTextSize;
let actualXposition = startXposition;
let actualYposition = startYposition;

let snowflakes = []; // array to hold snowflake objects

function setup() {
    createCanvas(canvasX, canvasY);
    textFont('Georgia');
}

function draw() {
    clear();
    fill(textColor);
    background(backgroundColor);
    textSize(actualTextSize);
    text(logo, actualXposition, actualYposition);
    if (actualTextSize >= 15) {
        actualTextSize--;
    }

    push();
    snowEffect();
    pop();
}

function snowEffect() {
    fill(snowflakesColor);
    let t = frameCount / 60; // update time

    // create a random number of snowflakes each frame
    for (let i = 0; i < random(5); i++) {
        snowflakes.push(new snowflake()); // append snowflake object
    }

    // loop through snowflakes with a for..of loop
    for (let flake of snowflakes) {
        flake.update(t); // update snowflake position
        flake.display(); // draw snowflake
    }
}

// snowflake class
function snowflake() {
    // initialize coordinates
    this.posX = 0;
    this.posY = random(-50, 0);
    this.initialangle = random(0, 2 * PI);
    this.size = random(2, 5);

    // radius of snowflake spiral
    // chosen so the snowflakes are uniformly spread out in area
    this.radius = sqrt(random(pow(width / 2, 2)));

    this.update = function(time) {
        // x position follows a circle
        let w = 0.6; // angular speed
        let angle = w * time + this.initialangle;
        this.posX = width / 2 + this.radius * sin(angle);

        // different size snowflakes fall at slightly different y speeds
        this.posY += pow(this.size, 0.5);

        // delete snowflake if past end of screen
        if (this.posY > height) {
            let index = snowflakes.indexOf(this);
            snowflakes.splice(index, 1);
        }
    };

    this.display = function() {
        ellipse(this.posX, this.posY, this.size);
    };
}
