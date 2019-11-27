const logo = "CFPT-I";
const FONT_FAMILY  = "Georgia";
// color constants
const BACKGROUND_COLOR = "#000000";
const TEXT_COLOR = "#00FF00";
const SNOWFLAKES_COLOR = "#ffffff";
// coordinates constants
const NB_FLOOR = 10;
const CANVAS_X = 800;
const CANVAS_Y = 800;
const MAX_TEXT_SIZE = 180;
const TEXT_SPACING_X = MAX_TEXT_SIZE * 4;
const TEXT_SPACING_Y = MAX_TEXT_SIZE * 2;
const MIN_SCALING = 0.1;
const SCALING_SPEED = 0.01;

let scaling = 1.0;
let actualTextSize = MAX_TEXT_SIZE;

let snowflakes = []; // array to hold snowflake objects

function setup() {
    createCanvas(CANVAS_X, CANVAS_Y);
    textFont(FONT_FAMILY);
}

function draw() {
    clear();
    fill(TEXT_COLOR);
    background(BACKGROUND_COLOR);
    textSize(actualTextSize);

    push();
    translate(CANVAS_X / 2 - 50, 0);
    scale(scaling);
    if (scaling > MIN_SCALING) {
        scaling -= SCALING_SPEED;
    }
    drawChristmasTree();
    pop();

    snowEffect();
}

function drawChristmasTree() {
    let posX = CANVAS_X / 2 - TEXT_SPACING_X / 2;
    let posY = TEXT_SPACING_Y;
    for (let x = 1; x <= NB_FLOOR; x++) {
        for (let y = 0; y < x; y++) {
            text(logo, posX, posY);
            posX += TEXT_SPACING_X;
        }
        posX -=  TEXT_SPACING_X * x + TEXT_SPACING_X / 2;
        posY += TEXT_SPACING_Y;
    }
}

function snowEffect() {
    fill(SNOWFLAKES_COLOR);
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
