'use strict';

const app = {};

const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

let hue = document.querySelector('input:checked').value;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = hue;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 10;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
const fieldset = document.querySelector('fieldset');
let direction = true;

app.konamiCode = () => {
    document.addEventListener('keyup', e => {
        if (e.code === 'Enter') {
            document.querySelector('.container').classList.add('hide');
            document.getElementById('paint-container').classList.remove('hide');
            
        }
        if (e.code === 'Escape') {
            document.querySelector('.container').classList.remove('hide');
            document.getElementById('paint-container').classList.add('hide'); 
        }
    })
}

app.clearCanvas = e => {
    if (e.code === 'KeyZ' && (e.metaKey || e.ctrlKey)){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
}

app.draw = e => {
    if (!isDrawing) return; //stop the function from running when they are not moused down
    ctx.strokeStyle = hue;
    ctx.beginPath();
    // start from:
    ctx.moveTo(lastX, lastY);
    // move to:
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

app.addEventListeners = () => {
    fieldset.addEventListener('change', () => {
        const focusedColourBoxes = document.querySelectorAll('.focused');
        focusedColourBoxes.forEach(box => {
            box.classList.remove('focused');
        })
        
        const checkedInput = document.querySelector('input:checked');
        const checkedColourBox = document.querySelector(`label[for="${checkedInput.getAttribute('id')}"] .colour-box`);
        checkedColourBox.classList.add('focused');
        hue = checkedInput.value;
        document.query
        document.getElementById('selected-colour').style.backgroundColor = hue;
    });
    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    });
    canvas.addEventListener('mousemove', app.draw);
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseout', () => isDrawing = false);
    window.addEventListener('keydown', app.clearCanvas);
}

app.fillColourBoxes = () => {
    const radioButtons = document.querySelectorAll('input[type=radio');
    const colourBoxes = document.querySelectorAll('.colour-box:not(#selected-colour)');
    colourBoxes.forEach(box => {
        const id = box.parentNode.getAttribute('for');
        const colour = document.getElementById(id).value;
        box.style.backgroundColor = colour;
    })
}

app.init = () => {
    app.fillColourBoxes();
    app.addEventListeners();
    app.konamiCode();
}

document.addEventListener("DOMContentLoaded", function () {
    console.log('(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ Welcome to my site!! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧')
    app.init();
});
