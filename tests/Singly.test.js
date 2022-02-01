const Singly = require("../Singly");

describe("Singly linked list tests", () => {
    it("should create a Singly linked list", () => {
        const singly = new Singly("a");
        expect(singly.size).toBe(1);
        expect(singly.head.value).toBe("a");
        expect(singly.head.next).toBe(null);
        expect(singly.tail.value).toBe("a");
        expect(singly.tail.next).toBe(null);
    });

    it("should create a Singly linked list appending multiple nodes", () => {
        const singly = new Singly("a");
        singly.append("b");
        singly.append("c");
        expect(singly.size).toBe(3);
        const head = singly.head;
        expect(head.value).toBe("a");
        const n2 = head.next;
        expect(n2.value).toBe("b");
        const n3 = n2.next;
        expect(n3.value).toBe("c");
        expect(n3.next).toBe(null);
        expect(singly.tail.value).toBe("c");
        expect(singly.tail.next).toBe(null);
    });

    it("should create a Singly linked list prepending one node", () => {
        const singly = new Singly("b");
        singly.prepend("a");
        expect(singly.size).toBe(2);
        expect(singly.head.value).toBe("a");
        const n1 = singly.head.next;
        expect(n1.value).toBe("b");
        expect(n1.next).toBe(null);
        expect(singly.tail.value).toBe("b");
        expect(singly.tail.next).toBe(null);
    });

    it("should create a Singly list inserting one node on head", () => {
        const singly = new Singly("b");
        singly.insert(0, "a");
        expect(singly.size).toBe(2);
        expect(singly.head.value).toBe("a");
        const n1 = singly.head.next;
        expect(n1.value).toBe("b");
        expect(n1.next).toBe(null);
        expect(singly.tail.value).toBe("b");
        expect(singly.tail.next).toBe(null);
    });

    it("should create a Singly list inserting one node on tail", () => {
        const singly = new Singly("a");
        singly.insert(1, "b");
        expect(singly.size).toBe(2);
        expect(singly.head.value).toBe("a");
        const n1 = singly.head.next;
        expect(n1.value).toBe("b");
        expect(n1.next).toBe(null);
        expect(singly.tail.value).toBe("b");
        expect(singly.tail.next).toBe(null);
    });

    it("should create a Singly list inserting one node on custom place", () => {
        const singly = new Singly("a");
        singly.append("c");
        singly.append("d");
        expect(singly.size).toBe(3);
        singly.insert(1, "b");
        expect(singly.size).toBe(4);
        expect(singly.head.value).toBe("a");
        const n1 = singly.head.next;
        expect(n1.value).toBe("b");
        const n2 = n1.next;
        expect(n2.value).toBe("c");
        const n3 = n2.next;
        expect(n3.value).toBe("d");
        expect(n3.next).toBe(null);
    });

    it("should create a Singly list and remove a node", () => {
        const singly = new Singly("a");
        singly.append("b");
        singly.append("d");
        expect(singly.size).toBe(3);
        singly.remove(2);
        expect(singly.size).toBe(2);
        expect(singly.head.value).toBe("a");
        const n1 = singly.head.next;
        expect(n1.value).toBe("b");
        expect(n1.next).toBe(null);
    });

    it("should create a Singly list and return all node values", () => {
        const singly = new Singly("a");
        singly.append("b");
        singly.append("c");
        expect(singly.size).toBe(3);
        expect(singly.values()).toEqual(["a", "b", "c"]);
    });
});
