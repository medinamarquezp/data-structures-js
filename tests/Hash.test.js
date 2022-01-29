const Hash = require("../Hash");

describe("Hash table tests", () => {
    it("should validate Hash size parameter", () => {
        expect(() => new Hash("Test")).toThrow(
            "size parameter must be a valid number"
        );
        expect(() => new Hash(1.2)).toThrow(
            "size parameter must be a valid number"
        );
        expect(() => new Hash(0)).toThrow(
            "size parameter must be a positiva number"
        );
        expect(() => new Hash(-2)).toThrow(
            "size parameter must be a positiva number"
        );
    });

    it("should set a new item", () => {
        const hash = new Hash(3);
        const hashResult = hash.set(1234, "Test value");
        expect(hashResult.hashSize).toBe(3);
        expect(hashResult.availableBuckets).toBe(2);
        expect(hashResult.createdHashId).toBe(hash._hashFunction(1234));
    });

    it("should validate hash max size", () => {
        const hash = new Hash(1);
        hash.set(1234, "Test value");
        expect(() => hash.set(1234, "Test value")).toThrow(
            "max bucket size reached"
        );
    });

    it("should return undefined when looking for non existing key", () => {
        const hash = new Hash(1);
        hash.set(1234, "Test value");
        expect(hash.get(4567)).toBe(undefined);
    });

    it("should return the value of an existing key", () => {
        const hash = new Hash(1);
        hash.set(1234, "Test value");
        expect(hash.get(1234)).toBe("Test value");
    });

    it("should return undefined when deleting a non existing key", () => {
        const hash = new Hash(1);
        hash.set(1234, "Test value");
        expect(hash.delete(4567)).toBe(undefined);
    });

    it("should delete a bucket with no collisions", () => {
        const hash = new Hash(1);
        hash.set(1234, "Test value");
        const deleteBucketResult = hash.delete(1234);
        expect(deleteBucketResult.hash).toBe(hash._hashFunction(1234));
        expect(deleteBucketResult.bucketDeleted).toBe(true);
        expect(hash.availableBuckets()).toBe(1);
    });

    it("should delete a bucket with no collisions", () => {
        const hash = new Hash(1);
        hash.set(1234, "Test value");
        const deleteBucketResult = hash.delete(1234);
        expect(deleteBucketResult.hash).toBe(hash._hashFunction(1234));
        expect(deleteBucketResult.bucketDeleted).toBe(true);
        expect(hash.availableBuckets()).toBe(1);
    });

    // Simulation of collision of two elements in same bucket
    // In this simulation the objective will be to delete the first occurrence
    it("should delete affected element on bucket with collision", () => {
        const hash = new Hash(2);
        hash.set(1234, "Test first value");
        hash.set(1234, "Test second value");
        // Same keys use same bucket
        expect(hash.availableBuckets()).toBe(1);
        // Bucket deleted should be first one
        const deleteBucketResult = hash.delete(1234);
        expect(deleteBucketResult.hash).toBe(hash._hashFunction(1234));
        expect(deleteBucketResult.bucketDeleted).toBe(false);
        // As bucket has not be deleted, available buckets should be 1
        expect(hash.availableBuckets()).toBe(1);
        // When looking for the same key, second value should be returned
        expect(hash.get(1234)).toBe("Test second value");
    });

    it("should return all saved keys in a hash", () => {
        const hash = new Hash(3);
        hash.set(123, "Test first element");
        hash.set(456, "Test second element");
        hash.set(789, "Test third element");
        expect(hash.keys()).toEqual([123, 456, 789]);
    });

    // Simulation of collision of two elements in same bucket
    it("should return all saved keys in a hash", () => {
        const hash = new Hash(2);
        hash.set(123, "Test first element");
        hash.set(123, "Test second element");
        expect(hash.keys()).toEqual([123, 123]);
    });

    it("should return all saved contents in a hash", () => {
        const hash = new Hash(3);
        hash.set(123, "Test first element");
        hash.set(456, "Test second element");
        hash.set(789, "Test third element");
        expect(hash.values()).toEqual([
            "Test first element",
            "Test second element",
            "Test third element",
        ]);
    });
});
