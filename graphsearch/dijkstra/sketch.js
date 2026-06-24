let size = {width: 400, height: 200};

function setup() {
    createCanvas(size.width, size.height);
}

function creategrid(number) {
    fill(255);
    
    let width = size.width / number; 
    for(let i = 0; i < number; i++) {
        for(let j = 0; j < number; j++) {
            square(i * width, j*width, width);
        }
    }
}
function draw() {

    background(220);
    creategrid(12);
}
