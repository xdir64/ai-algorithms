let size = {width: 400, height: 400};
const slider = document.getElementById('cells_number');
const label = document.getElementById('cells_value');
const generate_button = document.getElementById('generate_maze');
const start_button = document.getElementById('start_button');
const WALL = 0;
const EMPTY = 1;
const START = 2;
const GOAL = 3;
const PATH = 4;

let seed = Math.random();
const grid = [];

function isWall(i,j) {
    return grid[i][j] == WALL;
}

function dijkstra(start, goal){
    startX = start[0];
    startY = start[1];
    goalX = goal[0];
    goalY = goal[1];



}

slider.addEventListener('input', () => {
    let number = slider.value;
    label.textContent = number;
    randomSeed(seed);
    creategrid(parseInt(number));
});

start_button.addEventListener('click', () => {
    let number = parseInt(slider.value);
    // set a start point
    const start = [number >> 1, number >> 1];
    grid[start[0]][start[1]] = START; // 2 means start, orange
    // set a goal point
    const goal = [number - 1, number - 1]; 
    grid[goal[0]][goal[1]]= GOAL; // 3 means goal, green

    //do the algorithm
    dijkstra(start, goal);
});

generate_button.addEventListener('click', () => {
    seed = Math.random() * 100;
    randomSeed(seed);
    creategrid(parseInt(slider.value));
});

function setup() {
    createCanvas(size.width, size.height);
    creategrid(parseInt(slider.value));
}

function creategrid(number) {

    for(let i = 0; i < number; i++) {
        grid[i] = [];
        for(let j = 0; j < number; j++) {
            if (random() <= 0.4) grid[i].push(0);
            else grid[i].push(1);
        }
    }
}

function drawgrid(number) {
    
    let width = size.width / number; 
    for(let i = 0; i < number; i++) {
        for(let j = 0; j < number; j++) {
            if(grid[i][j] == WALL) fill(0);
            else if (grid[i][j] == START) fill('orange');
            else if (grid[i][j] == GOAL) fill('green');
            else if (grid[i][j] == PATH) fill('red');
            square(i * width, j*width, width);
            fill(255);
        }
    }
}

function draw() {

    background(220);
    let number = slider.value;
    //creategrid(number);
    drawgrid(number);

}
