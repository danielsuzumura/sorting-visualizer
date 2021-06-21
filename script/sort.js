/*jslint
    es6,for,devel,browser
*/

import { swap,compare,wait, swapDisplayValue } from "./util.js";

/**
 * Stores all sort functions
 */
export let sortFunction = {
    bubblesort: array => {
        bubblesort(array);
    },
    insertionsort: array => {
        insertionsort(array);
    },
    mergesort: array => {
        mergesort(array);
    },
    quicksort: array => {
        quicksort(array);
    },
    heapsort: array => {
        heapsort(array);
    }
}

/**
 * Sort array using bubblesort method
 * @param {Array} array Div elements to be sorted by height
 */
async function bubblesort(array) {
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
            }
        }
        n -= 1;
    }
}

/**
 * Sort array using insertion sort method
 * @param {Array} array Div elements to be sorted by height
 */
async function insertionsort(array){
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

/**
 * Mergesort function
 * Merge array[start,mid] with array[m+1,end]
 * @param {Array} array Array
 * @param {Number} start Start index
 * @param {Number} mid Mid index
 * @param {Number} end End index
 */
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
        swapDisplayValue(array[i],temp[j]);
        await wait(20);
    }
}

/**
 * Mergesort function
 * @param {Array} array Div elements to be sorted by height
 * @param {Number} start Start index
 * @param {Number} end End index(inclusive)
 */
async function mergesortRec(array,start,end){
    if(start >= end){
        return;
    }
    let mid = parseInt((end + start) / 2);
    await mergesortRec(array,start,mid);
    await mergesortRec(array,mid+1,end);
    await merge(array,start, mid, end);
}

/**
 * Sort array using mergesort method
 * @param {Array} array Div elements to be sorted by height
 */
async function mergesort(array){
    mergesortRec(array,0,array.length-1);
}

/**
 * Quicksort function
 * Creates partition
 * @param {Array} array Div elements to be sorted by height
 * @param {Number} left Start index
 * @param {Number} right End index
 */
async function partition(array,left,right){
    /** PIVOT is the middle element*/
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
            /** If the pivot will be swapped, adjust pivot pointer*/
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

/**
 * Quicksort function
 * @param {Array} array Div elements to be sorted by height
 * @param {Number} left Start index
 * @param {Number} right End index(inclusive)
 */
async function quicksortRec(array,left,right){
    let index = await partition(array,left,right);
    if(left<index-1){
        await quicksortRec(array,left,index-1);
    }
    if(right>index){
        await quicksortRec(array,index, right);
    }
}

/**
 * Sort array using quicksort method
 * @param {Array} array Div elements to be sorted by height
 */
async function quicksort(array){
    quicksortRec(array,0,array.length-1);
}

/**
 * Create max-heap in subtree with root of index {i}
 * @param {Array} array Tree
 * @param {Number} i Parent index
 * @param {Number} n Array size
 */
async function heapify(array,i,n){
    let largestIndex = i;
    let leftChildIndex = i * 2 + 1;
    let rightChildIndex = i * 2 + 2;
    if(leftChildIndex < n && await compare(array[leftChildIndex], array[largestIndex])){
        // left child is bigger than parent
        largestIndex = leftChildIndex;
    }
    if(rightChildIndex < n && await compare(array[rightChildIndex], array[largestIndex])){
        // right child is the biggest of them
        largestIndex = rightChildIndex;
    }
    if(largestIndex != i){
        swap(array[largestIndex],array[i]);
        await heapify(array, largestIndex, n);
    }
}

/**
 * Sort array using heapsort method
 * @param {Array} array Div elements to be sorted by height
 */
async function heapsort(array){
    let middle = parseInt(array.length/2) - 1;
    let i;
    let n = array.length;
    for(i = middle; i >=0; i -= 1){
        await heapify(array,i,n);
    }
    for(i = array.length - 1; i >= 0; i -= 1){
        swap(array[i],array[0]);
        n -= 1;
        await heapify(array,0,n);
    }
}