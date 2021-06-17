/*jslint
    es6,for,devel,browser
*/

const TIME = 30;

export function swap(a, b){
    let temp = a.style.height;
    a.style.height = b.style.height;
    b.style.height = temp;
}

export async function compare(a, b, changeA, changeB){
    if(changeA === true || changeA === undefined){
        a.style.backgroundColor = "purple";
    }
    if(changeB|| changeB === undefined){
        b.style.backgroundColor = "purple";
    }
    await wait(TIME);
    if(changeA|| changeA === undefined){
        a.style.backgroundColor = "blue";
    }
    if(changeB || changeB === undefined){
        b.style.backgroundColor = "blue";
    }
    if(a.offsetHeight > b.offsetHeight){
        return true;
    }else{
        return false;
    }
}

export function wait(ms){
    return new Promise(r => setTimeout(r, ms));
}