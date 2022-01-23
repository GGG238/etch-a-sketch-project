let cont = document.getElementById('container');
let contWidth = cont.offsetWidth;
let contHeight = cont.offsetHeight;

if(contHeight < contWidth){
    cont.style.cssText = "width: 90vw; height: 90vw";
}else{
    cont.style.cssText = "width: 90vh; height: 90vh";
}

for(let i=0;i<16**2;i++){
    let grid = document.createElement('div');

    grid.classList.add('grid');
    grid.addEventListener('mouseover',changeColor);

    cont.append(grid);
}


function changeColor(){
    this.style.backgroundColor = 'black';
}









