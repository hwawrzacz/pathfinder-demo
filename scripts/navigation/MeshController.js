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
        this.addShelveAdditionDialogListener();
        this.addTileTypeChangeListener();

        // Test fields
        this.eventsTest = document.querySelector('.test__event');
        this.cursorTest = document.querySelector('.test__cursor');
        this.offsetsTest = document.querySelector('.test__offset');
        this.meshHoverTest = document.querySelector('.test__mesh-hover');
    }

    addShelveAdditionDialogListener() {
        this.shelfDialog.on('close', (isConfirmed) => {
            this.handleTileAddition(isConfirmed);
        });
    }

    addTileTypeChangeListener() {
        this.tileTypeController.on(TileTypeControllerEvents.changed, (value) => {
            this.tileType = value;
        });
    }

    //#region Dragging
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

        if (this.tileType === TileType.shelf) {
            this.openShelveAdditionDialog();
        } else {
            this.handleTileAddition(true);
        }
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
    //#endregion

    openShelveAdditionDialog() {
        this.shelfDialog.open('Details', 'Pick a category for this shelf. The color is already defined.');
    }

    handleTileAddition(shouldAdd) {
        console.log('here');
        const className = this.getClassNameForTileType(this.tileType)
        const changedByLastDrag = mesh.element.querySelectorAll('.just-changed');

        if (shouldAdd) {
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
    }

    //#region Helpers
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
