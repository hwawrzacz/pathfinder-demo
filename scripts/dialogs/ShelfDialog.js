class ShelfDialog extends EventEmitter {

    constructor() {
        super();
        this.element = this.createElement();

        this.bindElements();
        this.addEventListeners();
    }

    //#region Initializers
    createElement() {
        const parser = new DOMParser()
        return parser
            .parseFromString(this.dialogTemplate(), 'text/html')
            .body
            .querySelector('.dialog__wrapper');
    }

    bindElements() {
        this.confirmButton = this.element.querySelector('.dialog__button--confirm');
        this.discardButton = this.element.querySelector('.dialog__button--discard');
        this.title = this.element.querySelector('.dialog__title');
        this.message = this.element.querySelector('.dialog__content__message');
        this.confirmText = this.element.querySelector('.dialog__button--confirm');
        this.discardText = this.element.querySelector('.dialog__button--discard');
        this.select = this.element.querySelector('select');
    }

    addEventListeners() {
        const confirmButton = this.element.querySelector('.dialog__button--confirm');
        const discardButton = this.element.querySelector('.dialog__button--discard');

        confirmButton.addEventListener('click', () => this.close(this.select.value));
        discardButton.addEventListener('click', () => this.close(false));
    }

    fillContent(title = '', message = '', confirmText = 'Ok', discardText = 'Cancel') {
        this.title.innerHTML = title;
        this.message.innerHTML = message;
        this.confirmText.innerHTML = confirmText;
        this.discardText.innerHTML = discardText;
    }
    //#endregion

    //#region Behaviour
    open = (title, message, confirmText, discardText) => {
        this.fillContent(title, message, confirmText, discardText);
        document.body.appendChild(this.element);
    }

    close = (returnValue = null) => {
        this.element.remove();
        this.emit('close', returnValue);
    }
    //#endregion

    dialogTemplate = () => {
        return `
        <div class="dialog__wrapper">
            <div class="dialog">
                <h1 class="dialog__title"></h1>
                <div class="dialog__content">
                    <p class="dialog__content__message"></p>
                    <select>
                        <option value="vegetables">Warzywa</option>
                        <option value="bread">Pieczywo</option>
                        <option value="meat">Mięso</option>
                        <option value="sweets">Słodycze</option>
                        <option value="chemicals">Chemia</option>
                    </select>
                </div>
                <div class="dialog__actions">
                    <button class="dialog__button--confirm"></button>
                    <button class="dialog__button--discard"></button>
                </div>
            </div>
        </div>
        `;
    }
}