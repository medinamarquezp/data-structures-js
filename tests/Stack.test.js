const Stack = require("../Stack");

describe("Stack tests", () => {
    it("should initialize an empty stack", () => {
        const stack = new Stack();
        expect(stack.top).toBe(null);
        expect(stack.bottom).toBe(null);
        expect(stack.size).toBe(0);
    });

    it("should push new elements in the stack", () => {
        const stack = new Stack();
        stack.push("c");
        stack.push("b");
        stack.push("a");
        expect(stack.size).toBe(3);
        expect(stack.top.value).toBe("a");
        expect(stack.bottom.value).toBe("c");
    });

    it("should peek last element in the stack", () => {
        const stack = new Stack();
        stack.push("x");
        stack.push("y");
        expect(stack.size).toBe(2);
        expect(stack.peek().value).toBe("y");
    });

    it("should pop an element in the stack", () => {
        const stack = new Stack();
        stack.push("x");
        stack.push("y");
        expect(stack.size).toBe(2);
        stack.pop();
        expect(stack.size).toBe(1);
        expect(stack.top.value).toBe("x");
        expect(stack.top.next).toBe(null);
    });
});
