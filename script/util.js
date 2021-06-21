/*jslint
    es6,for,devel,browser
*/

/** Stores the number of milliseconds for timeout*/
let time;
const MAX = 100;

/**
 * Calculate the wait time
 * The time is inversely proportional to ms
 * @param {Number} ms
 */
export function setTime(ms){
    /** Calculation made this way so slider bar is setup to increase speed */
    time = MAX-ms;
}

/**
 * Swap the display value from second row
 * @param {HTMLDivElement} a
 * @param {HTMLDivElement} b
 */
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

/**
 * Swap bar height and the display value below bar
 * @param {HTMLDivElement} a
 * @param {HTMLDivElement} b
 */
export function swap(a, b){
    swapDisplayValue(a,b);
    let temp = a.style.height;
    a.style.height = b.style.height;
    b.style.height = temp;
}

/**
 * Change the color of divs a and b to purple for {{time}} milliseconds
 * @param {HTMLDivElement} a
 * @param {HTMLDivElement} b
 * @param {Boolean} changeA If a will change color(optional - default true)
 * @param {Boolean} changeB If b will change color(optional - default true)
 */
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

/**
 * Compare the height of a and b
 * @param {HTMLDivElement} a
 * @param {HTMLDivElement} b
 * @param {Boolean} changeA If a will change color(optional - default true)
 * @param {Boolean} changeB If b will change color(optional - default true)
 * @return {Boolean} if a is greater than b
 */
export async function compare(a, b, changeA, changeB){
    await changeColor(a, b, changeA, changeB);
    if(a.offsetHeight > b.offsetHeight){
        return true;
    }else{
        return false;
    }
}

/**
 * Creates a promise that waits
 * for {{ms}} milliseconds
 * @param {Number} ms
 * @returns {Promise} returns in {{ms}} seconds
 */
export function wait(ms){
    return new Promise(r => setTimeout(r, ms));
}

/**
 * Create an array that contains every element's height
 * @param {*} array
 * @returns array that contains every element's height
 */
export function copyArrayHeight(array){
    return array.map(div => div.offsetHeight);
}