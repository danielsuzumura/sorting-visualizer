import {MAX_HEIGHT,MAX_WIDTH} from "./script.js";

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