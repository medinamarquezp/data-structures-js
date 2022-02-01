const Node = require('./Node');

class Singly {
    constructor(value) {
        this.head = new Node(value);
        this.tail = this.head;
        this.size = 1;
    }

    append(value) {
        const node = new Node(value);
        this.tail.next = node;
        this.tail = node;
        this.size += 1;
        return this;
    }

    prepend(value) {
        const node = new Node(value);
        node.next = this.head;
        this.head = node;
        this.size += 1;
        return this;
    }

    insert(index, value) {
        this._validateIndex(index);

        // If index is on first position, set new node on head
        if (index === 0) {
            this.prepend(value);
            return this;
        }
        // If index is on last position or greather, set new node on tail
        if (index === this._getLastIndex() || index > this._getLastIndex()) {
            this.append(value);
            return this;
        }

        // Find boundary nodes
        const { prevNode, affectedNode } = this._getBoundaries(index);

        // Add new node in desired position
        const newNode = new Node(value);
        newNode.next = affectedNode;
        prevNode.next = newNode;
        this.size += 1;
        return this;
    }

    remove(index) {
        this._validateIndex(index);

        // Find boundary nodes
        const { prevNode, affectedNode } = this._getBoundaries(index);

        // Remove affected node
        prevNode.next = affectedNode.next;
        this.size -= 1;
        return this;
    }

    values() {
        const values = [];
        let node = this.head;
        let iterator = 1;

        while (iterator <= this.size) {
            values.push(node.value);
            node = node.next;
            iterator++;
        }

        return values;
    }

    _getLastIndex() {
        return this.size - 1;
    }

    _getBoundaries(index) {
        const prevIndex = index > 0 ? index - 1 : index;
        let prevNode = this.head;
        let iterations = 0;

        while (iterations !== prevIndex) {
            prevNode = prevNode.next;
            iterations++;
        }

        return { prevNode, affectedNode: prevNode.next };
    }

    _validateIndex(index) {
        if (!Number.isInteger(index)) throw "index must be a valid number";
        if (index < 0 || index > this.size) throw "index out of bounds";
    }
}

module.exports = Singly;
