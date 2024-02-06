let area = document.getElementById('area');


let cantcards = 8
let pairs = cantcards * 2
let board = new Array(pairs)
let randomIndex

let medidas = {
    5:5,
    8:4,
    10:5,
    12:6,
    14:7
}

    area.style.gridTemplateColumns = `repeat(${medidas[cantcards]}, 1fr)`;
 /* else {
    area.style.gridTemplateColumns = `repeat(${5}, 1fr)`;
} */
/* area.style.gridTemplateRows = `repeat(${cantcards/2}, 3fr)`; */

//api https://picsum.photos/id/${numId}/200/300

//generando una lista de valores para las cards

let list = []

for (let i = 0; i < cantcards; i++) {

    for (let j = 0; j < 2; j++) {
        randomIndex = Math.round(Math.random() * cantcards)
        list.splice(randomIndex, 0, i); //splice(ind, cant, elementos)
    }

}

function crearElemento(img,pos){
    let element = document.createElement('div')
    element.className = 'box'
    let innerElement = document.createElement('img')
    element.appendChild(innerElement)
    innerElement.className = 'contentBox'
    innerElement.id = pos
    innerElement.setAttribute('src', img)
    innerElement.setAttribute('alt',`No cargó la imagen (ㆆ_ㆆ)`)
    return element
}


// se inicializan los valores de las cajas y se identifican las creadas en html
for (let i = 0; i < board.length; i++) {
    if (`https://picsum.photos/id/${list[i] * randomIndex + 300}/200/200` != null){
        board[i] = `https://picsum.photos/id/${list[i] * randomIndex + 300}/200/200`
        area.appendChild(crearElemento(board[i], list[i]))}
}
var box = document.querySelectorAll('.box');

// generando logica de seleccion
let sel1 = '';
let sel2 = '';

// se imprimen en pantalla
let showCard = (card) => {
     
    card.style.visibility = 'visible'

}



function resetValues(){
    sel1 = '';
    sel2 = '';
}

function compare(sel1, sel2){
    
    if (sel1.id == sel2.id && sel2.id != '' && sel1.id != '' && sel1 != sel2){
        console.log('Iguales')
        
        let iguales = setInterval(() => { 
            sel1.disabled = true;
            sel2.disabled = true;
            clearInterval(iguales)
        }, 2000)
        resetValues();
        
    } else if (sel1.id != sel2.id && sel2 != '' && sel1 != ''){
        console.log('Distintos')
        let distinto = setInterval(() => {
            sel1.style.visibility = 'hidden'
            sel2.style.visibility = 'hidden'
            clearInterval(distinto)
        }, 1000)
        
        resetValues();
        
    } 
    
}

let selectCard = (card) =>{
    
    if (card != null && card.disabled != true){
        
        showCard(card)
        console.log(card)

        if(sel1 == '' && sel2 == ''){
            sel1 = card;
        } else {
            sel2 = card;
            compare(sel1, sel2);
        }
    }
}
box.forEach(element => {
    element.addEventListener('click', (e) => {
        /* console.log(e.target.firstChild) */
        
        selectCard(e.target.firstChild)
})
});


    