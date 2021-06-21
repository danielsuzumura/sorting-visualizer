/*jslint es6,for, browser, devel*/
/*global
    window
*/

import * as dom from "./domChanges.js";
import { copyArrayHeight } from "./util.js";

export const DEFAULT_SIZE = 30;
export const box = document.getElementById("box");
let MAX_WIDTH;
let MAX_HEIGHT;
let array = null;
/** Stores a copy of array's heights*/
let copyArray = null;


/**
 * Initializes listeners
 */
function init() {
    "use strict";
    MAX_HEIGHT = box.offsetHeight;
    let btn_sort = document.getElementById("btn_sort");
    let btn_array = document.getElementById("btn_array");
    let btn_restoreArray = document.getElementById("btn_restoreArray");
    btn_sort.addEventListener("click",()=> dom.sort(array));
    btn_array.addEventListener("click", ()=> {
        array = dom.generateArray(MAX_WIDTH,MAX_HEIGHT);
        copyArray = copyArrayHeight(array);
    });
    btn_restoreArray.addEventListener("click",()=> {
        try{
            array = dom.restoreArray(copyArray,MAX_WIDTH,MAX_HEIGHT);
        }catch(err){
            console.log(err.message);
        }
    });
    window.addEventListener("resize", ()=>dom.resizeElements(array,MAX_WIDTH));
}

window.onload = function () {
    "use strict";
    init();
};