class MeshController {

    constructor(mesh) {
        this.mesh = mesh;
        this.addClickListener();
        this.addDragListener();
        this.changedByLastDrag = [];
        this.tileType = TileType.entry;
        this.shelfDialog = new ShelfDialog();
        this.shelfTypeController = new TileTypeController();

        // Add listeners
        this.shelfDialog.on('close', (value) => {
            console.log(value);
        });
        this.shelfTypeController.on(TileTypeControllerEvents.changed, (value) => {
            console.log(`New current type: ${value}`);
        })

        // Test fields
        this.eventsTest = document.querySelector('.test__event');
        this.cursorTest = document.querySelector('.test__cursor');
        this.offsetsTest = document.querySelector('.test__offset');
        this.meshHoverTest = document.querySelector('.test__mesh-hover');
    }

    addClickListener() {
        this.mesh.element.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();

            const relCursorPosition = this.getRelCursorPosition(event);
            this.toggleTile(relCursorPosition);

            this.printEventTest('clicked');
        });
    }

    addDragListener() {
        this.mesh.element.addEventListener('mousedown', (event) => {
            event.preventDefault();
            event.stopPropagation();

            this.mesh.element.addEventListener('mousemove', this.startShelvesSelection);
            document.addEventListener('mouseup', this.stopShelvesSelection);

            this.printEventTest('mousedown');
        });
    }

    startShelvesSelection = (event) => {
        event.preventDefault();
        event.stopPropagation();

        this.selectTiles(event);
        this.printEventTest('drag');
    };

    stopShelvesSelection = () => {
        this.removeDragListener();
        this.shelfDialog.open('Details', 'Pick a category for this shelf. The color is already defined.');
    }

    selectTiles(mouseEvent) {
        const relCursorPosition = this.getRelCursorPosition(mouseEvent);

        this.toggleTile(relCursorPosition);
        this.printCursorTest(`${relCursorPosition.x} | ${relCursorPosition.y}`);
    }

    toggleTile(relCursorPosition) {
        const tileClass = `element-${Math.floor(relCursorPosition.y / 30)}-${Math.floor(relCursorPosition.x / 30)}`;
        const toggledElement = document.querySelector(`.${tileClass}:not(.just-changed)`);

        if (toggledElement) {

            toggledElement.classList.toggle('selected');
            toggledElement.classList.add('just-changed');
            this.changedByLastDrag.push(toggledElement);

            console.log(`${tileClass} switched`);
        }
    }

    removeDragListener = () => {
        document.removeEventListener('mouseup', this.stopShelvesSelection);
        this.mesh.element.removeEventListener('mousemove', this.startShelvesSelection);

        this.changedByLastDrag.forEach(element => {
            element.classList.remove('just-changed');
        });
        this.changedByLastDrag = []
        this.printEventTest('dragend');
    }

    getRelCursorPosition(mouseEvent) {
        const cursorPosition = this.getCursorPosition(mouseEvent);
        this.printCursorTest(`${cursorPosition.x} | ${cursorPosition.y}`);

        const offsetTop = this.mesh.element.offsetTop;
        const offsetLeft = this.mesh.element.offsetLeft;

        return {
            x: parseInt(cursorPosition.x - offsetLeft),
            y: parseInt(cursorPosition.y - offsetTop)
        };
    }

    getCursorPosition(mouseEvent) {
        const mouseX = mouseEvent.pageX;
        const mouseY = mouseEvent.pageY;

        return { x: mouseX, y: mouseY };
    }

    //#region Helpers
    printEventTest(message) {
        this.eventsTest.innerHTML = message;
    }
    printCursorTest(message) {
        this.cursorTest.innerHTML = message;
    }
    printOffsetTest(message) {
        this.offsetsTest.innerHTML = message;
    }
    printMeshHoverTest(message) {
        this.meshHoverTest.innerHTML = message;
    }
    //#endregion
}
