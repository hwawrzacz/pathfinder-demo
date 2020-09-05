class MouseEventParser {
    constructor(mesh) {
        this.mesh = mesh
    }

    getRelCursorPosition(mouseEvent) {
        const cursorPosition = this.getCursorPosition(mouseEvent);

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
}