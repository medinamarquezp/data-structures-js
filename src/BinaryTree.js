class BinaryNode {
    constructor(value = null) {
        BinaryNode._validateValue(value);
        this.left = null;
        this.right = null;
        this.value = value;
    }

    static _validateValue(value) {
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
        if (!this.root) {
            this.root = newNode;
            return this;
        } else {
            let currentNode = this.root;
            while (true) {
                if (value < currentNode.value) {
                    if (!currentNode.left) {
                        currentNode.left = newNode;
                        return this;
                    }
                    currentNode = currentNode.left;
                }
                if (value > currentNode.value) {
                    if (!currentNode.right) {
                        currentNode.right = newNode;
                        return this;
                    }
                    currentNode = currentNode.right;
                }
            }
        }
    }

    find(value) {
        const boundaries = this._getBoundaries(value);
        return !boundaries ? null : boundaries.currentNode;
    }

    delete(value) {
        const boundaries = this._getBoundaries(value);
        if (!boundaries) return null;
        const { prevNode, currentNode } = boundaries;

        // Delete leaf node
        if (this._isLeafNode(currentNode)) {
            this._setToParent(prevNode, prevNode);
        }
        // Delete node with left child
        if (currentNode.left && !currentNode.right) {
            this._setToParent(prevNode, prevNode, currentNode.left);
        }
        // Delete node with right child
        if (!currentNode.left && currentNode.right) {
            this._setToParent(prevNode, currentNode, currentNode.right);
        }
        // TODO: Delete node with two children
    }

    _setToParent(prevNode, currentNode, value = null) {
        if (prevNode.value > currentNode.value) {
            prevNode.left = value;
            return this;
        }
        prevNode.right = value;
        return this;
    }

    _isLeafNode(node) {
        return !node.left && !node.right;
    }

    _getBoundaries(value) {
        BinaryNode._validateValue(value);
        let prevNode = null;
        let currentNode = this.root;
        if (value === currentNode.value) return { prevNode, currentNode };
        while (true) {
            if (value < currentNode.value) {
                if (!currentNode.left) return null;
                prevNode = currentNode;
                currentNode = currentNode.left;
                if (currentNode.value === value)
                    return { prevNode, currentNode };
            }
            if (value > currentNode.value) {
                if (!currentNode.right) return null;
                prevNode = currentNode;
                currentNode = currentNode.right;
                if (currentNode.value === value)
                    return { prevNode, currentNode };
            }
        }
    }
}

module.exports = BinaryTree;
