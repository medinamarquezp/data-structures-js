class Brray {
    constructor(maxSize = 0) {
        this._maxSize = maxSize;
        this._size = 0;
        this._data = {};
    }

    get(key) {
        this._validateKey(key);
        return this._data[key];
    }

    push(item) {
        this._validateStaticSize();
        this._data[this._size] = item;
        this._size++;
        return this.all();
    }

    pushMany(items) {
        if (!Array.isArray(items)) throw "pushMany parameter must be an array";
        this._validateStaticSize(items.length);
        for (const item of items) this.push(item);
        return this.all();
    }

    pushAt(index, item) {
        this._validateStaticSize();
        this._validateKey(index);
        this._reorderKeysFromAdded(index);
        this._data[index] = item;
        this._size++;
        return this.all();
    }

    size() {
        return this._size;
    }

    all() {
        return Object.values(this._data);
    }

    first() {
        return this._data[0];
    }

    last() {
        return this._data[this._size - 1];
    }

    shift() {
        delete this._data[0];
        this._reorderKeysFromRemoved(0);
        this._size--;
        return this.all();
    }

    unshift(item) {
        this._validateStaticSize();
        this._reorderKeysFromAdded(0);
        this._data[0] = item;
        this._size++;
        return this.all();
    }

    pop() {
        delete this._data[this._size - 1];
        this._size--;
        return this.all();
    }

    remove(key) {
        this._validateKey(key);
        delete this._data[key];
        this._reorderKeysFromRemoved(key);
        this._size--;
        return this.all();
    }

    some(func) {
        if (typeof func !== "function")
            throw "some parameter must be a valid function";
        for (const key in Object.keys(this._data)) {
            try {
                if (func(this._data[key])) return true;
            } catch (error) {
                console.error(error.message);
                return false;
            }
        }
        return false;
    }

    take(from, to) {
        this._validateKey(from);
        this._validateKey(to);
        if (from > to) throw "to parameter must be lower than from parameter";
        let elements = [];
        for (const key in Object.keys(this._data)) {
            if (key >= from && key <= to)
                elements = [...elements, this._data[key]];
        }
        return elements;
    }

    _validateStaticSize(itemsSize = 0) {
        if (
            this._maxSize &&
            (itemsSize + this._size > this._maxSize ||
                this._size === this._maxSize)
        ) {
            throw `Array size cannot be greather than ${this._maxSize}`;
        }
    }

    _validateKey(key) {
        if (!Number.isInteger(key)) throw `Key '${key}' must be a valid number`;
        if (key < 0 || key > this._size) throw "Index out of bounds";
    }

    _getKeys() {
        return Object.keys(this._data);
    }

    _reorderKeysFromRemoved(from) {
        this._validateKey(from);
        let initialKey = from + 1;

        while (initialKey < this._size) {
            const newKey = initialKey - 1;
            const value = this._data[initialKey];
            this._data[newKey] = value;
            delete this._data[initialKey];
            initialKey += 1;
        }
    }

    _reorderKeysFromAdded(endValue) {
        this._validateKey(endValue);
        let sizeZeroBase = this._size - 1;
        while (sizeZeroBase >= endValue) {
            const newKey = sizeZeroBase + 1;
            const value = this._data[sizeZeroBase];
            this._data[newKey] = value;
            delete this._data[sizeZeroBase];
            sizeZeroBase -= 1;
        }
    }
}

module.exports = Brray;
