/*jslint es6,for, browser, devel*/
/*global
    window
*/

import {createArray} from "./createArray.js";
import * as sorts from "./sort.js";

export const n = 30;
export const box = document.getElementById("box");
export let MAX_WIDTH = box.offsetWidth / n;
export let MAX_HEIGHT = box.offsetHeight;
let sizes = null;

function sort(sortName,sizes){
    if(sortName === "bubblesort"){
        sorts.bubblesort(sizes);
    }else if(sortName === "quicksort"){
        sorts.quicksort(sizes);
    }else if(sortName === "insertionsort"){
        sorts.insertionsort(sizes);
    }else if(sortName === "heapsort"){
        sorts.heapsort(sizes);
    }else if(sortName === "mergesort"){
        sorts.mergesort(sizes);
    }
}

function resizeElements(){
    MAX_WIDTH = box.offsetWidth / n;
    sizes.forEach(child => {
        child.style.width = MAX_WIDTH +"px";
        //console.log(child);
    })
}

function init() {
    "use strict";
    let btn_sort = document.getElementById("btn-sort");
    let btn_array = document.getElementById("generateArray");
    btn_sort.addEventListener("click",()=>{
        let selectSort = document.getElementById("sortName").value;
        sort(selectSort,sizes);
    });
    btn_array.addEventListener("click",()=>{
        if(sizes !== null){
            while(box.firstChild){
                box.removeChild(box.firstChild);
            }
        }
        sizes = createArray(n,null);
        sizes.forEach(bar => {
            box.appendChild(bar);
        });
    });
    window.addEventListener("resize", ()=>{
        if(sizes !== null){
            resizeElements();
        }
    });
}

window.onload = function () {
    "use strict";
    init();
};