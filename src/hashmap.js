//index
import "./style.css";
import LinkedList from "./linkedlist";

class HashMap {
  constructor() {
    this.capacity = 16;
    this.loadFactor = 0.75;
    this.buckets = new Array(this.capacity);
    for (let i = 0; i < this.buckets.length; i++) {
      this.buckets[i] = new LinkedList();
    } //this snippet creates an array of 16 indexes, and makes every index a linkedlist
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % 16; //using modulo (%) 16 so the result falls into the 0-15 range which is the size of the array and then it later can be appended to that index
    }

    return hashCode;
  }

  checkCapacity() {
    let product = this.capacity * this.loadFactor;
    if (this.length() > product) {
      return true;
    } else {
      return false;
    }
  }

  set(key, value) {
    let index = this.hash(key);
    let bucket = this.buckets[index];
    let node = bucket.head();
    let size = bucket.size();
    let i = 1;

    if (this.checkCapacity()) {
      const oldBuckets = this.buckets;
      this.capacity *= 2;
      this.buckets = new Array(this.capacity);
      for (let i = 0; i < this.capacity; i++) {
        this.buckets[i] = new LinkedList();
      }

      for (const bucket of oldBuckets) {
        let node = bucket.head();
        while (node) {
          this.set(node.key, node.value); // Rehash and insert into the new buckets
          node = node.nextNode;
        }
      }
    }

    if (node) {
      while (i <= size) {
        if (node.key === key) {
          node.value = value;
          return;
        }
        node = node.nextNode;
        i++;
      }
      bucket.append(key, value);
    } else {
      bucket.append(key, value);
    }
  }

  get(key) {
    let index = this.hash(key);
    let bucket = this.buckets[index];
    let node = bucket.head();
    let size = bucket.size();
    let i = 1;
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("trying to access index out of bounds");
    }

    if (node) {
      while (i <= size) {
        if (node.key === key) {
          return node.value;
        }
        node = node.nextNode;
        i++;
      }
    }
    return null;
  }

  has(key) {
    let index = this.hash(key);
    let bucket = this.buckets[index];
    let node = bucket.head();
    let size = bucket.size();
    let i = 1;

    if (node) {
      while (i <= size) {
        if (node.key === key) {
          return true;
        }
        node = node.nextNode;
        i++;
      }
    }
    return false;
  }

  remove(key) {
    let index = this.hash(key);
    let bucket = this.buckets[index];
    let node = bucket.head();
    let size = bucket.size();
    let i = 1;

    if (node) {
      while (i <= size) {
        if (node.key === key) {
          node.key = null;
          return true;
        }
        return false;
      }
    }
  }

  length() {
    let lists = this.buckets;
    let counter = 0;
    for (let i = 0; i < lists.length; i++) {
      let list = lists[i];
      let node = list.head();
      let size = list.size();
      let ind = 1;

      if (node) {
        while (ind <= size) {
          if (node.key !== null) {
            counter++;
          }
          node = node.nextNode;
          ind++;
        }
      }
    }

    return counter;
  }

  clear() {
    let lists = this.buckets;
    let counter = 0;
    for (let i = 0; i < lists.length; i++) {
      let list = lists[i];
      let node = list.head();
      let size = list.size();
      let ind = 1;

      if (node) {
        while (ind <= size) {
          if (node.key !== null) {
            node.key = null;
          }
          node = node.nextNode;
          ind++;
        }
      }
    }
    console.log("removed all entries");
    return counter;
  }

  keys() {
    let lists = this.buckets;
    let keysArray = [];
    for (let i = 0; i < lists.length; i++) {
      let list = lists[i];
      let node = list.head();
      let size = list.size();
      let ind = 1;

      if (node) {
        while (ind <= size) {
          if (node.key !== null) {
            keysArray.push(node.key);
          }
          node = node.nextNode;
          ind++;
        }
      }
    }

    return keysArray;
  }

  values() {
    let lists = this.buckets;
    let valuesArray = [];
    for (let i = 0; i < lists.length; i++) {
      let list = lists[i];
      let node = list.head();
      let size = list.size();
      let ind = 1;

      if (node) {
        while (ind <= size) {
          if (node.key !== null) {
            valuesArray.push(node.value);
          }
          node = node.nextNode;
          ind++;
        }
      }
    }

    return valuesArray;
  }

  entries() {
    let lists = this.buckets;
    let nodesArray = [];
    for (let i = 0; i < lists.length; i++) {
      let list = lists[i];
      let node = list.head();
      let size = list.size();
      let ind = 1;

      if (node) {
        while (ind <= size) {
          if (node.key !== null) {
            nodesArray.push(node);
          }
          node = node.nextNode;
          ind++;
        }
      }
    }

    return nodesArray;
  }
}

export default HashMap;
