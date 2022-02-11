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
        if (this._isEmpty()) {
            this.root = newNode;
            return this;
        }
        let node = this.root;
        while (node) {
            if (value < node.value) {
                if (node.left) {
                    node = node.left;
                } else {
                    node.left = newNode;
                    return node;
                }
            } else {
                if (node.right) {
                    node = node.right;
                } else {
                    node.right = newNode;
                    return node;
                }
            }
        }
    }

    find(value) {
        if (this._isEmpty()) return null;
        let node = this.root;
        if (node.value === value) return node;
        while (node) {
            if (node.value === value) break;
            if (value > node.value) {
                node = node.right;
            } else if (value < node.value) {
                node = node.left;
            }
        }
        return node;
    }

    findMin(node = this.root) {
        if (!this._isEmpty()) {
            while (node.left) {
                node = node.left;
            }
            return node;
        }
    }

    delete(value, node = this.root) {
        if (!node) return null;
        if (node.value === value) {
            // No childs
            if (this._isLeafNode(node)) return null;
            // Right child
            if (!node.left) return node.right;
            // Left child
            if (!node.righ) return node.left;
            // Has two children
            // Look for minor child
            const minorChild = this.findMin(node.right);
            // Replace deleted node
            node.value = minorChild.value;
            // Keep iterating to replace changed branch
            node.right = this.delete(minorChild.value, node.right);
            return node;
        }
        if (node.value < value) {
            node.right = this.delete(value, node.right);
            return node;
        }
        if (node.value > value) {
            node.left = this.delete(value, node.left);
            return node;
        }
    }

    _isLeafNode(node) {
        return !node.left && !node.right;
    }

    _isEmpty() {
        return this.root === null;
    }
}

module.exports = BinaryTree;
