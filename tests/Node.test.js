const Node = require('../Node');

describe('Node tests', () => {
    it("should validate constructor value", () => {
        expect(() => new Node()).toThrow(
            "Node constructor must recive a value parameter"
        );
    });
});