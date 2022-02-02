const Queue = require("../src/Queue");

describe("Queue tests", () => {
    it("should initialize an empty queue", () => {
        const queue = new Queue();
        expect(queue.top).toBe(null);
        expect(queue.bottom).toBe(null);
        expect(queue.size).toBe(0);
    });

    it("should enqueue new elements in the queue", () => {
        const queue = new Queue();
        queue.enqueue("a");
        queue.enqueue("b");
        queue.enqueue("c");
        expect(queue.size).toBe(3);
        expect(queue.bottom.value).toBe("a");
        expect(queue.top.value).toBe("c");
    });

    it("should peek first element in the queue", () => {
        const queue = new Queue();
        queue.enqueue("x");
        queue.enqueue("y");
        expect(queue.size).toBe(2);
        expect(queue.peek().value).toBe("x");
    });

    it("should return null on dequeue an empty queue", () => {
        const queue = new Queue();
        expect(queue.dequeue()).toBe(null);
    });

    it("should dequeue an element in the queue", () => {
        const queue = new Queue();
        queue.enqueue("x");
        queue.enqueue("y");
        expect(queue.size).toBe(2);
        queue.dequeue();
        expect(queue.size).toBe(1);
        expect(queue.bottom.value).toBe("y");
        expect(queue.bottom.next).toBe(null);
    });

    it("should returns queue values", () => {
        const queue = new Queue();
        queue.enqueue("x");
        queue.enqueue("y");
        expect(queue.values()).toEqual(["x", "y"]);
    });
});
