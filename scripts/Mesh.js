class Mesh {
    constructor(width, height) {
        this.element = document.querySelector('.mesh');
        this.controller = new MeshController(this);
        this.generateMesh(width, height);
    }

    generateMesh(width, height) {
        const startTime = Date.now();

        for (let row = 0; row < width; row++) {
            const rowEl = this.meshRow();
            this.element.appendChild(rowEl);

            for (let col = 0; col < height; col++) {
                const tile = this.meshElement();
                tile.classList.add(`element-${row}-${col}`);
                tile.innerHTML = `${row}-${col}`;
                rowEl.appendChild(tile);
            }
        }

        const timeElapsed = Date.now() - startTime;

        console.log(`Mesh created in ${(timeElapsed / 100).toFixed(2)} second${timeElapsed > 1 ? 's' : ''}`);
    }

    trElement = (classList) => {
        const element = document.createElement('tr')
        element.classList.add(classList);

        return element;
    }

    tdElement = (classList) => {
        const element = document.createElement('td')
        element.classList.add(classList);

        return element;
    }

    meshRow = () => {
        return this.trElement(['mesh__row']);
    }

    meshElement = () => {
        return this.tdElement(['mesh__element']);
    }
}
