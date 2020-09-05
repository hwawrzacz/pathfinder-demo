class TileTypeController extends EventEmitter {
    constructor() {
        super();
        this.tileType = TileType.entry;
        this.initializeElements();
        this.addListeners();
        this.emitTypeChange();
    }

    initializeElements() {
        this.element = document.querySelector('mesh-controls');
    }

    addListeners() {
        document.querySelectorAll('input[type="radio"][name="target"]').forEach((input) => {
            input.addEventListener('change', (event) => this.refreshTileType(event));
        })
    }

    refreshTileType = (event) => {
        const newTileType = event.target.value;
        this.tileType = TileType[newTileType];
        this.emitTypeChange();
    }

    emitTypeChange() {
        this.emit(ControllerEvents.typeChanged, this.tileType);
    }
}

