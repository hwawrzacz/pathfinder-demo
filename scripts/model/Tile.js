class Tile {
    constructor(element, type) {
        this.element = element;
        this.type = type;
    }

    toString() {
        return this.type.substr(0, 1).toUpperCase();
    }
}