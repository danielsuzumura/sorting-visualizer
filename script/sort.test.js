/**
 * @jest-environment jsdom
 */

import * as sorts from "./sort.js";

function createTestArray(n,array) {
    "use strict";
    let i;
    if(array == null){
        array = [];
        for (i = 0; i < n; i += 1) {
            array.push((Math.random() * 100) + 1);
        }
    }
    const sizes = [];
    for (i = 0; i < n; i += 1) {
        let height = array[i];
        let bar = document.createElement("div");
        bar.style.height = height + "px";
        bar.style.width = 100 + "px";
        bar.classList.add("bar");
        sizes.push(bar);
    }
    return sizes;
}

test('sort array', () => {
    let sizes = createTestArray(30);
    sorts.quicksort(sizes);
    let numbers = sizes.map(div => div.style.height);
    console.log(numbers);
    // expect(bubblesort(sizes)).toStrictEqual(sizes.sort());
});