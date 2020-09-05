class Mesh {
    constructor(width, height) {
        this.element = document.querySelector('.mesh');
        this.meshController = new MeshController(this);
        this.generateMesh(width, height);
        this.addMeshControllerEventListeners();
    }

    generateMesh(width, height) {
        const startTime = Date.now();

        for (let row = 0; row < width; row++) {
            const rowEl = this.createMeshRow();
            this.element.appendChild(rowEl);

            for (let col = 0; col < height; col++) {
                const tile = this.createMeshElement();

                tile.classList.add(`element-${row}-${col}`);
                rowEl.appendChild(tile);
            }
        }

        const timeElapsed = Date.now() - startTime;
        console.log(`Mesh created in ${(timeElapsed / 100).toFixed(2)} second${timeElapsed > 1 ? 's' : ''}`);
    }

    addMeshControllerEventListeners() {
        this.meshController.on(ControllerEvents.dragEnd, this.refreshModel);
    }

    createMeshRow = () => {
        return this.createDOMElement('tr', ['mesh__row']);
    }

    createMeshElement = () => {
        return this.createDOMElement('td', ['mesh__element']);
    }

    createDOMElement = (name, classList) => {
        const element = document.createElement(name);

        classList.forEach(className => {
            element.classList.add(className);
        });

        return element;
    }

    refreshModel = () => {
        // TODO: Refresh model
        console.log('Model shoud be refreshed');
    }
}
