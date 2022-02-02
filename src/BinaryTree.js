class BinaryNode {
    constructor(value = null) {
        this._validateValue(value);
        this.left = null;
        this.right = null;
        this.value = value;
    }

    _validateValue(value) {
        if (value === null) throw "value parameter can not be null";
        if (!Number.isInteger(value))
            throw "value parameter must be a valid number";
        if (value < 0) throw "value parameter must be a positive number";
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }

    insert(value) {
        const newNode = new BinaryNode(value);
        if (this.root === null) {
            this.root = newNode;
            return this;
        } else {
            let currentNode = this.root;
            while (true) {
                if (value < currentNode.value) {
                    if (currentNode.left === null) {
                        currentNode.left = newNode;
                        return this;
                    }
                    currentNode = currentNode.left;
                }
                if (value > currentNode.value) {
                    if (currentNode.right === null) {
                        currentNode.right = newNode;
                        return this;
                    }
                    currentNode = currentNode.right;
                }
            }
        }
    }
}

module.exports = BinaryTree;
