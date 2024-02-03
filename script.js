let area = document.getElementById('area');

let max = 4
let fila = new Array(max)

function crearElemento(valor){
    let element = document.createElement('div')
    element.className = 'box'
    element.innerHTML = valor
    return element
}

// se arma la matriz
for (let i = 0; i < fila.length; i++){
    fila[i] = new Array(max)
}

// se inicializan los valores de las cajas y se identifican las creadas en html
for (let i=0; i < fila.length; i++){
    for (let j=0; j < fila.length; j++){
        fila[i][j] = 'x'
        area.appendChild(crearElemento(fila[i][j]))
    }
}
let box = document.querySelectorAll('.box');


// se imprimen en pantalla
function showCard(){
    setInterval
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
    if(sel1.textContent == sel2.textContent && sel2.textContent != '' && sel1.textContent != ''){
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
    selectCard(element)
    
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