// O(a)
// Assume a and b are integers
function multiply(a, b) {
  let sum = 0;
  for (let i = 0; i < a; i++) {
    sum += b;
  }
  return sum;
}

// Assume a and b are integers  "Russian Peasant Multiplication".
//O log( Math.max(a, b))===> bigger if being 1/2 every iteration, so we'll loop 1/2 that
function multiplyTwo(a, b) {
  let bigger = Math.max(a, b);
  let smaller = bigger === a ? b : a;

  let sum = 0;
  while (bigger >= 1) {
    if (bigger % 2 === 1) {
      sum += smaller;
    }

    bigger = bigger >> 1;
    smaller = smaller << 1;
  }

  return sum;
}

// Assume students is an array of integers
// O(students^2 * Max(students)) or O(n^2 * m)
// if  I know upper bound of students =====>>> O(students^2)
function computePairs(students) {
  let pairs = [];
  for (let outer of students) {
    for (let inner of students) {
      pairs.push(multiply(outer, inner));
    }
  }
}

// Assume students is an array of integers
// O(students^2 * log(max(students)))
function computePairsTwo(students) {
  let pairs = [];
  for (let outer of students) {
    for (let inner of students) {
      pairs.push(multiplyTwo(outer, inner));
    }
  }
}

//Stack
class Stack {
  constructor() {
    this._array = [];
  }

  size() {
    return this._array.length;
  }

  push(val) {
    this._array.push(val);
  }

  pop() {
    return this._array.pop();
  }

  peak() {
    return this._array[this._array.length - 1];
  }
}

//Queue
class Queue {
  constructor() {
    this._array = [];
  }

  size() {
    return this._array.length;
  }

  enqueuer(val) {
    this._array.unshift(val);
  }

  dequeuer() {
    return this._array.pop();
  }

  peak() {
    return this._array[this._array.length - 1];
  }
}

//Tyler DATA STRUCTURES LECTURE
class Stack {
  constructor() {
    this._array = [];
  }

  size() {
    return this._array.length;
  }

  push(val) {
    this._array.push(val);
  }

  pop() {
    return this._array.pop();
  }

  peak() {
    return this._array[this._array.length - 1];
  }
}

//=========
function distribute(prime, size) {
  let array = new Array(size);
  array.fill(0);
  for (let i = 0; i < size; i++) {
    array[hash(i, prime, size)]++;
  }
  return array;
}

function hash(n, prime, size) {
  return (n * prime) % size;
}

function countCollisions(array) {
  let count = 0;
  for (let val of array) {
    if (val > 1) {
      count += val - 1;
    }
  }
  return count;
}

countCollisions(distribute(31, 1000));

//=========

/**
 * @param {string} s
 * @return {number}
 */
var calculate = function(s) {
  let currentSegment = '';
  let stack = [];
  let sum = 0;

  for (let c of s) {
    if (c === ' ') continue;
    else if (c === '(') {
      // push current segment, begin new segment
      stack.push(currentSegment);
      currentSegment = '';
    } else if (c === ')') {
      // handle current segment, pop old segment
      let prevSegment = stack.pop();
      let segmentValue = handleSegment(currentSegment);
      currentSegment = prevSegment + String(segmentValue);
    } else {
      currentSegment += c;
    }
  }

  sum += handleSegment(currentSegment);
  return sum;
};

var handleSegment = function(segment) {
  let sum = 0;
  let currentNumber = '';
  let signModifier = 1;
  let lastCharWasSub = false;

  for (let c of segment) {
    if (c === '+') {
      sum += signModifier * Number(currentNumber);
      signModifier = 1;
      currentNumber = '';
      lastCharWasSub = false;
    } else if (lastCharWasSub && c === '-') {
      signModifier = signModifier * -1;
      lastCharWasSub = true;
    } else if (c === '-') {
      sum += signModifier * Number(currentNumber);
      signModifier = -1;
      currentNumber = '';
      lastCharWasSub = true;
    } else {
      currentNumber += c;
      lastCharWasSub = false;
    }
  }

  return sum + signModifier * Number(currentNumber);
};

//=============
function DFS(rootNode) {
  // Check that a root node exists.
  if (rootNode === undefined) {
    return;
  }

  let queue = [];
  queue.push(rootNode);

  while (queue.length > 0) {
    let currentNode = queue.pop();
    for (let child of currentNode.children) {
      queue.push(child);
    }
  }
}

function BFS(rootNode) {
  // Check that a root node exists.
  if (rootNode === undefined) {
    return;
  }

  let queue = [];
  queue.push(rootNode);

  while (queue.length > 0) {
    let currentNode = queue.shift();
    for (let child of currentNode.children) {
      queue.push(child);
    }
  }
}

function DFS(node) {
  if (node === undefined) {
    return;
  }

  for (let node of node.children) {
    DFS(node);
  }
}

//GRAPH
function BFS(startNode, goalNode) {
  let frontier = [];
  let exploredList = {};
  frontier.push([startNode, null]);

  while (frontier.length > 0) {
    let [currentNode, reachedFrom] = frontier.shift();

    if (currentNode === goalNode) {
      // Rebuild the path from the explored list
      let currentItr = currentNode;
      let shortestPath = [];
      while (currentItr !== null) {
        shortestPath.push(currentItr);
        currentItr = exploredList[currentItr];
      }

      return shortestPath.reverse();
    } else if (exploredList[currentNode] !== undefined) {
      continue;
    }

    for (let neighbor of currentNode.neighbors) {
      // NOTICE -- pushing currentNode as well as the neighbor.
      frontier.push([neighbor, currentNode]);
    }

    exploredList[currentNode] = reachedFrom;
  }

  return null; // Indicating no path exists
}
