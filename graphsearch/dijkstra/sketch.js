let size = {width: 400, height: 400};
const slider = document.getElementById('cells_number');
const label = document.getElementById('cells_value');

slider.addEventListener('input', () => {
    label.textContent = slider.value;
});


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
    let number = slider.value;
    creategrid(number);
}
