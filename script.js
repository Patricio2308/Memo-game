let area = document.getElementById('area');
let sizes = document.getElementById('sizes')
let reset = document.getElementById('reset')
let blur = document.getElementById('blur')
let steps = document.getElementById('counter')


let cantcards = 8
let pairs = cantcards * 2
let board
let randomIndex
let box
let list
let completed
let messageArea
let stepsCounter = 0

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

//Conseguir un numero con un maximo como parametro
let getRandomNumber = (max) => {
    return Math.round(Math.random() * max)
}

//generando una lista de valores para las cards
let cargandoPosiciones = () => {
    list = []

    for (let i = 0; i < cantcards; i++) {
        
        for (let j = 0; j < 2; j++) {
            randomIndex = getRandomNumber(pairs)
            list.splice(randomIndex, 0, i); //splice(ind, cant, elementos)
        } 
    }
}

//Crea una imagen
function crearElemento(img,pos){
    let element = document.createElement('div')
    element.className = 'box'
    let innerElement = document.createElement('img')
    element.appendChild(innerElement)
    innerElement.className = 'contentBox'
    innerElement.id = pos
    innerElement.setAttribute('src', img)
    innerElement.setAttribute('alt',`No cargó la imagen`)
    innerElement.addEventListener('error', () => { //consigue otra imagen en caso de error (recursivo)
        img = `https://picsum.photos/id/${pos * randomIndex + 11}/200/200`;
        innerElement.setAttribute('src', img);
        element = crearElemento(img, pos + 25)
    })
    return element
}

//crea el tamaño del tablero, según la configuración
let sizeTablero = () => {
    board = new Array(pairs)
    area.style.gridTemplateColumns = `repeat(${medidas[cantcards]}, 1fr)`;
}

// se inicializan los valores de las cajas y se identifican las creadas en html
let cargandoTablero = () =>{
    cargandoPosiciones();
    sizeTablero();
    steps.innerHTML = 0;
    stepsCounter = 0;
    for (let i = 0; i < board.length; i++) {
        board[i] = `https://picsum.photos/id/${list[i] * randomIndex + 10}/200/200`
        area.appendChild(crearElemento(board[i], list[i]))
    }
       
    box = document.querySelectorAll('.box');

    messageArea = document.createElement('section');
    messageArea.id = 'message';
    area.appendChild(messageArea)
}

// generando logica de seleccion
let sel1 = '';
let sel2 = '';

// se imprimen en pantalla la carta
let showCard = (card) => {
    card.style.visibility = 'visible'
    card.style.transition = 'transform 0.5s'
    card.style.transform = 'rotateY(0deg)'
}

function resetValues(){
    sel1 = '';
    sel2 = '';
}
//muestra mensaje de juego completado
let completedMessage = () => {
    let message = 'Completado';
    let index = 0
    blur.style.display = 'inline'
    blur.style.opacity = 0.5
 

    var mostrarLetra = (i) => {
        letra = document.createElement('div')
        letra.id = 'letra'
        letra.innerHTML = message[i]
        messageArea.appendChild(letra) 
        
        if(i == message.length - 1){
            clearInterval(mensaje)
        }
        messageArea.style.bottom = '50%'
        messageArea.style.left = '50%'
        messageArea.style.transform = 'translate(-50%, -50%)'
   
    }

    mensaje = setInterval(() =>{
        mostrarLetra(index);
        index++;
    },100)

    //muestra momentaneamente un fondo translucido
    let bluring = setInterval(() =>{
        blur.style.opacity = 0
        messageArea.innerHTML = ''
        let quitarBlur = setInterval(() => {
            blur.style.display = 'none'
            clearInterval(quitarBlur)
        },1000)
        clearInterval(bluring)        
    },4000)   
    

}
/* completedMessage() */

//verifica que si se completo el tablero
let completedCheck = () => {
    completed = Array.from(box).every( (e) => e.firstChild.disabled)
    if(completed){
        stepsCounter = 0;
        completedMessage();
    }
    
}

let showSteps = () => {
    stepsCounter++;
    steps.innerHTML = stepsCounter;
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
            completedCheck()
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
    showSteps();
    
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

