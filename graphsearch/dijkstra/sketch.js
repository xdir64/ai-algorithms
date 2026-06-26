let size = {width: 400, height: 400};
const slider = document.getElementById('cells_number');
const label = document.getElementById('cells_value');
const generate_button = document.getElementById('generate_maze');
let seed = Math.random();

slider.addEventListener('input', () => {
    label.textContent = slider.value;
});


generate_button.addEventListener('click', () => {
    seed = Math.random() * 100;
});

function setup() {
    createCanvas(size.width, size.height);
}

function creategrid(number) {
    fill(255);
    
    let width = size.width / number; 
    for(let i = 0; i < number; i++) {
        for(let j = 0; j < number; j++) {
            if (random() <= 0.4) fill(0);
            square(i * width, j*width, width);
            fill(255);
        }
    }
}
function draw() {

    background(220);
    randomSeed(seed);
    let number = slider.value;
    creategrid(number);
}
