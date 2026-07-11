let sketchBoard = document.getElementById('sketch');
let clearButton = document.getElementById('clear');

let gridSize = 16;
let isDrawing = false;

function createGrid() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            let cell = document.createElement('div');   
            cell.style.width = `25px`;
            cell.style.height = `25px`;
            cell.style.border = '1px solid #000';
            cell.style.boxSizing = 'border-box';
            cell.addEventListener('mousedown', (event) => {
                if (event.button === 0) {
                    isDrawing = true;
                    cell.style.backgroundColor = 'black';
                }
            });
            cell.addEventListener('mouseenter', () => {
                if (isDrawing) {
                    cell.style.backgroundColor = 'black';
                }
            });
            sketchBoard.appendChild(cell);
        }
    }
}

createGrid();

document.addEventListener('mouseup', () => {
    isDrawing = false;
});