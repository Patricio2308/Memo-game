let area = document.getElementById('area');


let max = 16
let pairs = max * 2
let board = new Array(max)

/* area.style.gridTemplateColumns = `repeat(${max}, 1fr)`;
area.style.gridTemplateRows = `repeat(${max}, 1fr)`; */

function crearElemento(valor){
    let element = document.createElement('div')
    element.className = 'box'
    let innerElement = document.createElement('p')
    element.appendChild(innerElement)
    innerElement.className = 'contentBox'
    innerElement.innerHTML = valor
    console.log(element)
    return element
}

// se arma la matriz
for (let i = 0; i < board.length; i++){
    board[i] = new Array(max)
}

// se inicializan los valores de las cajas y se identifican las creadas en html
/* for (let i=0; i < board.length; i++){
    for (let j=0; j < board.length; j++){
        board[i][j] = 'x'
        area.appendChild(crearElemento(board[i][j]))
    }
} */
for (let i = 0; i < board.length; i++) {
        board[i] = 'x'
        area.appendChild(crearElemento(board[i]))
}
let box = document.querySelectorAll('.box');


// se imprimen en pantalla
function showCard(card){
    
    card.style.display = 'flex'
    if(card.style.color != 'red')
        card.style.color = 'red'

    let intervalo = setInterval( ()=> {
        card.style.color = 'black'
        clearInterval(intervalo)
        card.style.display = 'none'
    }, 1000)
}
// generando logica de seleccion
let sel1 = '', sel2 = ''

function selectCard(card){
    showCard(card)
    if(sel1 == '' && sel2 == ''){
        sel1 = card
        console.log(sel1)
        
    } else {
        sel2 = card
        console.log(sel2)
        compare()
    }
    
}
function resetValues(){
    sel1 = ''
    sel2 = ''
}
function compare(){
    if (sel1.textContent == sel2.textContent && sel2.textContent != '' && sel1.textContent != '' && sel1 != sel2){
        console.log('Iguales')
        sel1.textContent = ''
        sel2.textContent = ''
        resetValues()

    } else if(sel1.textContent != sel2.textContent && sel2 != ''){
        console.log('Distintos')
        resetValues()
    }
}


box.forEach(element => {
    element.addEventListener('click', () => {
    selectCard(element.firstChild)
    
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