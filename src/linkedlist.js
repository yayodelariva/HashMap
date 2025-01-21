import Node from "./node.js";
export default class LinkedList {
  constructor() {
    this.listHead = null;
    this.message = "message";
  }
  removeMsg() {
    if (this.message != "") {
      this.message = "";
    } else {
      return console.log("theres no message to remove");
    }
  }
  addMsg() {
    let newMsg = prompt("whats gonna be the new message?");
    this.message = newMsg;
    return;
  }

  prepend(key, value) {
    let tmp = null;
    if (this.listHead != null) tmp = this.listHead;
    this.listHead = new Node(key, value);
    this.listHead.nextNode = tmp;
  }

  append(key, value) {
    if (this.listHead == null) this.prepend(key, value);
    else {
      let tmp = this.listHead;
      while (tmp.nextNode != null) tmp = tmp.nextNode;
      tmp.nextNode = new Node(key, value);
    }
  }

  size() {
    let tmp = this.listHead;
    let counter = 0;
    while (tmp != null) {
      counter++;
      tmp = tmp.nextNode;
    }
    return counter;
  }

  head() {
    return this.listHead;
  }

  tail() {
    let tmp = this.listHead;
    while (tmp.nextNode != null) {
      tmp = tmp.nextNode;
    }
    return tmp;
  }

  at(index) {
    let tmp = this.listHead;
    console.log(index);
    for (let i = 0; i < index; i++) {
      tmp = tmp.nextNode;
    }
    return tmp;
  }

  pop() {
    let current = this.listHead;

    while (current.nextNode != null) {
      current = current.nextNode;
    }
    current = null;
    return;
  }

  contains(value) {
    let tmp = this.listHead;
    while (tmp != null) {
      if (tmp.value == value) return true;
      tmp = tmp.nextNode;
    }
    return false;
  }

  find(value) {
    let tmp = this.listHead;
    let index = 0;
    while (tmp.value != value || tmp.value == null) {
      tmp = tmp.nextNode;
      index++;
    }
    return index;
  }

  toString() {
    let tmp = this.listHead;
    let stringList = "";
    while (tmp != null) {
      stringList += `(${tmp.value}) -> `;
      tmp = tmp.nextNode;
    }
    return (stringList += "null");
  }
}
