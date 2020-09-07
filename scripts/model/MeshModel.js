class MeshModel {
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
            tiles.forEach(tile => this.checkTile(tile, rowIndex));
            rowIndex++;
        });

        console.log(this.model);
    }

    checkTile(tile, rowIndex) {
        if (tile.classList.contains('selected')) {
            this.model[rowIndex].push('#');
        } else {
            this.model[rowIndex].push(' ');
        }
    }
}