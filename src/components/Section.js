export default class Section {
    constructor(renderer, containerSelector) {
        this._renderer = renderer;
        this._containerSelector = document.querySelector(containerSelector);
    }

    renderItems(cards) {
        cards.forEach(item => this._renderer(item));
    };

    addItem(item) {
        this._containerSelector.prepend(item);
    }
}