const Graph = require("../src/Graph");

describe("Graph tests", () => {
    it("should add a new edge", () => {
        const graph = new Graph();
        graph.addEdge("a");
        expect(graph.nodes).toBe(1);
        expect(graph.existsEdge("a")).toBe(true);
    });

    it("should prevent add duplicate edges", () => {
        const graph = new Graph();
        graph.addEdge("a");
        expect(() => graph.addEdge("a")).toThrow('Edge "a" already exists');
    });

    it("should validate ralated edges exists", () => {
        const graph = new Graph();
        graph.addEdge("a");
        expect(() => graph.addRelation("a", "b")).toThrow(
            'Edge "b" does not exists'
        );
    });

    it("should get an edge", () => {
        const graph = new Graph();
        graph.addEdge("a");
        expect(graph.getEdge("a")).toEqual([]);
    });

    it("should create relations between edges", () => {
        const graph = new Graph();
        graph.addEdge("a");
        graph.addEdge("b");
        graph.addEdge("c");
        graph.addRelation("a", "b");
        graph.addRelation("a", "c");
        expect(graph.getEdge("a")).toEqual(["b", "c"]);
        expect(graph.getEdge("b")).toEqual(["a"]);
        expect(graph.getEdge("c")).toEqual(["a"]);
        expect(() => graph.addRelation("c", "a")).toThrow(
            'Relation between "c" and "a" already exists'
        );
    });

    it("should remove relations between edges", () => {
        const graph = new Graph();
        graph.addEdge("a");
        graph.addEdge("b");
        graph.addEdge("c");
        graph.addRelation("a", "b");
        graph.addRelation("a", "c");
        expect(graph.getEdge("a")).toEqual(["b", "c"]);
        expect(graph.getEdge("b")).toEqual(["a"]);
        expect(graph.getEdge("c")).toEqual(["a"]);
        graph.removeRelation("c", "a");
        expect(graph.getEdge("a")).toEqual(["b"]);
        expect(graph.getEdge("c")).toEqual([]);
    });

    it("should delete an existing edge", () => {
        const graph = new Graph();
        graph.addEdge("a");
        graph.addEdge("b");
        graph.addEdge("c");
        graph.addRelation("a", "b");
        graph.addRelation("a", "c");
        graph.removeEdge("a");
        expect(graph.getEdge("b")).toEqual([]);
        expect(graph.getEdge("c")).toEqual([]);
        expect(graph.existsEdge("a")).toBe(false);
    });
});
