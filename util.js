/*jslint
    es6,for,devel,browser
*/

import {MAX_HEIGHT,MAX_WIDTH} from "./const.js";

export function createArray(n,array) {
    "use strict";
    let i;
    if(array === null){
        array = [];
        for (i = 0; i < n; i += 1) {
            array.push((Math.random() * MAX_HEIGHT) + 1);
        }
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

export function swap(a, b){
    let temp = a.style.height;
    a.style.height = b.style.height;
    b.style.height = temp;
}

export async function compare(a, b){
    a.style.backgroundColor = "purple";
    b.style.backgroundColor = "purple";
    await wait(50);
    a.style.backgroundColor = "blue";
    b.style.backgroundColor = "blue";
    if(a.offsetHeight > b.offsetHeight){
        return true;
    }else{
        return false;
    }
}

export function wait(ms){
    return new Promise(r => setTimeout(r, ms));
}