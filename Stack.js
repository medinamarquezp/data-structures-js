const Node = require("./Node");

class Stack {
    constructor() {
        this.top = null;
        this.bottom = null;
        this.size = 0;
    }

    peek() {
        return this.top;
    }

    push(value) {
        const node = new Node(value);
        if (this.size === 0) {
            this.top = node;
            this.bottom = node;
        } else {
            const currentTop = this.top;
            node.next = currentTop;
            this.top = node;
        }
        this.size += 1;
        return this;
    }

    pop() {
        if (this.size === 0) return null;
        const currentPrev = this.top.next;
        this.top = currentPrev;
        this.top.next = null;
        this.size -= 1;
    }

    size() {
        return this.size;
    }
}

module.exports = Stack;
