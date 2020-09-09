const TileType = Object.freeze({
    'entry': 1,
    'shelf': 2,
    'register': 3,
    'exit': 4,
});

const TileSelectionMode = Object.freeze({
    'draw': 1,
    'erase': 2
});


const ControllerEvents = Object.freeze({
    'closed': 1,
    'typeChanged': 2,
    'selectionModeChanged': 3,
    'dragEnd': 4,
    'meshViewChanged': 5
});

