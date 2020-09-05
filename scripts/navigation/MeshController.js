class MeshController {

    constructor(mesh) {
        this.mesh = mesh;
        this.changedByLastDrag = [];
        this.tileType = TileType.entry;
        this.shelfDialog = new ShelfDialog();
        this.tileTypeController = new TileTypeController();
        this.mouseEventParser = new MouseEventParser(mesh);

        // Add listeners
        this.addDragListener();
        this.addDialogListener();
        this.addTileTypeChangeListener();

        // Test fields
        this.eventsTest = document.querySelector('.test__event');
        this.cursorTest = document.querySelector('.test__cursor');
        this.offsetsTest = document.querySelector('.test__offset');
        this.meshHoverTest = document.querySelector('.test__mesh-hover');
    }

    addDialogListener() {
        this.shelfDialog.on('close', (value) => {
            const className = this.getClassNameForTileType(this.tileType)
            const changedByLastDrag = mesh.element.querySelectorAll('.just-changed');

            if (value) {
                changedByLastDrag.forEach(element => {
                    element.classList.add(className);
                    element.classList.remove('just-changed');
                });
            } else {
                changedByLastDrag.forEach(element => {
                    element.classList.remove('selected');
                    element.classList.remove('just-changed');
                });
            }
        });
    }

    addTileTypeChangeListener() {
        this.tileTypeController.on(TileTypeControllerEvents.changed, (value) => {
            this.tileType = value;
        });
    }

    addDragListener() {
        this.mesh.element.addEventListener('mousedown', (event) => {
            event.preventDefault();
            event.stopPropagation();

            const relCursorPosition = this.mouseEventParser.getRelCursorPosition(event);
            this.toggleTile(relCursorPosition);

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
        this.openAndHandleShelveDialog();
    }

    selectTiles(mouseEvent) {
        const relCursorPosition = this.mouseEventParser.getRelCursorPosition(mouseEvent);
        this.printCursorTest(`${relCursorPosition.x} | ${relCursorPosition.y}`);

        this.toggleTile(relCursorPosition);
        this.printCursorTest(`${relCursorPosition.x} | ${relCursorPosition.y}`);
    }

    toggleTile(relCursorPosition) {
        const tileClass = `element-${Math.floor(relCursorPosition.y / 30)}-${Math.floor(relCursorPosition.x / 30)}`;
        const toggledElement = document.querySelector(`.${tileClass}:not(.just-changed)`);

        if (toggledElement) {
            toggledElement.classList.add('selected');
            toggledElement.classList.add('just-changed');
            this.changedByLastDrag.push(toggledElement);

            console.log(`${tileClass} switched`);
        }
    }

    removeDragListener = () => {
        document.removeEventListener('mouseup', this.stopShelvesSelection);
        this.mesh.element.removeEventListener('mousemove', this.startShelvesSelection);
        this.printEventTest('dragend');
    }

    openAndHandleShelveDialog() {
        this.shelfDialog.open('Details', 'Pick a category for this shelf. The color is already defined.');
    }

    getClassNameForTileType = (tileType) => {
        switch (tileType) {
            case TileType.entry: {
                return 'entry'
            }
            case TileType.shelf: {
                return 'shelf'
            }
            case TileType.register: {
                return 'register'
            }
            case TileType.exit: {
                return 'exit'
            }
        }
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
