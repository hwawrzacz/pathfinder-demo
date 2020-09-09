class MeshStructure {
    constructor(meshElement) {
        this.meshElement = meshElement;
    }

    refreshModel() {
        this.model = [];
        const rows = this.meshElement.querySelectorAll('tr');
        let rowIndex = 0;

        rows.forEach(row => {
            this.model.push([]);
            const tiles = row.querySelectorAll('td');
            tiles.forEach(element => this.checkTile(element, rowIndex));
            rowIndex++;
        });
    }

    checkTile(element, rowIndex) {
        if (element.classList.contains('selected')) {
            const classesArray = Array.from(element.classList);
            const type = classesArray[classesArray.length - 1];

            if (type.includes('shelf')) {
                const category = type.replace('shelf--', '');
                this.model[rowIndex].push(new Tile(element, 'shelf', category));
            }
            else {
                this.model[rowIndex].push(new Tile(element, type));
            }
        } else {
            this.model[rowIndex].push(' ');
        }
    }

    exportAsJson() {
        // return JSON.stringify(this.model);
        const exported = [];
        let currentRowIndex = 0;
        this.model.forEach(row => {
            exported.push([]);

            row.forEach(tile => {
                if (tile.hasOwnProperty('type')) {
                    if (tile.type === 'entry') {
                        exported[currentRowIndex].push('A');
                    } else if (tile.type === 'exit') {
                        exported[currentRowIndex].push('B');
                    } else {
                        exported[currentRowIndex].push(tile.type.substr(0, 1).toUpperCase());
                    }
                    console.log(tile.type);
                } else {
                    exported[currentRowIndex].push(' ');
                }
            });
            currentRowIndex++;
        });

        return JSON.stringify(exported);
    }
}