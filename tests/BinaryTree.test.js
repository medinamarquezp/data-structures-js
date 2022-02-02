const BinaryTree = require('../src/BinaryTree');

describe('Binary tree tests', () => {
    it('should create a Binary tree instance', () => {
        const bt = new BinaryTree();
        expect(bt.root).toBe(null)
    });

    it('should validate Binary Node instance on inserting a child node', () => {
        const bt = new BinaryTree();
        expect(() => bt.insert()).toThrow('value parameter can not be null');
        expect(() => bt.insert('Test')).toThrow('value parameter must be a valid number');
        expect(() => bt.insert(-2)).toThrow('value parameter must be a positive number');
    });

    it('should insert nodes in the correct manner', () => {
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
});