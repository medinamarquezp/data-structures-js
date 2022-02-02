const Node = require("./Node");

class Queue {
    constructor() {
        this.top = null;
        this.bottom = null;
        this.size = 0;
    }

    peek() {
        return this.bottom;
    }

    enqueue(value) {
        const node = new Node(value);
        if (this.size === 0) {
            this.top = node;
            this.bottom = node;
        } else {
            const currentBottom = this.bottom;
            currentBottom.next = node;
            this.top = node;
        }
        this.size += 1;
        return this;
    }

    dequeue() {
        if (this.size === 0) return null;
        const nextNode = this.bottom.next;
        this.bottom = nextNode;
        this.size -= 1;
    }

    size() {
        return this.size;
    }

    values() {
        const values = [];
        let node = this.bottom;
        let iterator = 0;
        while (iterator < this.size) {
            values.push(node.value);
            node = node.next;
            iterator++;
        }
        return values;
    }
}

module.exports = Queue;
