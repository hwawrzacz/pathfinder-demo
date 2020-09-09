class MeshController extends EventEmitter {
    constructor(meshElement, width, height) {
        super()
        this.width = width;
        this.height = height;
        this.meshElement = meshElement;
        this.generateMesh(width, height);
        this.addButtonsListeners();
    }

    addButtonsListeners() {
        const buttonTop = document.querySelector('.mesh__container__button--top');
        const buttonLeft = document.querySelector('.mesh__container__button--left');
        const buttonRight = document.querySelector('.mesh__container__button--right');
        const buttonBottom = document.querySelector('.mesh__container__button--bottom');

        buttonTop.addEventListener('click', this.insertRowAbove);
        buttonLeft.addEventListener('click', this.insertColumnBefore);
        buttonRight.addEventListener('click', this.insertColumnAfter);
        buttonBottom.addEventListener('click', this.insertRowBelow);
    }

    generateMesh(width, height) {
        const startTime = Date.now();

        for (let row = 0; row < width; row++) {
            const rowEl = this.createMeshRow();
            this.meshElement.appendChild(rowEl);

            for (let col = 0; col < height; col++) {
                const tile = this.createMeshElement();

                tile.classList.add(`element-${row}-${col}`);
                rowEl.appendChild(tile);
            }
        }

        const timeElapsed = Date.now() - startTime;
        console.log(`Mesh created in ${(timeElapsed / 100).toFixed(2)} second${timeElapsed > 1 ? 's' : ''}`);
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

    //#region Inserting cols/rows
    insertRowAbove = () => {
        const firstRow = this.meshElement.querySelector('tr:first-child');
        const newRow = this.createMeshRow();

        for (let i = 0; i < this.width; i++) {
            const newEl = this.createMeshElement();
            newRow.appendChild(newEl);
        }

        firstRow.before(newRow);
        this.commitRowInsertion();
    }

    insertRowBelow = () => {
        const newRow = this.createMeshRow();

        for (let i = 0; i < this.width; i++) {
            const newEl = this.createMeshElement();
            newRow.appendChild(newEl);
        }

        this.meshElement.appendChild(newRow);
        this.commitRowInsertion();
    }

    insertColumnBefore = () => {
        const allRows = this.meshElement.querySelectorAll('tr');

        allRows.forEach(row => {
            const newElement = this.createMeshElement();
            const firstElement = row.querySelector('td:first-child');
            firstElement.before(newElement);
        });

        this.commitColInsertion();
    }

    insertColumnAfter = () => {
        const allRows = this.meshElement.querySelectorAll('tr');

        allRows.forEach(row => {
            const newElement = this.createMeshElement();
            row.appendChild(newElement);
        });

        this.commitColInsertion();
    }

    commitRowInsertion() {
        this.height++;
        this.emitMeshViewChange();
    }

    commitColInsertion() {
        this.width++;
        this.emitMeshViewChange();
    }

    emitMeshViewChange() {
        this.emit(ControllerEvents.meshViewChanged);
    }
    //#endregion
}