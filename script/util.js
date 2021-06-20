/*jslint
    es6,for,devel,browser
*/

import {box} from "./script.js";

let time;
const MAX = 100;
export function setTime(ms){
    time = MAX-ms;
}

export function swapDisplayValue(a,b){
    let row = document.getElementById("table-value");
    if(row.childElementCount > 0){
        if(isNaN(b)){
            let indexA = Array.from(a.parentNode.children).indexOf(a);
            let indexB = Array.from(b.parentNode.children).indexOf(b);
            let temp = row.childNodes[indexA].textContent;
            row.childNodes[indexA].textContent = row.childNodes[indexB].textContent;
            row.childNodes[indexB].textContent = temp;
        }else{
            let indexA = Array.from(a.parentNode.children).indexOf(a);
            row.childNodes[indexA].textContent = b;
        }
    }
}

export function swap(a, b){
    swapDisplayValue(a,b);
    let temp = a.style.height;
    a.style.height = b.style.height;
    b.style.height = temp;
}

async function changeColor(a, b, changeA, changeB){
    if(changeA === undefined){
        changeA = true;
    }
    if(changeB === undefined){
        changeB = true;
    }
    if(changeA){
        a.style.backgroundColor = "purple";
    }
    if(changeB){
        b.style.backgroundColor = "purple";
    }
    await wait(time);
    if(changeA){
        a.style.backgroundColor = "blue";
    }
    if(changeB){
        b.style.backgroundColor = "blue";
    }
}
export async function compare(a, b, changeA, changeB){
    await changeColor(a, b, changeA, changeB);
    if(a.offsetHeight > b.offsetHeight){
        return true;
    }else{
        return false;
    }
}

export function wait(ms){
    return new Promise(r => setTimeout(r, ms));
}

export function copyArrayHeight(array){
    return array.map(div => div.offsetHeight);
}