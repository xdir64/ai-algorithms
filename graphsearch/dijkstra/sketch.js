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
    let number = parseInt(slider.value);
    startX = start[0];
    startY = start[1];
    goalX = goal[0];
    goalY = goal[1];
    grid[goalX][goalY] = EMPTY;
    const visited = [];
    const prev = [];
    for(let i = 0; i < number; i++) {
        visited[i] = [];
        prev[i] = [];
        for(let j = 0; j < number; j++) {
            visited[i].push(false);
            prev[i].push(null);
        }
    }
    const queue = [start];
    let head = 0;
    visited[startX][startY] = true;
    while(head < queue.length) {
        let current = queue[head];
        head += 1;
        if(current[0] == goalX && current[1] == goalY) break;
        let kids = children(current);
        for(var k = 0; k < kids.length; k++) {
            let next = kids[k];
            if(!visited[next[0]][next[1]]) {
                visited[next[0]][next[1]] = true;
                prev[next[0]][next[1]] = current;
                queue.push(next);
            }
        }
    }
    grid[goalX][goalY] = GOAL;
    let step = prev[goalX][goalY];
    while(step != null && !(step[0] == startX && step[1] == startY)) {
        grid[step[0]][step[1]] = PATH;
        step = prev[step[0]][step[1]];
    }
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
    const cx = number >> 1; // or cx and cy equal to 0 but usually there is no path and i will not generate a real labyrinth atm
    const cy = number >> 1;


    let start = [cx, cy];
    searchStart:
    for (const dx of [0, -1, 1]) {
        for (const dy of [0, -1, 1]) {
            const a = cx + dx, b = cy + dy;
            if (grid[a]?.[b] === EMPTY) {
                start = [a, b];
                break searchStart;
            }
        }
    }
    grid[start[0]][start[1]] = START; // 2 means start, orange
    // set a goal point
    let goal = [number - 1, number - 1];
    searchGoal:
    for (const a of [number - 1, number - 2] ){
        for (const b of [number - 1, number - 2]) {
            if (grid[a]?.[b] == EMPTY) {
                goal = [a,b];
                break searchGoal;
            }
        }
}
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
            if (random() <= 0.3) grid[i].push(0);
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
            fill(255); // else fill with EMPTY
        }
    }
}

function draw() {

    background(220);
    let number = slider.value;
    //creategrid(number);
    drawgrid(number);

}

function children(point) {
    let number = parseInt(slider.value);
    let [i,j] = point;
    const the_children = [];

    for(var a = -1; a < 2; a += 2)
    {
        if (0 <= i + a && i + a < number && (grid[i + a][j] == EMPTY || grid[i + a][j] == GOAL))
        {
            the_children.push([i + a, j]);
        }
    }
    
    for(var b = -1; b < 2; b += 2)
    {
        if (0 <= j + b && j + b < number && (grid[i][j + b] == EMPTY || grid[i][j + b] == GOAL))
        {
            the_children.push([i, j + b]);
        }
    }
    return the_children;
}

