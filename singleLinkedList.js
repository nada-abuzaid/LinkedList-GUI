const input = document.getElementById('input');
let viewSection = document.getElementById('view');
const non = document.getElementById('non');
const getNodeBtn = document.getElementById('get');
const addFirstBtn = document.getElementById('unshift');
const addEndBtn = document.getElementById('push');
const removeFirstBtn = document.getElementById('shift');
const removeEndBtn = document.getElementById('pop');
const removeBtn = document.getElementById('remove');
const clearBtn = document.getElementById('clear');

// Node Class
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

// List Class
class singlyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
}

let list = new singlyLinkedList();
const prototype = singlyLinkedList.prototype;

// Get Node in a specific index "getNode"
prototype.getNode = function (index) {
  if (index < 0 || index >= this.length) {
    return undefined;
  }

  let currentNode = this.head;
  let counter = 0;
  while (currentNode) {
    if (counter === index) {
      break;
    }
    counter++;
    currentNode = currentNode.next;
  }

  return currentNode;
};

// Add Node in the end "push"
prototype.push = function (val) {
  let newNode = new Node(val);

  if (this.head === null) {
    this.head = newNode;
    this.tail = this.head;
  } else {
    this.tail.next = newNode;
    this.tail = newNode;
  }

  this.length++;
  return this;
};

// Add Node in the First "unshift"
prototype.unshift = function (val) {
  let newNode = new Node(val);
  if (this.head === null) {
    this.head = newNode;
    this.tail = this.head;
    non.style.display = 'none';
  } else {
    newNode.next = this.head;
    this.head = newNode;
  }

  this.length++;
  return this;
};

// Remove Node from the beginning "shift"
prototype.shift = function () {
  if (this.head === null) {
    non.style.display = 'block';
    non.textContent = 'Linked List is already empty!!';
    return;
  }

  let temp = this.head;
  this.head = this.head.next;
  temp.next = null;

  this.length--;
  return temp.val;
};

// Remove Node from a specific position "remove"
prototype.removeNode = function (index) {
  if (index < 0 || index >= this.length) {
    return undefined;
  }

  let removedNode = null;

  if (this.length === 1 || index === 0) {
    removedNode = this.shift();
  } else {
    let previousNode = this.getNode(index - 1);
    removedNode = previousNode.next;
    previousNode.next = removedNode.next;
    removedNode.next = null;
  }

  this.length--;
  return removedNode;
};

// Remove Node from the end "remove"
prototype.pop = function () {
  let previousNode = this.getNode(this.length - 2);
  removedNode = previousNode.next;
  previousNode.next = null;
  this.tail = previousNode;
  this.length--;
  return removedNode ? removedNode.val : undefined;
};

// Handle push method
addEndBtn.addEventListener('click', () => {
  const newNodeValue = input.value;
  if (newNodeValue === '') {
    non.style.display = 'block';
    non.textContent = 'Please enter value to your node!';
  } else {
    non.style.display = 'none';
    const div = document.createElement('div');
    div.className = 'node';
    viewSection.appendChild(div);
    const nodeData = document.createElement('span');
    nodeData.className = 'node-data';
    nodeData.textContent = newNodeValue;
    div.appendChild(nodeData);
    const icon = document.createElement('i');
    icon.className = 'far fa-arrow-alt-from-left';
    div.appendChild(icon);
    list.push(newNodeValue);
    input.value = '';
  }
});

// Handle unshift method
addFirstBtn.addEventListener('click', () => {
  const newNodeValue = input.value;
  if (newNodeValue === '') {
    non.style.display = 'block';
    non.textContent = 'Please enter value to your node!';
  } else {
    non.style.display = 'none';
    const div = document.createElement('div');
    div.className = 'node';
    viewSection.prepend(div);
    const nodeData = document.createElement('span');
    nodeData.className = 'node-data';
    nodeData.textContent = newNodeValue;
    div.appendChild(nodeData);
    const icon = document.createElement('i');
    icon.className = 'far fa-arrow-alt-from-left';
    div.appendChild(icon);
    list.unshift(newNodeValue);
    input.value = '';
  }
});

// Handle shift method
removeFirstBtn.addEventListener('click', () => {
  const ele = list.shift();
  const nodes = document.getElementsByClassName('node');
  for (let i = 0; i < nodes.length; i++) {
    const valueee = nodes[i].getElementsByTagName('span')[0].textContent;
    if (valueee === ele) {
      nodes[i].remove();
      input.value = '';
      break;
    }
  }
});

// Handle pop method
removeEndBtn.addEventListener('click', () => {
  if (list.length > 1) {
    const index = list.length - 1;
    list.pop();
    const nodes = document.getElementsByClassName('node');
    nodes[index].remove();
    input.value = '';
  } else {
    list.shift();
    const nodes = document.getElementsByClassName('node');
    nodes[0].remove();
    list.tail = null;
    input.value = '';
  }
});

// Handle remove method
removeBtn.addEventListener('click', () => {
  const inputIdx = input.value;
  const nodes = document.getElementsByClassName('node');
  const index = Number(inputIdx);
  console.log(list.length);

  if (inputIdx != '') {
    non.style.display = 'none';
    if (index === 0 && list.length === 1) {
      list.tail = null;
      list.shift();
      nodes[index].remove();
      input.value = '';
    } else if (index === list.length - 1) {
      list.pop();
      nodes[index].remove();
      input.value = '';
    } else if (index < list.length) {
      list.length++;
      list.removeNode(index);
      console.log(list.length);
      nodes[index].remove();
      input.value = '';
    } else if (list.length === 0) {
      non.style.display = 'block';
      non.textContent = 'Your Linked List is alreadt empty LOL!';
    } else {
      non.style.display = 'block';
      non.textContent = 'Please, Enter a valid index!';
    }
  } else {
    non.style.display = 'block';
    non.textContent = 'Please, Enter a node index!';
  }
  console.log(list.length);
});

// Handle get node method
getNodeBtn.addEventListener('click', () => {
  const index = Number(input.value);

  if (index < list.length) {
    const nodes = document.getElementsByClassName('node');
    for (let i = 0; i < nodes.length; i++) {
      const span = nodes[i].getElementsByTagName('span')[0];
      if (i == index) {
        span.style.backgroundColor = '#7A0BC0';
        input.value = '';
      } else span.style.backgroundColor = '#00c897';
    }
  } else {
    non.style.display = 'block';
    non.textContent = 'Please, Enter a valid index!';
  }
});

// Clear the linked list
clearBtn.addEventListener('click', () => {
  viewSection.textContent = '';
  input.value = '';
  non.style.display = 'block';
  non.textContent = 'Your Linked List is empty Now!';
});
