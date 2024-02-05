let area = document.getElementById('area');


let max = 8
let pairs = max * 2
let board = new Array(pairs)
let currentElement

/* area.style.gridTemplateColumns = `repeat(${max}, 1fr)`;
area.style.gridTemplateRows = `repeat(${max}, 1fr)`; */

function crearElemento(valor,pos){
    let element = document.createElement('div')
    element.className = 'box'
    let innerElement = document.createElement('p')
    element.appendChild(innerElement)
    innerElement.className = 'contentBox'
    innerElement.id = `posBox${pos}`
    innerElement.innerHTML = valor
    return element
}


// se inicializan los valores de las cajas y se identifican las creadas en html
for (let i = 0; i < board.length; i++) {
        board[i] = 'x'
        area.appendChild(crearElemento(board[i], i))
}
let box = document.querySelectorAll('.box');
box[0].firstChild.textContent = 'a'


// se imprimen en pantalla
function showCard(card){

    card.style.display = 'flex'
    if(card.style.color != 'red')
        card.style.color = 'red'

    let intervalo = setInterval( ()=> {
        card.style.color = 'black'
        card.style.display = 'none'
        clearInterval(intervalo)
    }, 1000)
}

// generando logica de seleccion
let sel1 = '', sel2 = '';

let selectCard = (card) =>{
    
    if (card != null){
        
        console.log(card.textContent)

        showCard(card)
        if(sel1 == '' && sel2 == ''){
            sel1 = card;
            /* console.log('first') */
        } else {
            sel2 = card;
            /* console.log('second') */
            compare(sel1, sel2);
        }
    }
}

function resetValues(){
    sel1 = '';
    sel2 = '';
}
function compare(sel1, sel2){

    if (sel1.textContent == sel2.textContent && sel2.textContent != '' && sel1.textContent != '' && sel1 != sel2){
        console.log('Iguales')
        
        setInterval(() => { /* 
        sel1.textContent = '';
        sel2.textContent = ''; */
        sel1.remove();
        sel2.remove();
    }, 1000)
        resetValues();
        //borrar el elemento hijo al anotar un par
        

    } else if(sel1.textContent != sel2.textContent && sel2 != ''){
        console.log('Distintos')
        resetValues();
    } 

}

box.forEach(element => {
    element.addEventListener('click', (e) => {
        console.log(e.target.firstChild)
        
        selectCard(e.target.firstChild)
})
});


    /* for (let i=0; i < matriz.length/2; i++){
        let contador = 0
        let pos = Math.round(Math.random() *matriz.length )
        let valor = i
        while(contador < 2 ){
            if(matriz[pos].innerHTML == ""){
                matriz[pos].innerHTML = valor
                contador++
            } else {
                pos = Math.round(Math.random() *matriz.length )        
            }
            console.log(pos)
        }
    } */
   
/* 
console.log(Math.round(Math.random() *matriz.length ) )
matriz.forEach(element => {
    console.log(element.innerHTML)
}); */