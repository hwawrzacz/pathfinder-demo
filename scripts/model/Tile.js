class Tile {
    constructor(element, type, category = null) {
        this.element = element;
        this.type = type;
        this.category = category;
    }

    toString() {
        return `${this.type.substr(0, 3)}${this.category ? `__${this.category.substr(0, 3)}` : ''}`.toUpperCase();
    }
}