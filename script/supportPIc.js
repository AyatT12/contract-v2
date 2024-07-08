// Get references to the necessary elements
const shapeCanvas = document.getElementById('shape-canvas');
const hexagramBtn = document.getElementById('hexagram-btn');
const sixstarBtn = document.getElementById('sixstar-btn');
const threestarBtn = document.getElementById('threestar-btn');
const threestarBtn2 = document.getElementById('threestar-btn2');

const undoBtn = document.getElementById('undo-btn');
const redoBtn = document.getElementById('redo-btn');
const saveBtn = document.getElementById('save-btn');
window.addEventListener('load', function () {
    // Get the canvas context
    const ctx = shapeCanvas.getContext('2d');

    // Draw the car background
    const carBackground = new Image();
    carBackground.src = 'img/car shape.svg';
    carBackground.onload = function () {
        ctx.drawImage(carBackground, 0, 0, shapeCanvas.width, shapeCanvas.height);
    };
});
// Load the shape images
const hexagramImg = new Image();
hexagramImg.src = 'img/Polygon 4.svg';

const sixstarImg = new Image();
sixstarImg.src = 'img/Star 1 (1).svg';

const threestarImg = new Image();
threestarImg.src = 'img/Star 1.svg';

const threestarImg2 = new Image();
threestarImg2.src = 'img/Polygon 3.svg';
// Keep track of the currently selected shape
let selectedShape = null;

// Keep track of the shapes drawn on the canvas
let drawnShapes = [];
let currentIndex = -1;

// Add click event listeners to the buttons
hexagramBtn.addEventListener('click', () => {
    selectedShape = hexagramImg;
});

sixstarBtn.addEventListener('click', () => {
    selectedShape = sixstarImg;
});

threestarBtn.addEventListener('click', () => {
    selectedShape = threestarImg;
});

threestarBtn2.addEventListener('click', () => {
    selectedShape = threestarImg2;
});
undoBtn.addEventListener('click', () => {
    undo();
});

redoBtn.addEventListener('click', () => {
    redo();
});

// Add click event listener to the canvas
shapeCanvas.addEventListener('click', (event) => {
    if (selectedShape) {
        addShape(event);
    }
});
// // Set the canvas size to match the container
// shapeCanvas.width = shapeCanvas.offsetWidth;
// shapeCanvas.height = shapeCanvas.offsetHeight;

function addShape(event) {
    // Get the canvas context
    const ctx = shapeCanvas.getContext('2d');
    // Draw the car background
    const carBackground = new Image();
    carBackground.src = 'img/car shape.svg';
    carBackground.onload = function () {

        // Get the click coordinates relative to the canvas
        const x = event.clientX - shapeCanvas.getBoundingClientRect().left;
        const y = event.clientY - shapeCanvas.getBoundingClientRect().top;

        // Draw the selected shape on the canvas at the clicked location
        ctx.drawImage(selectedShape, x - selectedShape.width / 2, y - selectedShape.height / 2, 20, 20);

        // Add the new shape to the drawnShapes array
        drawnShapes.push({
            shape: selectedShape,
            x: x - selectedShape.width / 2,
            y: y - selectedShape.height / 2
        });
        currentIndex++;
    };
}

function undo() {
    if (currentIndex >= 0) {
        currentIndex--;
        redrawShapes();
    }
}

function redo() {
    if (currentIndex < drawnShapes.length - 1) {
        currentIndex++;
        redrawShapes();
    }
}

function redrawShapes() {
    // Get the canvas context
    const ctx = shapeCanvas.getContext('2d');

    // Clear the canvas
    ctx.clearRect(0, 0, shapeCanvas.width, shapeCanvas.height);

    // Draw the car background
    const carBackground = new Image();
    carBackground.src = 'img/car shape.svg';
    carBackground.onload = function () {
        ctx.drawImage(carBackground, 0, 0, shapeCanvas.width, shapeCanvas.height);

        // Redraw all the shapes in the drawnShapes array
        for (let i = 0; i <= currentIndex; i++) {
            ctx.drawImage(drawnShapes[i].shape, drawnShapes[i].x, drawnShapes[i].y, 20, 20);
        }
    };
}
saveBtn.addEventListener('click', () => {
    const dataURL = shapeCanvas.toDataURL('image/png');
    console.log(dataURL)
    const downloadLink = document.createElement('a');
    downloadLink.download = 'car-damage-image.png';
    downloadLink.href = dataURL;
    downloadLink.click();
});
/////addd active /////    
document.getElementById('support-container').addEventListener('click', function(event) {
    if (event.target.classList.contains('support-Btn')) {
      const buttons = document.querySelectorAll('.support-Btn');
      buttons.forEach(btn => btn.classList.remove('support-Btn-active'));
      event.target.classList.add('support-Btn-active');
    }
  });
