import {box,DEFAULT_SIZE} from "./script.js";

let sizeFactor;

function changeNumberSize(n){
    document.documentElement.style.setProperty("--number-size",n+"px");
}

function addValueBar(array,n){
    let colDraw = document.getElementById("col-plot");
    colDraw.colSpan = n;
    let row = document.getElementById("table-value");
    array.forEach(x => {
        let col = document.createElement("td");
        let div = document.createElement("div");
        div.innerHTML = Math.round(x/sizeFactor);
        col.appendChild(div);
        row.appendChild(col);
    });
}
function deleteValueBar(){
    let row = document.getElementById("table-value");
    if(row.childElementCount !== 0){
        while(row.firstChild){
            row.removeChild(row.firstChild);
        }
    }
}
export function createArray(array,n,MAX_WIDTH,MAX_HEIGHT) {
    "use strict";
    let i;
    if(array === null){
        array = [];
        for (i = 0; i < n; i += 1) {
            array.push(parseInt((Math.random() * MAX_HEIGHT*95/100))+1);
        }
        sizeFactor = 1;
    }
    const sizes = [];
    for (i = 0; i < n; i += 1) {
        let height = array[i];
        let bar = document.createElement("div");
        // let size = document.createElement("p");
        // size.textContent = height/sizeFactor;
        // bar.appendChild(size);
        bar.style.height = height + "px";
        bar.style.width = MAX_WIDTH + "px";
        bar.classList.add("bar");
        sizes.push(bar);
    }
    if(n <= 40){
        addValueBar(array,n);
    }
    return sizes;
}

export function deleteArrayDiv(){
    if(box.hasChildNodes){
        while(box.firstChild){
            box.removeChild(box.firstChild);
        }
    }
}

export function insertArrayDiv(array,n,MAX_WIDTH,MAX_HEIGHT){
    MAX_WIDTH = box.offsetWidth / n;
    changeNumberSize(MAX_WIDTH);
    array = createArray(array,n,MAX_WIDTH, MAX_HEIGHT);
    array.forEach(bar => {
        box.appendChild(bar);
    });
    return array;
}

export function resizeElements(array,MAX_WIDTH){
    if(array === null) {
        return;
    }
    MAX_WIDTH = box.offsetWidth / array.length;
    changeNumberSize(MAX_WIDTH);
    array.forEach(child => {
        child.style.width = MAX_WIDTH +"px";
    })
}

function readInputArray(MAX_HEIGHT){
    let inputArray = document.getElementById("input-array").value;
    if(inputArray === ''){
        return null;
    }
    //parsing array
    inputArray = inputArray.split(',').filter(element => element!=="");
    if(inputArray.length === 0){
        throw TypeError("wrong format");
    }else{
        inputArray.forEach(element=>{
            if(isNaN(element)){
                throw TypeError("not a number inserted");
            }
        })
        sizeFactor = ((MAX_HEIGHT*95/100)/Math.max(...inputArray));
        return inputArray.map(element=>(element*sizeFactor));
    }
}
function readSize() {
    const inputSize = document.getElementById("input-size").value;
    if(inputSize === ''){
        throw "empty field";
    }
    if(inputSize > 100 || inputSize < 1){
        throw new RangeError("insert number between 1 and 100");
    }
    return parseInt(inputSize);
}

export function generateArray(MAX_WIDTH,MAX_HEIGHT) {
    deleteArrayDiv();
    deleteValueBar();
    let inputArray;
    let n;
    try{
        inputArray = readInputArray(MAX_HEIGHT);
    }catch(err){
        alert(err.message);
        return;
    }
    if(inputArray === null) {
        try{
            n = readSize();
        }catch(err){
            if(err instanceof RangeError){
                alert(err.message);
                return;
            }else{
                n = DEFAULT_SIZE;
            }
        }
    }else{
        n = inputArray.length;
    }
    return insertArrayDiv(inputArray,n,MAX_WIDTH,MAX_HEIGHT);
}

export function restoreArray(copyArray,MAX_WIDTH,MAX_HEIGHT){
    if(copyArray === null){
        throw ReferenceError("no changes in array");
    }
    deleteArrayDiv();
    deleteValueBar();
    return insertArrayDiv(copyArray,copyArray.length,MAX_WIDTH,MAX_HEIGHT);
}
