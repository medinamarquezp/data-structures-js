class Node {
    constructor(value = null) {
        if (value === null)
            throw "Node constructor must recive a value parameter";
        this.value = value;
        this.next = null;
    }
}

module.exports = Node;