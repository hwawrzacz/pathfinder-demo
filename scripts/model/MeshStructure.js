class MeshStructure {
    constructor(meshElement) {
        this.meshElement = meshElement;
        this.refreshModel();
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

        console.table(this.model);
    }

    checkTile(element, rowIndex) {
        if (element.classList.contains('selected')) {
            const classesArray = Array.from(element.classList);
            const type = classesArray[classesArray.length - 1];

            if (type.includes('shelf')) {
                const category = type.replace('shelf--', '');
                this.model[rowIndex].push(new Tile(element, 'shelf', category).toString());
            }
            else {
                this.model[rowIndex].push(new Tile(element, type).toString());
            }
        } else {
            this.model[rowIndex].push(' ');
        }
    }
}