class MouseEventParser {
    constructor(meshElement) {
        this.meshElement = meshElement;
    }

    getRelCursorPosition(mouseEvent) {
        const cursorPosition = this.getCursorPosition(mouseEvent);

        const offsetTop = this.meshElement.offsetTop;
        const offsetLeft = this.meshElement.offsetLeft;

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
}