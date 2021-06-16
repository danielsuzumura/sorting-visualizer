/*jslint es6,for, browser, devel*/
/*global
    window
*/

import {createArray} from "./util.js";
import {box, n} from "./const.js";
import * as sorts from "./sort.js";


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

function init() {
    "use strict";
    let sizes = null;
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
        console.log("oi");
    })
}

window.onload = function () {
    "use strict";
    init();
};