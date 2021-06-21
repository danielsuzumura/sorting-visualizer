import {box,DEFAULT_SIZE} from "./script.js";
import {setTime} from "./util.js"
import {sortFunction} from "./sort.js";

/** Value to fit user's array to HTML height */
let sizeFactor;

/**
 * Manages which sort method will be apllied
 * @param {*} array Array to be sorted
 */
export function sort(array) {
    /** Slider value indicates animation speed*/
    let slider_speed = document.getElementById("slider_speed").value;
    setTime(slider_speed);
    let sortName = document.getElementById("sortName").value;
    sortFunction[sortName](array);
}

/**
 * Change css value of width from value bar
 * @param {Number} n Pixels
 */
function changeNumberSize(n){
    document.documentElement.style.setProperty("--number-size",n+"px");
}

/**
 * Creates and adds value-bar to HTML
 * @param {HTMLDivElement[]} array Each div's heights value will be inserted
 */
function addValueBar(array){
    let colDraw = document.getElementById("col-plot");
    colDraw.colSpan = array.length;
    let row = document.getElementById("table-value");
    array.forEach(x => {
        let height = x.offsetHeight;
        let col = document.createElement("td");
        let div = document.createElement("div");
        div.innerHTML = Math.round(height/sizeFactor);
        col.appendChild(div);
        row.appendChild(col);
    });
}

/**
 * Removes value-bar from HTML
 */
function deleteValueBar(){
    let row = document.getElementById("table-value");
    if(row.childElementCount !== 0){
        while(row.firstChild){
            row.removeChild(row.firstChild);
        }
    }
}

/**
 * Generates random array of size n
 * @param {Number} n Size
 * @param {Number} MAX_HEIGHT Max value
 * @returns array with random numbers from [0,MAX_HEIGHT*0.95]
 */
function generateRandomArray(n, MAX_HEIGHT){
    if(n > 0){
        let array = [];
        let i;
        for (i = 0; i < n; i += 1) {
            /** Multiplying limit by 0.95 so bar doesn't occupy entire canvas(aesthetic reason)*/
            array.push(parseInt((Math.random() * MAX_HEIGHT*95/100))+1);
        }
        /** Doesn't need to adjust values to fit height*/
        sizeFactor = 1;
        return array;
    }
    throw RangeError("invalid size");
}

/**
 * Creates an array of HTMLDivElement with heights from given array.
 * If the array isn't inputed, the array will be randomly generated.
 * @param {Array} array List of heights(Optional)
 * @param {Size} n Size of array
 * @param {Number} MAX_WIDTH width for each bar
 * @param {Number} MAX_HEIGHT max height that a bar can have
 * @returns HTMLDivElement[] Every bar created
 */
export function createArray(array,n,MAX_WIDTH,MAX_HEIGHT) {
    "use strict";
    let i;
    if(array === null){
        array = generateRandomArray(n, MAX_HEIGHT);
    }
    const sizes = [];
    for (i = 0; i < n; i += 1) {
        let height = array[i];
        let bar = document.createElement("div");
        bar.style.height = height + "px";
        bar.style.width = MAX_WIDTH + "px";
        bar.classList.add("bar");
        sizes.push(bar);
    }
    return sizes;
}

/**
 * Delete every bar displayed in HTML
 */
function deleteArrayDiv(){
    if(box.hasChildNodes){
        while(box.firstChild){
            box.removeChild(box.firstChild);
        }
    }
}

/**
 * Create HTMl div elements and insert then inside div "box"
 * @param {*} array Bar values(Optional - default will generate random array)
 * @param {*} n Number of elements
 * @param {*} MAX_WIDTH Max width for each bar
 * @param {*} MAX_HEIGHT Max height for each bar
 * @returns {HTMLDivElement[]} Array with every div created
 */
export function insertArrayDiv(array,n,MAX_WIDTH,MAX_HEIGHT){
    MAX_WIDTH = box.offsetWidth / n;
    changeNumberSize(MAX_WIDTH);
    array = createArray(array,n,MAX_WIDTH, MAX_HEIGHT);
    array.forEach(bar => {
        box.appendChild(bar);
    });
    if(array.length <= 40){
        addValueBar(array);
    }
    return array;
}

/**
 * Resizes bar size if window is resized
 * @param {HTMLDivElement[]} array Array containing bar
 * @param {*} MAX_WIDTH New width from box
 */
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

/**
 * Read users input of array to be sorted
 * @param {*} MAX_HEIGHT Box size -> Bar max height
 * @returns {Array} Values inserted by user with sizeFactor transformation
 *          {null} If user didn't inserted an array
 */
function readInputArray(MAX_HEIGHT){
    let inputArray = document.getElementById("input-array").value;
    if(inputArray === ''){
        return null;
    }
    /** parsing array*/
    inputArray = inputArray.split(',').filter(element => element!=="");
    if(inputArray.length === 0){
        throw TypeError("wrong format");
    }else{
        /** Verify if array contain an element that isn't a number*/
        inputArray.forEach(element=>{
            if(isNaN(element)){
                throw TypeError("not a number inserted");
            }
        });
        /** Calculate size factor to fit values with html height */
        sizeFactor = ((MAX_HEIGHT*95/100)/Math.max(...inputArray));
        return inputArray.map(element=>(element*sizeFactor));
    }
}

/**
 * Read users input of array size
 * @returns {Number} Size inserted by user
 */
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

/**
 * Read users input array or size or generate array if user
 * didn't inserted any parameter and creates array with
 * HTMLDivElement to display bar that represents values
 * @param {Number} MAX_WIDTH Max width for each bar
 * @param {Number} MAX_HEIGHT Max height for each bar
 * @returns {HTMLDivElement[]} Every bar created
 */
export function generateArray(MAX_WIDTH,MAX_HEIGHT) {
    /** Deletes previous values*/
    deleteArrayDiv();
    deleteValueBar();
    /** Users input array*/
    let inputArray;
    /** Size*/
    let n;
    try{
        inputArray = readInputArray(MAX_HEIGHT);
    }catch(err){
        /** User inserted invalid array*/
        alert(err.message);
        return;
    }
    if(inputArray === null) {       //user didn't inserted array, so the array will be randomly generated
        try{
            n = readSize();
        }catch(err){
            if(err instanceof RangeError){
                /** User inserted invalid value*/
                alert(err.message);
                return;
            }else{
                /** By default, program generates array with 30 elements*/
                n = DEFAULT_SIZE;
            }
        }
    }else{
        n = inputArray.length;
    }
    return insertArrayDiv(inputArray,n,MAX_WIDTH,MAX_HEIGHT);
}

/**
 * Restore original array (before sort)
 * @param {*} copyArray Stores the original array
 * @param {*} MAX_WIDTH Max width for each bar
 * @param {*} MAX_HEIGHT Max height for each bar
 * @returns {HTMLDivElement[]} Array restored
 */
export function restoreArray(copyArray,MAX_WIDTH,MAX_HEIGHT){
    if(copyArray === null){
        throw ReferenceError("no changes in array");
    }
    /** Removes current array*/
    deleteArrayDiv();
    deleteValueBar();
    return insertArrayDiv(copyArray,copyArray.length,MAX_WIDTH,MAX_HEIGHT);
}
