let sketchBoard = document.getElementById('sketch');
let clearButton = document.getElementById('clear');
let resizeGrid = document.getElementById('resize');
let rgbButton = document.getElementById('rgb');
let blackButton = document.getElementById('black');

let gridSize = 16;
let isDrawing = false;
let isRGBMode = false;

function createGrid() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            let cell = document.createElement('div');   
            cell.style.width = `${sketchBoard.offsetWidth / gridSize}px`;
            cell.style.height = `${sketchBoard.offsetHeight / gridSize}px`;
            cell.style.border = '1px solid #000';
            cell.style.boxSizing = 'border-box';
            cell.style.flexShrink = '0';
            cell.dataset.level = '0'; 

            cell.addEventListener('mousedown', (event) => {
                if (event.button === 0) {
                    isDrawing = true;
                    darkenCell(cell);
                }
            });
            cell.addEventListener('mouseenter', () => {
                if (isDrawing) {
                    if (isRGBMode) {
                        cell.style.backgroundColor = getRandomColor();
                    } else {
                        darkenCell(cell);
                    }
                }
                
            });
            sketchBoard.appendChild(cell);
        }
    }
}

function darkenCell(cell) {
    let level = parseInt(cell.dataset.level);
    
    if (level === 0) {
        // first hit: lock in the color for this cell
        cell.dataset.color = isRGBMode ? getRandomColorRGB() : '0,0,0';
    }

    if (level < 10) {
        level++;
        cell.dataset.level = level;
    }

    let opacity = level / 10;
    cell.style.backgroundColor = `rgba(${cell.dataset.color}, ${opacity})`;
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function darkenCell(cell) {
    let level = parseInt(cell.dataset.level);

    if (level === 0) {
        // first hit: lock in the color for this cell
        cell.dataset.color = isRGBMode ? getRandomColorRGB() : '0,0,0';
    }

    if (level < 10) {
        level++;
        cell.dataset.level = level;
    }

    let opacity = level / 10;
    cell.style.backgroundColor = `rgba(${cell.dataset.color}, ${opacity})`;
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

rgbButton.addEventListener('click', () => {
    isRGBMode = true;
});

blackButton.addEventListener('click', () => {
    isRGBMode = false;
}); 