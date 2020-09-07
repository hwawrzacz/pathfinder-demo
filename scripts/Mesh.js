class Mesh {
    constructor(width, height) {
        this.element = document.querySelector('.mesh');
        this.changedByLastDrag = [];
        this.tileType = TileType.entry;
        this.selectionMode = TileSelectionMode.draw;
        this.shelfDialog = new ShelfDialog();
        this.tileTypeController = new TileTypeController();
        this.structureController = new MeshController(this.element, width, height);
        this.selectionModeController = new SelectionModeController();
        this.mouseEventParser = new MouseEventParser(this.element);

        // Add listeners
        this.addDragListener();
        this.addShelfAdditionDialogListener();
        this.addTileTypeChangeListener();
        this.addTileSelectionModeChangeListener();

        // Test fields
        this.eventsTest = document.querySelector('.test__event');
        this.cursorTest = document.querySelector('.test__cursor');
        this.offsetsTest = document.querySelector('.test__offset');
        this.meshHoverTest = document.querySelector('.test__mesh-hover');
    }

    addShelfAdditionDialogListener() {
        this.shelfDialog.on('close', (isConfirmed) => {
            console.log(`closed with: ${isConfirmed}`);
            if (isConfirmed)
                this.setSelectedTilesType();
            else
                this.cleanSelectedTilesType();
        });
    }

    addTileTypeChangeListener() {
        this.tileTypeController.on(ControllerEvents.typeChanged, (value) => {
            this.tileType = value;
        });
    }

    addTileSelectionModeChangeListener() {
        this.selectionModeController.on(ControllerEvents.selectionModeChanged, (value) => {
            this.selectionMode = value;
        });
    }

    //#region Dragging
    addDragListener() {
        this.element.addEventListener('mousedown', (event) => {
            event.preventDefault();
            event.stopPropagation();

            const relCursorPosition = this.mouseEventParser.getRelCursorPosition(event);
            const tileToChange = event.target
            this.markTile(tileToChange);

            this.element.addEventListener('mousemove', this.startShelvesSelection);
            document.addEventListener('mouseup', this.stopShelvesSelection);

            this.printEventTest('mousedown');
        });
    }

    startShelvesSelection = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const tileToChange = event.target;
        this.markTile(tileToChange);

        this.printEventTest('drag');
    };

    stopShelvesSelection = () => {
        this.removeDragListener();

        if (this.isDrawingMode()) {
            if (this.tileType === TileType.shelf) {
                this.openShelfAdditionDialog();
            } else {
                this.setSelectedTilesType();
            }
        }
        else {
            this.cleanSelectedTilesType();
        }

        // TODO: Refresh model in Mesh object
        this.changedByLastDrag = [];
        this.structureController.refreshModel();
    }

    markTile(tileToChange) {
        if (tileToChange) {
            if (this.isDrawingMode()) {
                tileToChange.classList.add('selected');
                // tileToChange.classList.add('just-changed');
            }
            else {
                tileToChange.classList.remove('selected');
                this.removeAllTileTypes(tileToChange);
            }

            this.changedByLastDrag.push(tileToChange);
        }
    }

    removeDragListener = () => {
        document.removeEventListener('mouseup', this.stopShelvesSelection);
        this.element.removeEventListener('mousemove', this.startShelvesSelection);
        this.printEventTest('dragend');
    }
    //#endregion

    openShelfAdditionDialog() {
        this.shelfDialog.open('Details', 'Pick a category for this shelf. The color is already defined.');
    }

    setSelectedTilesType(category = null) {
        const className = this.getClassNameForTileType(this.tileType)
        this.changedByLastDrag.forEach(element => {
            // console.log(`${className} is added`);
            element.classList.add(className);
        });
    }

    cleanSelectedTilesType() {
        this.changedByLastDrag.forEach(element => {
            element.classList.remove('selected');
        });
    }

    removeAllTileTypes(tileToChange) {
        const potentialClasses = Object.keys(TileType);
        potentialClasses.forEach(className => {
            tileToChange.classList.remove(className);
        });
    }

    //#region Boolean functions
    isDrawingMode = () => this.selectionMode === TileSelectionMode.draw;

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
