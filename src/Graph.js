class Graph {
    constructor() {
        this.nodes = 0;
        this.adjacentList = {};
    }

    existsEdge(edge) {
        return !!this.adjacentList[edge];
    }

    getEdge(edge) {
        this._validateEdgeExists(edge);
        return this.adjacentList[edge];
    }

    addEdge(edge) {
        this._validateDuplicatedEdge(edge);
        this.adjacentList[edge] = [];
        this.nodes += 1;
        return this;
    }

    removeEdge(edge) {
        this._validateEdgeExists(edge);
        const edgeRelations = this.getEdge(edge);
        if (edgeRelations.length) {
            edgeRelations.forEach((relatedEdge) =>
                this.removeRelation(edge, relatedEdge)
            );
        }
        delete this.adjacentList[edge];
        return this;
    }

    addRelation(edgeFrom, edgeTo) {
        this._validateEdgeExists(edgeFrom);
        this._validateEdgeExists(edgeTo);
        this._validateEdgeIncludes(edgeFrom, edgeTo);
        this.getEdge(edgeFrom).push(edgeTo);
        this.getEdge(edgeTo).push(edgeFrom);
        return this;
    }

    removeRelation(edgeFrom, edgeTo) {
        this._validateEdgeExists(edgeFrom);
        this._validateEdgeExists(edgeTo);
        this._validateEdgeDoesNotIncludes(edgeFrom, edgeTo);
        this.adjacentList[edgeFrom] = this.getEdge(edgeFrom).filter(
            (item) => item != edgeTo
        );
        this.adjacentList[edgeTo] = this.getEdge(edgeTo).filter(
            (item) => item != edgeFrom
        );
        return this;
    }

    _validateDuplicatedEdge(edge) {
        if (this.existsEdge(edge)) throw `Edge "${edge}" already exists`;
    }

    _validateEdgeExists(edge) {
        if (!this.existsEdge(edge)) throw `Edge "${edge}" does not exists`;
    }

    _validateEdgeIncludes(edgeFrom, edgeTo) {
        const edge = this.getEdge(edgeFrom);
        if (edge.includes(edgeTo))
            throw `Relation between "${edgeFrom}" and "${edgeTo}" already exists`;
    }

    _validateEdgeDoesNotIncludes(edgeFrom, edgeTo) {
        const edge = this.getEdge(edgeFrom);
        if (!edge.includes(edgeTo))
            throw `Relation between "${edgeFrom}" and "${edgeTo}" does not exists`;
    }
}

module.exports = Graph;
