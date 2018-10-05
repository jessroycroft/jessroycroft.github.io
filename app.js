'use strict';

const app = {};

const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = '#bada55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 20;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

app.konamiCode = () => {
    document.addEventListener('keyup', e => {
        if (e.keyCode === 13) {
            document.querySelector('.container').classList.add('hide');
            document.getElementById('ms-paint-clone').classList.remove('hide');
            
        }
        if (e.keyCode === 27) {
            document.querySelector('.container').classList.remove('hide');
            document.getElementById('ms-paint-clone').classList.add('hide'); 
        }
    })
}

app.clearCanvas = e => {
    if (e.keyCode === 32) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
}

app.draw = e => {
    if (!isDrawing) return; //stop the function from running when they are not moused down
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%`;
    ctx.beginPath();
    // start from:
    ctx.moveTo(lastX, lastY);
    // move to:
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

app.addCanvasEventListeners = () => {
    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    });
    canvas.addEventListener('mousemove', app.draw);
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseout', () => isDrawing = false);
    window.addEventListener('keydown', app.clearCanvas);
}

app.init = () => {
    app.addCanvasEventListeners();
    app.konamiCode();
}

document.addEventListener("DOMContentLoaded", function () {
    console.log('(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ Welcome to my site!! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧')
    app.init();
});
