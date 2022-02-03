const BinaryTree = require("../src/BinaryTree");

describe("Binary tree tests", () => {
    it("should create a Binary tree instance", () => {
        const bt = new BinaryTree();
        expect(bt.root).toBe(null);
    });

    it("should validate Binary Node instance on inserting a child node", () => {
        const bt = new BinaryTree();
        expect(() => bt.insert()).toThrow("value parameter can not be null");
        expect(() => bt.insert("Test")).toThrow(
            "value parameter must be a valid number"
        );
        expect(() => bt.insert(-2)).toThrow(
            "value parameter must be a positive number"
        );
    });

    it("should insert nodes in the correct manner", () => {
        const bt = new BinaryTree();
        bt.insert(0);
        bt.insert(2);
        bt.insert(5);
        bt.insert(3);
        bt.insert(1);
        bt.insert(4);
        expect(bt.root.value).toBe(0);
        expect(bt.root.right.value).toBe(2);
        expect(bt.root.right.right.value).toBe(5);
        expect(bt.root.right.right.left.value).toBe(3);
        expect(bt.root.right.left.value).toBe(1);
        expect(bt.root.right.right.left.right.value).toBe(4);
    });

    it("should return null when looking for a non existing node", () => {
        const bt = new BinaryTree();
        bt.insert(5);
        bt.insert(2);
        expect(bt.find(0)).toBe(null);
    });

    it("should find an existing node", () => {
        const bt = new BinaryTree();
        bt.insert(5);
        bt.insert(2);
        bt.insert(6);
        const node6 = bt.find(6);
        const node5 = bt.find(5);
        const node2 = bt.find(2);
        expect(node6.value).toBe(6);
        expect(node5.value).toBe(5);
        expect(node2.value).toBe(2);
    });
});
