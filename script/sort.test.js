/**
 * @jest-environment jsdom
 */

import * as sorts from "./sort.js";

test('sort array', () => {
    let sizes = createTestArray(30);
    sorts.quicksort(sizes);
    let numbers = sizes.map(div => div.style.height);
    console.log(numbers);
    // expect(bubblesort(sizes)).toStrictEqual(sizes.sort());
});
