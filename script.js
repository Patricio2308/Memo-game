let area = document.getElementById('area');
let sizes = document.getElementById('sizes')
let reset = document.getElementById('reset')


let cantcards = 8
let pairs = cantcards * 2
let board
let randomIndex
let box
let list

let medidas = {
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
let cargandoPosiciones = () => {
    list = []

    for (let i = 0; i < cantcards; i++) {
        
        for (let j = 0; j < 2; j++) {
            randomIndex = Math.round(Math.random() * pairs)
            list.splice(randomIndex, 0, i); //splice(ind, cant, elementos)
        } 
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
    innerElement.setAttribute('alt',`No cargó la imagen`)
    innerElement.addEventListener('error', () => {
        img = 'https://picsum.photos/id/188/200/200';
        innerElement.setAttribute('src', img)
    })
    return element
}


let sizeTablero = () => {
    board = new Array(pairs)
    area.style.gridTemplateColumns = `repeat(${medidas[cantcards]}, 1fr)`;
}

// se inicializan los valores de las cajas y se identifican las creadas en html
let cargandoTablero = () =>{
    cargandoPosiciones();
    sizeTablero();
    for (let i = 0; i < board.length; i++) {
        if (`https://picsum.photos/id/${list[i] * randomIndex + 300}/200/200` != null){
            board[i] = `https://picsum.photos/id/${list[i] * randomIndex + 300}/200/200`
            area.appendChild(crearElemento(board[i], list[i]))}
        }
    box = document.querySelectorAll('.box');
}

// generando logica de seleccion
let sel1 = '';
let sel2 = '';

// se imprimen en pantalla
let showCard = (card) => {
     
    card.style.visibility = 'visible'
    card.style.transition = 'transform 0.5s'
    card.style.transform = 'rotateY(0deg)'
}

function resetValues(){
    sel1 = '';
    sel2 = '';
}

function compare(sel1, sel2){
    
    if (sel1.id == sel2.id && sel2.id != '' && sel1.id != '' && sel1 != sel2){
        console.log('Iguales')
        
        let iguales = setInterval(() => { 
            sel1.style.animation = 'acertado 0.3s'
            sel2.style.animation = 'acertado 0.3s'
            sel1.disabled = true;
            sel2.disabled = true;
            clearInterval(iguales)
        }, 500)
        resetValues();
        
    } else if (sel1.id != sel2.id && sel2 != '' && sel1 != ''){
        console.log('Distintos')
        let distinto = setInterval(() => {
            sel1.style.visibility = 'hidden'
            sel2.style.visibility = 'hidden'
            sel1.style.transform = 'rotateY(90deg)'
            sel2.style.transform = 'rotateY(90deg)'
             
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

cargandoTablero()

box.forEach(element => {
    element.addEventListener('click', (e) => {
        /* console.log(e.target.firstChild) */
        
        selectCard(e.target.firstChild)

        
    })
});

reset.addEventListener('click', () => { 
    cantcards = sizes.value
    pairs = cantcards * 2
    
    area.innerHTML = ''
    cargandoTablero()

    box.forEach(element => {
        element.addEventListener('click', (e) => {
        
            selectCard(e.target.firstChild)

        })
    });
    
})

