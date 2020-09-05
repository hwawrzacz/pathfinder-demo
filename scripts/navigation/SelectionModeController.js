class SelectionModeController extends EventEmitter {
    constructor() {
        super();

        document.querySelector('.selection-mode__input');

        this.addSelectionChangeListener();
    }
    addSelectionChangeListener() {
        document.querySelectorAll('input[type="radio"][name="selection-mode"]').forEach(element => {
            element.addEventListener('change', this.handleSelectionModeChange);
        });
    }

    handleSelectionModeChange = (event) => {
        this.currentMode = event.target.value;
        this.emitSelectionModeChange();
    }

    emitSelectionModeChange() {
        this.emit(ControllerEvents.selectionModeChanged, this.currentMode);
    }
}