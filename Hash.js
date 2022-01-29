const crypto = require("crypto");

class Hash {
    static _CONTENT_TYPES = {
        KEYS: "keys",
        VALUES: "values",
    };

    constructor(size) {
        this._validateSize(size);
        this._size = size;
        this._buckets = 0;
        this._data = new Array(size);
    }

    set(key, value) {
        this._validateAvailableBuckets();
        const hashedKey = this._hashFunction(key);
        if (!this._data[hashedKey]) {
            this._data[hashedKey] = [];
            this._buckets = this._buckets + 1;
        }
        this._data[hashedKey].push([key, value]);
        return {
            hashSize: this._size,
            availableBuckets: this.availableBuckets(),
            createdHashId: hashedKey,
        };
    }

    get(key) {
        const hashedKey = this._hashFunction(key);
        if (this._data[hashedKey]) {
            for (let i = 0; i < this._data[hashedKey].length; i++) {
                if (this._data[hashedKey][i][0] === key)
                    return this._data[hashedKey][i][1];
            }
        }
        return undefined;
    }

    delete(key) {
        const hashedKey = this._hashFunction(key);

        if (this._data[hashedKey]) {
            // If there is no collisions, delete bucket
            if (this._data[hashedKey].length === 1) {
                delete this._data[hashedKey];
                this._buckets = this._buckets - 1;
                return { hash: hashedKey, bucketDeleted: true };
            }

            // If collisions founds, remove affected key
            for (let i = 0; i < this._data[hashedKey].length; i++) {
                if (this._data[hashedKey][i][0] === key) {
                    this._data[hashedKey].splice(i, 1);
                    return { hash: hashedKey, bucketDeleted: false };
                }
            }
        }

        // If no buckets found, return undefined
        return undefined;
    }

    size() {
        return this._size;
    }

    availableBuckets() {
        return this._size - this._buckets;
    }

    keys() {
        return this._getContent(Hash._CONTENT_TYPES.KEYS);
    }

    values() {
        return this._getContent(Hash._CONTENT_TYPES.VALUES);
    }

    _getContent(type) {
        this._validateType(type);
        let content = [];
        const position = type === Hash._CONTENT_TYPES.KEYS ? 0 : 1;
        Object.keys(this._data).forEach((key) => {
            if (this._data[key].length === 1) {
                content.push(this._data[key][0][position]);
                return;
            } else {
                this._data[key].forEach((item) => {
                    content.push(item[position]);
                });
            }
        });
        return content;
    }

    _hashFunction(key) {
        return crypto.createHash("md5").update(key.toString()).digest("hex");
    }

    _validateSize(size) {
        if (!Number.isInteger(size))
            throw "size parameter must be a valid number";
        if (size <= 0) throw "size parameter must be a positiva number";
    }

    _validateAvailableBuckets() {
        if (this.availableBuckets() === 0) throw `max bucket size reached`;
    }

    _validateType(type) {
        if (
            ![Hash._CONTENT_TYPES.KEYS, Hash._CONTENT_TYPES.VALUES].includes(
                type
            )
        )
            throw `type must be ${Hash._CONTENT_TYPES.KEYS} or ${Hash._CONTENT_TYPES.VALUES}`;
    }
}

module.exports = Hash;
