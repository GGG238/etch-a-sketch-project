let cont = document.getElementById('container');
let clearButton = document.getElementById('btn-clear');
let blackColor = document.getElementById('color-black');
let randomColor = document.getElementById('color-random');
let eraseBtn = document.getElementById('erase');
let resizeBtn = document.getElementById('resize');
let supContainer = document.getElementById('super-container');
let radioOver = document.getElementById('mouse-over');
let radioClick = document.getElementById('mouse-click');

let action = "mouseover";

radioOver.checked = true;
blackColor.classList.add('selected-color');

cont.style.cssText = `display: grid; grid-template-columns: repeat(16,1fr); grid-template-rows: repeat(16,1fr);`;

for(let i=0;i<16**2;i++){
    let grid = document.createElement('div');

    grid.classList.add('grid');
    grid.addEventListener(action,changeBlackColor);

    cont.append(grid);
}



blackColor.addEventListener('click',changeColor);
randomColor.addEventListener('click',changeColor);
eraseBtn.addEventListener('click',changeColor);
resizeBtn.addEventListener('click', resizeGrid);
clearButton.addEventListener('click',clearGrid);
radioOver.addEventListener('click', changeMode);
radioClick.addEventListener('click', changeMode);
let grid = cont.children;

// ---------- Clear grid ---------- //

function clearGrid(){
    let grid = cont.children;


    for(let square of grid){
        square.style.backgroundColor = '#fff';
    }
}

// ---------- Resize grid ---------- //

function resizeGrid(){
    let newSize = Math.floor(prompt('Enter the amount of squares per side (1 - 100)'));

    if(newSize>0 && newSize<=100){
        cont.innerHTML = '';
        cont.style.cssText = `width:700px; height: 700px; display: grid; grid-template-columns: repeat(${newSize},1fr); grid-template-rows: repeat(${newSize},1fr);`;

        if(blackColor.classList.contains('selected-color')){
            for(let i=0;i<newSize**2;i++){
                let grid = document.createElement('div');
            
                grid.classList.add('grid');
                grid.addEventListener(action,changeBlackColor);
            
                cont.append(grid);
            }
        }else if(randomColor.classList.contains('selected-color')){
            for(let i=0;i<newSize**2;i++){
                let grid = document.createElement('div');
            
                grid.classList.add('grid');
                grid.addEventListener(action,changeRandomColor);
            
                cont.append(grid);
            }
        }else if(eraseBtn.classList.contains('selected-color')){
            for(let i=0;i<newSize**2;i++){
                let grid = document.createElement('div');
            
                grid.classList.add('grid');
                grid.addEventListener(action,changeWhiteColor);
            
                cont.append(grid);
            }
        }else{
            for(let i=0;i<newSize**2;i++){
                let grid = document.createElement('div');
                grid.classList.add('grid');            
                cont.append(grid);
            }
            selectSpecificColor();
        }
        
    }else{
        alert('Invalid value');
    }
}

// ---------- Chage color ---------- //

function changeColor(){
    
    if(this.value === 'black'){

        for(let square of grid){
            square.removeEventListener(action,changeRandomColor);
            square.removeEventListener(action,changeWhiteColor);
            square.removeEventListener(action, changeSpecificColor);
            square.addEventListener(action,changeBlackColor);
        }

    }else if(this.value === 'random'){

        for(let square of grid){
            square.removeEventListener(action,changeWhiteColor);
            square.removeEventListener(action,changeBlackColor);
            square.removeEventListener(action, changeSpecificColor);
            square.addEventListener(action,changeRandomColor);
            }

    }else if(this.value === 'white'){

        for(let square of grid){
            square.removeEventListener(action,changeBlackColor);
            square.removeEventListener(action,changeRandomColor);
            square.removeEventListener(action, changeSpecificColor);
            square.addEventListener(action,changeWhiteColor);
        }

    }

    blackColor.classList.remove('selected-color');
    randomColor.classList.remove('selected-color');
    eraseBtn.classList.remove('selected-color');
    specificColorContainer.style.cssText = "border: 4px solid black; box-shadow: 0"

    this.classList.add('selected-color');
}


function changeWhiteColor(){
    this.style.backgroundColor = 'white';
}

function changeBlackColor(){
    this.style.backgroundColor = 'black';
}

function changeRandomColor(){
    let hue = Math.floor(Math.random()*361);
    this.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
}



// ---------- Change mode ---------- //

