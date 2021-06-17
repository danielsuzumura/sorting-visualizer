/*jslint
    es6,for,devel,browser
*/

import { swap,compare,wait } from "./util.js";

export async function bubblesort(array) {
    "use strict";
    let n = array.length;
    let isSorted = false;
    while (isSorted === false) {
        isSorted = true;
        let i;
        for (i = 0; i < n - 1; i += 1) {
            if (await compare(array[i], array[i + 1]) === true) {
                swap(array[i], array[i + 1]);
                isSorted = false;
                // await wait(50);
            }
        }
        n -= 1;
    }
}

export async function insertionsort(array){
    "use strict";
    let n = array.length;
    let i;
    for(i = 1; i < n; i += 1) {
        let j = i;
        while(j > 0 && await compare(array[j], array[j-1]) === false) {
            swap(array[j-1],array[j]);
            j -= 1;
        }
    }
}

async function merge(array, start, mid, end){
    let temp = [];
    let i = start, j = mid+1;
    while(i <= mid && j <= end){
        if(await compare(array[i], array[j]) === false){
            temp.push(array[i].offsetHeight);
            i += 1;
        } else {
            temp.push(array[j].offsetHeight);
            j += 1;
        }
    }
    while(i <= mid){
        temp.push(array[i].offsetHeight);
        i += 1;
    }
    while(j <= end){
        temp.push(array[j].offsetHeight);
        j += 1;
    }
    for(i = start, j = 0; i <= end; i += 1, j += 1){
        array[i].style.height = temp[j]+"px";
        await wait(20);
    }
}

async function mergesortRec(array,start,end){
    if(start >= end){
        return;
    }
    let mid = parseInt((end + start) / 2);
    await mergesortRec(array,start,mid);
    await mergesortRec(array,mid+1,end);
    await merge(array,start, mid, end);
}

export async function mergesort(array){
    mergesortRec(array,0,array.length-1);
}

async function partition(array,left,right){
    let pivot = array[parseInt((right+left)/2)];
    pivot.style.backgroundColor = "red";
    while(left <= right){
        while(await compare(array[left], pivot,true,false) === false && array[left] !== pivot){
            left++;
        }
        while(await compare(array[right], pivot,true,false) === true){
            right--;
        }
        if(left <= right){
            if(array[left] === pivot){
                pivot.style.backgroundColor = "blue";
                pivot = array[right];
                pivot.style.backgroundColor = "red";
            }
            else if(array[right] === pivot){
                pivot.style.backgroundColor = "blue";
                pivot = array[left];
                pivot.style.backgroundColor = "red";
            }
            swap(array[left],array[right]);
            left++;
            right--;
        }
    }
    pivot.style.backgroundColor = "blue";
    return left;
}

async function quicksortRec(array,left,right){
    let index = await partition(array,left,right);
    if(left<index-1){
        await quicksortRec(array,left,index-1);
    }
    if(right>index){
        await quicksortRec(array,index, right);
    }
}

export async function quicksort(array){
    quicksortRec(array,0,array.length-1);
}

export async function heapsort(array){}