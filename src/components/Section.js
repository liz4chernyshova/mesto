export default class Section {
    constructor(renderer, containerSelector) {
        //this._items = items;
        this._renderer = renderer;
        this._containerSelector = document.querySelector(containerSelector);
    }

    /*renderItems() {
        this._items.forEach(item => {
            this._renderer(item);
        });
    }*/

    renderItems(cards) {
        cards.forEach(item => this._renderer(item));
    };

    addItem(item) {
        this._containerSelector.prepend(item);
    }
}