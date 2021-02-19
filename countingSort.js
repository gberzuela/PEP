// Randomly generate an array of length 10 with negative values
// Range: -100 -> 100
const array = Array.from(
  { length: 10 },
  () => Math.round((Math.random() - 0.5) * 100)
);

/* Counting Sort
 *  Sorting technique based on keys between a specific range
 *  Count the number of occurences of each element 
 *  Calculate proper index
 */

 /* Time and Space analysis
  * Assuming inputs have range 1-k, analysis is as follows:
  * n => number of elements in input array
  * k => range of input
  * Time Complexity:  O(n + k) 
  * Space Complexity: O(n + k) b/c of the auxillary output and count array 
  */
const countingSort = (arr) => {
  const len = arr.length;

  // Keep track of the min and max values of the input to handle negatives
  const max = Math.max(...arr)
  const min = Math.min(...arr)
  const range = max - min + 1

  // Output character array to hold sorted array
  const output = Array(len).fill(0);

  // Count array to count individual characters
    // Smallest element is indexed to 0
  const bucket = Array(range).fill(0)
  for (let i = 0; i < len; i++) {
      bucket[arr[i] - min]++
  }

  // Format count array to indicate proper index for each value
  for (let i = 1; i < bucket.length; i++) {
    bucket[i] += bucket[i - 1];
  }

  // Build output array.
  // For stability, this is done in reverse
  for (let i = len - 1; i >= 0; i--) {
    output[bucket[arr[i] - min] - 1] = arr[i];
    bucket[arr[i] - min]--;
  }

  // Copy output to arr to modify input
  // Return output if we want to keep this function pure
  for (let i = 0; i < len; i++) {
    arr[i] = output[i];
  }
};

console.log("(Counting) BEFORE sorting -->", array);

countingSort(array);

console.log("(Counting) AFTER sorting -->", array);
