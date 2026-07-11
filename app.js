let sketchBoard = document.getElementById('sketch');
let clearButton = document.getElementById('clear');
let resizeGrid = document.getElementById('resize');

let gridSize = 16;
let isDrawing = false;

function createGrid() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            let cell = document.createElement('div');   
            cell.style.width = `${sketchBoard.offsetWidth / gridSize}px`;
            cell.style.height = `${sketchBoard.offsetHeight / gridSize}px`;
            cell.style.border = '1px solid #000';
            cell.style.boxSizing = 'border-box';
            cell.style.flexShrink = '0';
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


clearButton.addEventListener('click', () => {
    let cells = sketchBoard.querySelectorAll('div');
    cells.forEach(cell => {
        cell.style.backgroundColor = '';
    });
});

resizeGrid.addEventListener('click', () => {
    let newSize = prompt('Enter new grid size (1-100):');
    if (newSize !== null) {
        newSize = parseInt(newSize);
        if (newSize >= 1 && newSize <= 100) {
            gridSize = newSize;
            sketchBoard.innerHTML = '';
            createGrid();
        } else {
            alert('Please enter a number between 1 and 100.');
        }
    }
});