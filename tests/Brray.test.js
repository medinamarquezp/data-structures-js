const Brray = require("../Brray");

describe("Brray class tests", () => {
    it("get key should be a valid number", () => {
        const brray = new Brray();
        expect(() => brray.get("Test")).toThrow(
            "Key 'Test' must be a valid number"
        );
    });

    it("get key should be in bounds", () => {
        const brray = new Brray();
        brray.push("Test");
        expect(() => brray.get(6)).toThrow("Index out of bounds");
        expect(brray.get(0)).toBe("Test");
    });

    it("should push a new element into an empty brray", () => {
        const brray = new Brray();
        brray.push("Test");
        expect(brray.size()).toBe(1);
        expect(brray.get(0)).toBe("Test");
    });

    it("should get first element on brray", () => {
        const brray = new Brray();
        brray.push("First");
        brray.push("Test");
        brray.push("Last");
        expect(brray.first()).toBe("First");
    });

    it("should get last element on brray", () => {
        const brray = new Brray();
        brray.push("First");
        brray.push("Test");
        brray.push("Last");
        expect(brray.last()).toBe("Last");
    });

    it("should get brray size", () => {
        const brray = new Brray();
        brray.push("First");
        brray.push("Test");
        brray.push("Last");
        expect(brray.size()).toBe(3);
    });

    it("should display all brray elements", () => {
        const brray = new Brray();
        brray.push("First");
        brray.push("Test");
        brray.push("Last");
        expect(brray.all()).toEqual(["First", "Test", "Last"]);
    });

    it("should remove first brray element", () => {
        const brray = new Brray();
        brray.push("First");
        brray.push("Test");
        brray.push("Last");
        expect(brray.shift()).toEqual(["Test", "Last"]);
        expect(brray.size()).toBe(2);
        expect(brray._getKeys()).toEqual(["0", "1"]);
    });

    it("should remove last brray element", () => {
        const brray = new Brray();
        brray.push("First");
        brray.push("Test");
        brray.push("Last");
        expect(brray.pop()).toEqual(["First", "Test"]);
        expect(brray.size()).toBe(2);
        expect(brray._getKeys()).toEqual(["0", "1"]);
    });

    it("should remove a brray element by key", () => {
        const brray = new Brray();
        brray.push("First");
        brray.push("Test");
        brray.push("Last");
        expect(brray.remove(1)).toEqual(["First", "Last"]);
        expect(brray.size()).toBe(2);
        expect(brray._getKeys()).toEqual(["0", "1"]);
    });

    it("should validate some parameter must be a function", () => {
        const brray = new Brray();
        expect(() => brray.some(6)).toThrow(
            "some parameter must be a valid function"
        );
    });

    it("should returns true if any element in brray meets the condition", () => {
        const brray = new Brray();
        brray.push(1);
        brray.push(2);
        brray.push(3);
        const even = (n) => n % 2 === 0;
        expect(brray.some(even)).toBe(true);
    });

    it("should returns false if no element in brray meets the condition", () => {
        const brray = new Brray();
        brray.push(1);
        brray.push(3);
        brray.push(5);
        const even = (n) => n % 2 === 0;
        expect(brray.some(even)).toBe(false);
    });

    it("should validate pushMany parameter must be an array", () => {
        const brray = new Brray();
        expect(() => brray.pushMany("Test")).toThrow(
            "pushMany parameter must be an array"
        );
    });

    it("should push many elemnts in a brray", () => {
        const brray = new Brray();
        expect(brray.pushMany(["a", 2, true])).toEqual(["a", 2, true]);
        expect(brray.size()).toBe(3);
    });

    it("from parameter must be greather than to parameter", () => {
        const brray = new Brray();
        brray.pushMany([1, 2, 3, 4]);
        expect(() => brray.take(3, 0)).toThrow(
            "to parameter must be lower than from parameter"
        );
    });

    it("should take elemnts in a range", () => {
        const brray = new Brray();
        brray.pushMany([1, 2, 3, 4, 5, 6, 7, 8]);
        expect(brray.take(1, 5)).toEqual([2, 3, 4, 5, 6]);
        expect(brray.take(0, 2)).toEqual([1, 2, 3]);
        expect(brray.take(7, 7)).toEqual([8]);
    });

    it("should insert a new item on first position", () => {
        const brray = new Brray();
        brray.pushMany(["b", "c", "d"]);
        expect(brray.size()).toBe(3);
        expect(brray._getKeys()).toEqual(["0", "1", "2"]);
        brray.unshift("a");
        expect(brray.size()).toBe(4);
        expect(brray.all()).toEqual(["a", "b", "c", "d"]);
        expect(brray._getKeys()).toEqual(["0", "1", "2", "3"]);
    });

    it("should insert a new item in any position", () => {
        const brray = new Brray();
        brray.pushMany(["a", "c", "d"]);
        expect(brray.size()).toBe(3);
        expect(brray._getKeys()).toEqual(["0", "1", "2"]);
        brray.pushAt(1, "b");
        expect(brray.size()).toBe(4);
        expect(brray.all()).toEqual(["a", "b", "c", "d"]);
        expect(brray._getKeys()).toEqual(["0", "1", "2", "3"]);
    });

    it("should validate brrays with static size", () => {
        const brray = new Brray(3);
        expect(() => brray.pushMany(["a", "b", "c", "d"])).toThrow(
            "Array size cannot be greather than 3"
        );
        brray.pushMany(["a", "b", "c"]);
        expect(() => brray.pushMany(["a", "b"])).toThrow(
            "Array size cannot be greather than 3"
        );
        expect(() => brray.push(["a"])).toThrow(
            "Array size cannot be greather than 3"
        );
        expect(() => brray.pushAt(2, "e")).toThrow(
            "Array size cannot be greather than 3"
        );
        expect(() => brray.unshift("e")).toThrow(
            "Array size cannot be greather than 3"
        );
    });
});
