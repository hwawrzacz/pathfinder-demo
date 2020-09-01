class ShelfDialog {
    static constructor() {
        this.element = createElement();
        this.initializeDefaults()
    }

    static fillContent(title = '', message = '', confirmText = 'Ok', discardText = 'Cancel') {
        const titleEl = this.element.querySelector('.dialog__title');
        const messageEl = this.element.querySelector('.dialog__message');
        const confirmTextEl = this.element.querySelector('.dialog__button--confirm');
        const discardTextEl = this.element.querySelector('.dialog__button--discard');

        titleEl.innerHTML = title;
        messageEl.innerHTML = message;
        confirmTextEl.innerHTML = confirmText;
        discardTextEl.innerHTML = discardText;
    }

    static createElement() {
        const parser = new DOMParser()
        return parser
            .parseFromString(this.dialogTemplate(), 'text/html')
            .body
            .querySelector('.dialog__wrapper');
    }

    static open = (title, message, confirmText, discardText) => {
        try {
            this.close();
            console.log('dialog closed')
        } catch (exc) { }

        this.element = this.createElement();
        this.fillContent(title, message, confirmText, discardText);
        document.body.appendChild(this.element);
    }

    static close = () => {
        this.element.remove();
        console.log('closed');
    }

    static dialogTemplate = () => {
        return `
        <div class="dialog__wrapper">
            <div class="dialog">
                <h1 class="dialog__title"></h1>
                <p class="dialog__message"></p>
                <div class="dialog__actions">
                    <button class="dialog__button--confirm"></button>
                    <button class="dialog__button--discard"></button>
                </div>
            </div>
        </div>
        `;
    }
}