// Randomly generate an array of length 10 with negative values
// Range: -100 -> 100
// const array = Array.from({ length: 10 }, () => Math.round(Math.random() * 100));
const array = [ 4, 54, 59, 36, 68, 37, 7, 31, 57, 91 ]

/* Radix Sort
 * "Linear" sorting algorithm proceeding the Counting Sort algorithm
 * Counting sort is linear for elements in a pre determined range
 *  If elements range up to n^2 then the algorithms time and space will
 *  reflect as such. This is no good!
 *
 * Radix sort improves on this issue by sorting digit by digit
 *  i.e. sorting by the ones place, then the tens place, etc..
 */

/* Time and Space analysis
 * d => largest number of digits in input (constant)
 * b => base for representing numbers (10 for decimal in this case) (constant)
 * n => size of input array
 * k => maximum possible value in input
 *
 * Time Complexity:  O(d(n + b))
 * Space Complexity: O(d(n + b))
 *
 * Conditions:
 *   Limit k to k <= n^c where c is a constant and set b = n
 *   Time:  O(n)
 *   Space: O(n)
 * Sorting an array of integers with a range from 1 to n^c if the numbers are represented in base n
 *   (or every digit takes log2(n) bits)
 */

// arr => input array of integers
// len => predetermined length of input array
// exp => exponent/digit placement we are currently sorting by
const countSort = (arr, len, exp) => {
  // Declare sorted output array
  const output = Array(len);

  // Declare buckets
  const bucket = Array(10).fill(0);
  
  // Store count of numbers with the same digit in the 
  //  current placement
  for (let i = 0; i < len; i++) {
    bucket[Math.floor(arr[i] / exp) % 10]++;
  }
  
  // Change count array to indicate the proper index for each element
  for (let i = 1; i < 10; i++) {
    bucket[i] += bucket[i - 1];
  }


  // Construct output
  for (let i = len - 1; i >= 0; i--) {
    output[bucket[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
    bucket[Math.floor(arr[i] / exp) % 10]--;
  }

  // Optional, return output if we want to maintain a pure function
  //  Instead, we are mutating the input array directly
  for (let i = 0; i < len; i++) {
    arr[i] = output[i];
  }
};

const radixSort = (arr, len) => {
  // Find the maximum value in the input array so we can get
  //  the maximum number of digits to parse through
  const max = Math.max(...arr);

  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countSort(arr, len, exp);
  }
};

console.log("(Radix) BEFORE sorting -->", array);

radixSort(array, array.length);

console.log("(Radix) AFTER sorting -->", array);
