let cont = document.getElementById('container');
let clearButton = document.getElementById('btn-clear');
let blackColor = document.getElementById('color-black');
let randomColor = document.getElementById('color-random');
let eraseBtn = document.getElementById('erase');
let resizeBtn = document.getElementById('resize');
let supContainer = document.getElementById('super-container');


cont.style.cssText = `display: grid; grid-template-columns: repeat(16,1fr); grid-template-rows: repeat(16,1fr);`;

for(let i=0;i<16**2;i++){
    let grid = document.createElement('div');

    grid.classList.add('grid');
    grid.addEventListener('mouseover',changeBlackColor);

    cont.append(grid);
}


blackColor.addEventListener('click',changeColor);
randomColor.addEventListener('click',changeColor);
eraseBtn.addEventListener('click',changeColor);
resizeBtn.addEventListener('click', resizeGrid);
clearButton.addEventListener('click',clearGrid);
let grid = cont.children;

function clearGrid(){
    for(let square of grid){
        square.style.backgroundColor = '#fff';
    }
}

function resizeGrid(){
    cont.innerHTML = '';
    let newSize = prompt('Enter the amount of squares per side (1 - 100)');
    //let newGrid = document.createElement('div');

    //newGrid.style.cssText = `width:700px; height: 700px; display: grid; grid-template-columns: repeat(${newSize},1fr); grid-template-rows: repeat(${newSize},1fr);`;
    cont.style.cssText = `width:700px; height: 700px; display: grid; grid-template-columns: repeat(${newSize},1fr); grid-template-rows: repeat(${newSize},1fr);`;

    for(let i=0;i<newSize**2;i++){
        let grid = document.createElement('div');
    
        grid.classList.add('grid');
        grid.addEventListener('mouseover',changeBlackColor);
    
        cont.append(grid);
    }

    
    //cont.append(newGrid);
}

function changeColor(){
    if(this.value === 'black'){

        for(let square of grid){
            square.removeEventListener('mouseover',changeRandomColor);
            square.removeEventListener('mouseover',changeWhiteColor);
            square.addEventListener('mouseover',changeBlackColor);
        }

    }else if(this.value === 'random'){

        for(let square of grid){
            square.removeEventListener('mouseover',changeWhiteColor);
            square.removeEventListener('mouseover',changeBlackColor);
            square.addEventListener('mouseover',changeRandomColor);
            }

    }else if(this.value === 'white'){

        for(let square of grid){
            square.removeEventListener('mouseover',changeBlackColor);
            square.removeEventListener('mouseover',changeRandomColor);
            square.addEventListener('mouseover',changeWhiteColor);
        }

    }

    blackColor.classList.remove('selected-color');
    randomColor.classList.remove('selected-color');
    eraseBtn.classList.remove('selected-color');

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