var delay = (ms) =>{return new Promise(resolve=> setTimeout(resolve,ms))}
var sizeOfArray = 50

setInterval(specifyArraySize, 500)

// when body loads
function load(){
    generateArray()
}

// function to take size from text input
function specifyArraySize(){
    const sizeTextArea = document.querySelector('#sizeTextArea')
    sizeTextArea.addEventListener('keypress', (e)=>{
        if(e.which == 13){
            if(sizeTextArea.value > 75 || sizeTextArea.value < 3){
                return
            }
            generateArray(sizeTextArea.value)
            window.sizeOfArray = sizeTextArea.value
        }
    })
}

// generates an array of size 
function generateArray(){
    let size = window.sizeOfArray

    const barDivision = document.getElementById('barsDivision')    
    barDivision.innerHTML = ''
    
    let numRange = []
    for(let i = 1; i <= size; i++) numRange.push(i);

    let r = 0
    let usedIndices = []
    for(let i = 0; i < numRange.length; i++){
        while(numRange.indexOf(numRange[r]) == -1 || usedIndices.includes(r)){
            r = Math.floor(Math.random()*numRange.length);
        }
        usedIndices.push(r);
        let temp = numRange[i]
        numRange[i] = numRange[r]
        numRange[r] = temp
       
    }
    console.log(numRange);


    for(let i = 0; i < size; i++){
        const barNew = document.createElement('div')
        
        barNew.classList.add('bar')

        barNew.style.height = numRange[i] +'vh'
        barNew.style.value = numRange[i];
        barDivision.appendChild(barNew)
    }
}

// performs selectionSort on the generated array
async function selectionSort(){

    const bars = document.querySelectorAll('.bar')

    console.log(bars.length)

    let barArray = []

    // appending the values of the bars into an array for bubble sorting
    bars.forEach(bar =>{
        barArray.push(bar.style.value)
    })


    let delay = (ms) =>{
        return new Promise(resolve=> setTimeout(resolve,ms))
    }

    // selection sort
    async function sort(){
        for(let i = 0; i < barArray.length; i++){

            for(let j = i+1; j < barArray.length; j++){
                
                for(let k = 0; k < barArray.length; k++){
                    if(k!=i && k != j){
                        bars[k].style.backgroundColor = 'turquoise'
                    }
                    bars[i].style.backgroundColor = 'blue'  
                }

                await delay(.1) 
                bars[j].style.backgroundColor = 'red' 
                bars[i].style.backgroundColor = 'green'  
                await delay(10) 
                bars[j].style.backgroundColor = 'red' 
                bars[i].style.backgroundColor = 'red'
                if(barArray[i] > barArray[j]){

                    
                    // actual sorting of values
                    let temp = barArray[i]
                    barArray[i] = barArray[j]
                    barArray[j] = temp
    
                    // adjusting the style height
                    let temp2 = bars[i].style.height
                    bars[i].style.height = bars[j].style.height
                    bars[j].style.height = temp2
                }
                await delay(.1) 
                
                
            }
            await delay(.1)
        }
    }
    await sort()
    for(let i = 0; i < bars.length ; i++){
        bars[i].style.backgroundColor = 'purple'
        await delay(10)
    }
}

// performs bubbleSort on the generated array
async function bubbleSort(){
    const bars = document.querySelectorAll('.bar')
    const button = document.querySelector('#sortByBubbleSortBtn')

    console.log(bars.length)

    let barArray = []

    // appending the values of the bars into an array for bubble sorting
    bars.forEach(bar =>{
        barArray.push(bar.style.value)
    })


    // bubble sort
    async function sort(){
        for(let i = 0; i < barArray.length-1; i++){

            for(let j = 0; j < barArray.length-i-1; j++){
                
                for(let k = 0; k < barArray.length; k++){
                    if(k!= j+1 && k != j){
                        bars[k].style.backgroundColor = 'turquoise'
                    }
                }
                if(barArray[j] > barArray[j+1]){
                    // actual sorting of values
                    let temp = barArray[j]
                    barArray[j] = barArray[j+1]
                    barArray[j+1] = temp
    
                    // adjusting the style height
                    let temp2 = bars[j].style.height
                    bars[j].style.height = bars[j+1].style.height
                    bars[j+1].style.height = temp2

                    bars[j].style.backgroundColor = 'red' 
                    bars[j+1].style.backgroundColor = 'blue'
                    await delay(10)
                    bars[j].style.backgroundColor = 'blue' 
                    bars[j+1].style.backgroundColor = 'red'  
                    await delay(10)
                    
                }
                await delay(10)   
            }
            await delay(1)
        }
    }
    await sort()
    for(let i = 0; i < bars.length ; i++){
        bars[i].style.backgroundColor = 'purple'
        await delay(10)
    }
}

// performs mergeSort on the generated array
async function mergeSort(){

    const bars = document.querySelectorAll('.bar')
    
    //console.log(bars.length)

    let barArray = []

    // appending the values of the bars into an array for merge sorting
    bars.forEach(bar =>{
        barArray.push(bar.style.value)
    })
    
    async function merge (l, m, r){
        let i = l, j = m+1, k = l;
        let temp = new Array(barArray.length).fill(0)

        while(i <= m && j <= r){
            for(let k = 0; k < barArray.length; k++){
                if(k!= j && k != i){
                    bars[k].style.backgroundColor = 'turquoise'
                }
            }
            // actual sorting
            await delay(10)
            bars[j].style.backgroundColor = 'red' 
            bars[i].style.backgroundColor = 'blue'
            if(barArray[i] > barArray[j]){
                temp[k++] = barArray[j++];
            }else{
                temp[k++] = barArray[i++];
            }    
        }   
        while(i <= m){

            temp[k++] = barArray[i++]
        }
        while(j <= r){

            temp[k++] = barArray[j++]
        }
            
        for(let s = l; s <= r; s++) {
            await delay(10)
            bars[s].style.height = temp[s] +'vh'
            bars[s].style.value = temp[s]
            barArray[s] = temp[s];
        }        
    }
    async function mergeSortHelper(l, r) {
        if(l < r){
            let m = Math.floor((l+r)/2)
            await mergeSortHelper(l,m)
            await mergeSortHelper(m+1,r)
            await merge(l, m, r)
        }
        
    }
    await mergeSortHelper(0, barArray.length-1)
    for(let i = 0; i < bars.length; i++){
        bars[i].style.backgroundColor = 'purple'
        await delay(10)
    }
}



      