function changeMode(){
    for(let square of grid){
            square.removeEventListener(action,changeRandomColor);
            square.removeEventListener(action,changeWhiteColor);
            square.removeEventListener(action,changeBlackColor);
            square.removeEventListener(action, changeSpecificColor);
    }

    action = this.value;
    
    if(blackColor.classList.contains('selected-color')){
        for(let square of grid){
            square.addEventListener(this.value,changeBlackColor);
        }

    }else if(randomColor.classList.contains('selected-color')){
        for(let square of grid){
            square.addEventListener(this.value,changeRandomColor);
        }

    }else if(eraseBtn.classList.contains('selected-color')){
        for(let square of grid){
            square.addEventListener(this.value,changeWhiteColor);
        }
    }else{            
        selectSpecificColor();
    }
}

// ---------- SPECIFIC COLOR SELECTOR ---------- //

let container = document.getElementById('cont-draggable');
let draggable = document.getElementById('draggable');
let colorCircle = document.getElementById('color-circle');
let inputLightness = document.getElementById('lightness');
let minus = document.getElementById('minus-btn');
let plus = document.getElementById('plus-btn');
let specificColorContainer = document.getElementById('specific-color');

//container.style.cssText = "background: linear-gradient(90deg, #f00 0%, #ff0 17%, #0f0 34%, #0ff 50%, #00f 66%, #f0f 82%, #f00 100%);"
container.style.cssText = "background: linear-gradient(270deg, #ff1c1c 0%, #fd00ca 16.1%, #0202ff 35.2%, #02fff9 48.8%, #60ff18 70%, #ffef15 83.7%, #f00 100%);"
inputLightness.value = inputLightness.defaultValue;
draggable.style.left = `${(container.getBoundingClientRect().left - 8)}px`;

// ---------- lightness ---------- //

minus.addEventListener('click', reduce);
plus.addEventListener('click', add);
inputLightness.addEventListener('input', changeLightness);

function reduce(){
    if(inputLightness.value-10 > 0 ){
        inputLightness.value -= 10;
    }else{
        inputLightness.value = 0;
    }
    changeLightness();
}

function add(){
    if(parseInt(inputLightness.value) + 10 <= 100){
        inputLightness.value = parseInt(inputLightness.value) + 10;
    }else{
        inputLightness.value = 100;
    }
    changeLightness();
}

function changeLightness(){
    let lightness = inputLightness.value;
    let rect = container.getBoundingClientRect();
    let clr = (draggable.offsetLeft - rect.left + 8)*2;

    container.style.cssText = `background: linear-gradient(270deg, hsl(0, 100%, ${lightness}%) 0%, hsl(312, 100%, ${lightness}%) 16.1%, hsl(240, 100%, ${lightness}%) 35.2%, hsl(179, 100%, ${lightness}%) 48.8%, hsl(101, 100%, ${lightness}%) 70%, hsl(56, 100%, ${lightness}%) 83.7%, hsl(0, 100%, ${lightness}%) 100%);`;
    colorCircle.style.cssText = `background: hsl(${clr}, 100%, ${lightness}%)`;
    selectSpecificColor();
}

// ---------- Drag ---------- //

dragElement(draggable);

function dragElement(element) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    element.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e.preventDefault();
    
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    let rect = container.getBoundingClientRect();

    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos3 = e.clientX;

    if(element.offsetLeft - pos1 > rect.left-8 && element.offsetLeft - pos1 < rect.right-12){
        element.style.left = (element.offsetLeft - pos1) + "px";

        let clr = (element.offsetLeft - rect.left + 8)*2;
        let lightness = inputLightness.value;

        colorCircle.style.cssText = `background: hsl(${clr}, 100%, ${lightness}%)`;
     }   
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;

    selectSpecificColor();
  }
}

// ---------- Use selected color ---------- //

specificColorContainer.addEventListener('click', changeBorder);

function changeBorder(){
    blackColor.classList.remove('selected-color');
    randomColor.classList.remove('selected-color');
    eraseBtn.classList.remove('selected-color');

    this.style.cssText = "border: 6px solid black; box-shadow: 0 0 15px black;";
}

function selectSpecificColor(){
    let grid = cont.children;

    for(let square of grid){
        square.removeEventListener(action,changeRandomColor);
        square.removeEventListener(action,changeWhiteColor);
        square.removeEventListener(action,changeBlackColor);

        square.addEventListener(action, changeSpecificColor);
    }
}

function changeSpecificColor(){
    let rect = container.getBoundingClientRect();
    let color = (draggable.offsetLeft - rect.left + 8)*2;
    let lightness = inputLightness.value;

    this.style.backgroundColor = `hsl(${color}, 100%, ${lightness}%)`;
}

