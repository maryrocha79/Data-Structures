// BUBBLE SORT ALGO
function bubbleSort(arr) {
  let stop = arr.length - 1;

  while (stop > 0) {
    for (let i = 0; i < stop; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
      }
    }
    stop--;
  }

  return arr;
}
